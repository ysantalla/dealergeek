import { GetAllParams } from './get-all-query.args';
import { MongoQueryBuilder } from './mongo-query-builder';
import { Ability } from '@casl/ability';
import { QueryOptions } from 'mongoose';

export interface ICrudService {
  get(id: any, ability?: Ability, lean?: boolean): any;
  getOne(query: any): Promise<any>;
  getAll(
    query: GetAllParams,
    mongoQueryBuilder: MongoQueryBuilder,
    ability?: Ability,
  ): Promise<any[]>;
  find(
    conditions: any,
    projection?: any | null,
    options?: QueryOptions,
  ): Promise<any[]>;
  count(
    mongoQueryBuilder: MongoQueryBuilder,
    ability?: Ability,
  ): Promise<number>;

  summary(
    mongoQueryBuilder: MongoQueryBuilder,
    ability?: Ability,
  ): Promise<any[]>;

  create(dto: any): any;
  update(id: any, dto: any): any;
  updateMany(query: any, dto: any): any;
  delete(id: any): any;
  deleteMany(ids: any): any;
  aggregate(aggregations: any[]): any;
}
