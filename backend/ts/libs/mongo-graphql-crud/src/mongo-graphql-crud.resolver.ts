import { ForbiddenError, UserInputError } from 'apollo-server-express';
import {
  subject,
  ForbiddenError as CaslForbiddenError,
  Ability,
} from '@casl/ability';
import { CaslService, ROOT_ABILITY } from '@app/nestjs-casl';
import { Inject, Type } from '@nestjs/common';
import {
  Query,
  Resolver,
  Mutation,
  Args,
  ID,
  Context,
  ObjectType,
  PartialType,
  InputType,
  Field,
} from '@nestjs/graphql';
import { GetAllParams } from './get-all-query.args';
import { ICrudResolver } from './icrud.resolver';
import { ICrudService } from './icrud-service';
import { MongoQueryBuilder } from './mongo-query-builder';
import { Paginated } from './get-all-response.dto';
import { plural } from 'pluralize';
import {
  getDisabledValue,
  getSecureValue,
  ResolverCrudOptions,
  DisabledOperationMessage,
} from './interfaces/crud.options';

const checkDisabled = (operation: { disabled?: boolean }): void => {
  if (getDisabledValue(operation)) {
    throw new ForbiddenError(DisabledOperationMessage);
  }
};

export function MongoGraphqlCrudResolver<T extends Type<unknown>>(
  classRef: T,
  service: any,
  options: ResolverCrudOptions,
): Type<ICrudResolver> {
  const getAllQueryName = plural(classRef.name);

  @ObjectType(`${classRef.name}Output${options.output ? 'Base' : ''}`)
  class ClassRefPartial extends PartialType(options.output || classRef) {}

  @ObjectType(`${classRef.name}Paginated`)
  class ClassRefPaginated extends Paginated(
    options.output || ClassRefPartial,
  ) {}

  @InputType(`${classRef.name}Empty`)
  class EmptyInput {
    @Field(() => String)
    typename: string;
  }

  @Resolver({ isAbstract: true })
  class MongoGraphqlCrudResolverHost implements ICrudResolver {
    @Inject(service) readonly crudService: ICrudService;
    @Inject(options.caslAbility || ROOT_ABILITY)
    readonly caslService: CaslService;

    @Query(() => options.getAll?.output || ClassRefPaginated, {
      name: options.getAll?.name || getAllQueryName,
      description: options.getAll?.disabled
        ? DisabledOperationMessage
        : `Filter ${classRef.name}'s`,
    })
    async getAll(
      @Args() params: GetAllParams,
      @Context('req') req,
      @Context() context,
    ) {
      checkDisabled(options.getAll);
      let ability;
      const isSecure = getSecureValue(options.getAll);

      if (isSecure) {
        ability = this.caslService.ability(req?.user);
        await this.preGetAllAbilityHook(ability, context);
      }
      const queryParsed = MongoQueryBuilder.build(
        params.filters,
        options.getAll?.relationResolvers || [],
        params?.summary,
        params?.limit,
        params?.skip,
        params?.sorts,
      );

      const queryParsedCount = MongoQueryBuilder.build(
        params.filters,
        options.getAll?.relationResolvers || [],
        undefined,
        undefined,
      );

      const items = this.crudService.getAll(
        params,
        queryParsed,
        isSecure ? ability : undefined,
      );

      const total = this.crudService.count(
        queryParsedCount,
        isSecure ? ability : undefined,
      );

      if (queryParsed.summaryQuery.length > 0) {
        const summary = this.crudService.summary(
          queryParsed,
          isSecure ? ability : undefined,
        );

        const result: any = await Promise.all([items, total, summary]);

        return { items: result[0], total: result[1], summary: result[2] };
      }

      const result: any = await Promise.all([items, total]);

      return { items: result[0], total: result[1] };
    }

    @Query(() => options.get?.output || options?.output || ClassRefPartial, {
      name: options.get?.name || `${classRef.name}`,
      description: options.get?.disabled
        ? DisabledOperationMessage
        : `Get one ${classRef.name} by Id`,
    })
    async get(
      @Args('id', { nullable: true, type: () => ID }) id: string,
      @Context('req') req,
    ) {
      checkDisabled(options.get);
      let ability;
      const isSecure = getSecureValue(options.getAll);
      if (isSecure) {
        ability = this.caslService.ability(req?.user);
      }
      return await this.crudService.get(id, isSecure ? ability : undefined);
    }
    @Mutation(
      () => options.create?.output || options?.output || ClassRefPartial,
      {
        name: options.create?.name || `create${classRef.name}`,
        description: options.create?.disabled
          ? DisabledOperationMessage
          : `Create an item(${classRef.name})}`,
      },
    )
    async create(
      @Args('item', { type: () => options?.create?.input || EmptyInput }) dto,
      @Context('req') req,
    ) {
      checkDisabled(options.create);
      if (getSecureValue(options.create)) {
        const ability = this.caslService.ability(req?.user);
        try {
          CaslForbiddenError.from(ability).throwUnlessCan(
            'create',
            subject(classRef.name, dto),
          );
        } catch (error) {
          if (error instanceof CaslForbiddenError) {
            throw new ForbiddenError(error.message);
          }
        }
      }
      return await this.crudService.create(dto);
    }

    @Mutation(
      () => options.update?.output || options.output || ClassRefPartial,
      {
        name: options.update?.name || `update${classRef.name}`,
        description: options.update?.disabled
          ? DisabledOperationMessage
          : `Update an item(${classRef.name}) by Id}`,
      },
    )
    async update(
      @Args('id', { type: () => ID }) id: string,
      @Args('item', { type: () => options?.update?.input || EmptyInput }) dto,
      @Context('req') req,
    ) {
      checkDisabled(options.update);
      if (getSecureValue(options.update)) {
        const itemToUpdate = await this.crudService.get(id);
        const ability = this.caslService.ability(req?.user);
        try {
          CaslForbiddenError.from(ability).throwUnlessCan(
            'update',
            subject(classRef.name, itemToUpdate),
          );
        } catch (error) {
          if (error instanceof CaslForbiddenError) {
            throw new ForbiddenError(error.message);
          }
        }
      }
      return await this.crudService.update(id, dto);
    }

    @Mutation(
      () => options.delete?.output || options.output || ClassRefPartial,
      {
        name: options.delete?.name || `delete${classRef.name}`,
        description: options.delete?.disabled
          ? DisabledOperationMessage
          : `Delete one ${classRef.name} by Id`,
      },
    )
    async delete(
      @Args('id', { type: () => ID }) id: string,
      @Context('req') req,
    ) {
      checkDisabled(options.delete);
      if (getSecureValue(options.delete)) {
        const item = await this.crudService.get(id);
        const ability = this.caslService.ability(req?.user);

        if (!item) {
          throw new UserInputError('Item not found');
        }

        try {
          CaslForbiddenError.from(ability).throwUnlessCan(
            'delete',
            subject(classRef.name, item),
          );
        } catch (error) {
          if (error instanceof CaslForbiddenError) {
            throw new ForbiddenError(error.message);
          }
        }
      }
      return await this.crudService.delete(id);
    }

    @Mutation(() => options.deleteMany?.output || Number, {
      name: options.deleteMany?.name || `deleteMany${classRef.name}`,
      description: options.deleteMany?.disabled
        ? DisabledOperationMessage
        : `Deleted many ${classRef.name} by Ids`,
    })
    async deleteMany(
      @Args('ids', { type: () => [ID] }) ids: string[],
      @Context('req') req,
    ) {
      checkDisabled(options.delete);
      if (getSecureValue(options.delete)) {
        const ability = this.caslService.ability(req?.user);

        try {
          CaslForbiddenError.from(ability).throwUnlessCan(
            'deleteMany',
            subject(classRef.name, ids),
          );
        } catch (error) {
          if (error instanceof CaslForbiddenError) {
            throw new ForbiddenError(error.message);
          }
        }
      }
      return await this.crudService.deleteMany(ids);
    }

    async preGetAllAbilityHook(ability: Ability, context: any): Promise<void> {
      // @ts-ignore
    }
  }

  return MongoGraphqlCrudResolverHost;
}
