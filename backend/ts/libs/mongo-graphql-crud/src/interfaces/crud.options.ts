export interface RelationResolver {
  field: string;
  collection: string;
}

interface BaseOperation {
  name?: string;
  disabled?: boolean;
  output?: any;
  secure?: boolean;
  input?: any;
}

interface GetAllOperation extends Omit<BaseOperation, 'input'> {
  relationResolvers?: RelationResolver[];
}

export interface ResolverCrudOptions {
  create?: BaseOperation;
  update?: BaseOperation;
  get?: Omit<BaseOperation, 'input'>;
  getAll?: GetAllOperation;
  delete?: Omit<BaseOperation, 'input'>;
  deleteMany?: Omit<BaseOperation, 'input'>;
  output?: any;
  caslAbility?: string;
}

export const getSecureValue = (baseOperation: { secure?: boolean }): boolean =>
  baseOperation?.secure === undefined ? true : baseOperation?.secure;
export const getDisabledValue = (baseOperation: {
  disabled?: boolean;
}): boolean =>
  baseOperation?.disabled === undefined ? false : baseOperation?.disabled;

export const DisabledOperationMessage = 'OPERATION_DISABLED';
