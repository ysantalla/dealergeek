import { Ability } from '@casl/ability';
import { GetAllParams } from './get-all-query.args';

export interface ICrudResolver {
  get(id: any, ...args: any): any;
  getAll(params: GetAllParams, ...args: any): Promise<any>;
  create(dto: any, ...args: any): any;
  update(id: any, dto: any, ...args: any): any;
  delete(id: any, ...args: any): any;
  deleteMany(ids: any[], ...args: any): any;

  preGetAllAbilityHook(ability: Ability, context: any): Promise<void>;
}

export interface ICrudQueryResolver {
  get(id: any): any;
  getAll(args: GetAllParams): Promise<any>;
}
