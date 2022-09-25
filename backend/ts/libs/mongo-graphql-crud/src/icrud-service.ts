import { GetAllParams } from './get-all-query.args';
import { MongoQueryBuilder } from './mongo-query-builder';
import { QueryOptions } from 'mongoose';

export interface ICrudService {
  get(id: any, lean?: boolean): any;
  getOne(query: any): Promise<any>;
  getAll(
    query: GetAllParams,
    mongoQueryBuilder: MongoQueryBuilder,
  ): Promise<any[]>;
  find(
    conditions: any,
    projection?: any | null,
    options?: QueryOptions,
  ): Promise<any[]>;
  count(mongoQueryBuilder: MongoQueryBuilder): Promise<number>;

  summary(mongoQueryBuilder: MongoQueryBuilder): Promise<any[]>;

  create(dto: any): any;
  update(id: any, dto: any): any;
  updateMany(query: any, dto: any): any;
  createMany(dto: any): Promise<any>;
  delete(id: any): any;
  deleteMany(ids: any): any;
  aggregate(aggregations: any[]): any;
}
