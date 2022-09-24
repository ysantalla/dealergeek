import { ArgsType, Field, Int, InputType } from '@nestjs/graphql';
import {
  BinaryOperator,
  ArrayOperator,
  BooleanBinaryOperator,
} from './operator';
import { FiltersKey } from './filters-key';
import { SummaryType, OrderType } from './enums-type';

@InputType()
export class Filters {
  @Field(() => [BinaryOperator], { nullable: true, name: FiltersKey.equals })
  equals?: BinaryOperator[];

  @Field(() => [BinaryOperator], { nullable: true, name: FiltersKey.notEquals })
  notEquals?: BinaryOperator[];

  @Field(() => [BinaryOperator], {
    nullable: true,
    name: FiltersKey.greaterThan,
  })
  greaterThan?: BinaryOperator[];

  @Field(() => [BinaryOperator], {
    nullable: true,
    name: FiltersKey.greaterThanOrEqual,
  })
  greaterThanOrEqual?: BinaryOperator[];

  @Field(() => [BinaryOperator], {
    nullable: true,
    name: FiltersKey.lessThanOrEqual,
  })
  lessThanOrEqual?: BinaryOperator[];

  @Field(() => [BinaryOperator], { nullable: true, name: FiltersKey.lessThan })
  lessThan?: BinaryOperator[];

  // Array Operators
  @Field(() => [ArrayOperator], { nullable: true, name: FiltersKey.inArray })
  inArray?: ArrayOperator[];

  @Field(() => [ArrayOperator], { nullable: true, name: FiltersKey.notInArray })
  notInArray?: ArrayOperator[];

  // STRING operators
  @Field(() => [BinaryOperator], { nullable: true, name: FiltersKey.contains })
  contains?: BinaryOperator[];

  @Field(() => [BinaryOperator], {
    nullable: true,
    name: FiltersKey.notContains,
  })
  notContains?: BinaryOperator[];

  @Field(() => [BinaryOperator], {
    nullable: true,
    name: FiltersKey.startsWith,
  })
  startsWith?: BinaryOperator[];

  @Field(() => [BinaryOperator], { nullable: true, name: FiltersKey.endsWith })
  endsWith?: BinaryOperator[];

  @Field(() => [BooleanBinaryOperator], {
    nullable: true,
    name: FiltersKey.exists,
  })
  exists?: BooleanBinaryOperator[];
}

@InputType()
export class Summary {
  @Field(() => SummaryType)
  type: SummaryType;

  @Field(() => String)
  field: string;
}

@ArgsType()
export class GetAllParams {
  @Field(() => Int, { defaultValue: 0, nullable: true })
  skip?: number;

  @Field(() => Int, {
    nullable: true,
    defaultValue: 10,
    description: 'Using -1 value in order to disable pagination',
  })
  limit?: number;

  @Field({
    nullable: true,
    description: `'name -email', means: order property name ASC and email DESC`,
    defaultValue: '',
  })
  sorts?: string;

  @Field(() => Filters, { nullable: true })
  filters?: Filters;

  @Field(() => [Summary], { nullable: true })
  summary?: Summary[];
}
