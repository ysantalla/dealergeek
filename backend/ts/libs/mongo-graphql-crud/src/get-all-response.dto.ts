import { Type } from '@nestjs/common/interfaces';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Decimal128 } from 'mongodb';

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    items: T[];
    @Field(() => Int)
    total: number;
    @Field(() => [Decimal128], { nullable: true })
    summary: number[];
  }
  return PaginatedType;
}

export function BasicPaginated<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    items: T[];
    @Field(() => Int)
    total: number;
  }
  return PaginatedType;
}
