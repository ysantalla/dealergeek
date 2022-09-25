import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** Decimal128 mongo type */
  Decimal128: any;
  _Any: any;
  _FieldSet: any;
  link__Import: any;
};

export type AccountCreateInput = {
  account: Scalars['String'];
  activeType: Scalars['String'];
  creditOffset?: InputMaybe<Scalars['String']>;
  debitOffset?: InputMaybe<Scalars['String']>;
  departament: Scalars['String'];
  description: Scalars['String'];
  position?: InputMaybe<Scalars['Float']>;
  sheet?: InputMaybe<Scalars['String']>;
  typicalBalance: Scalars['String'];
};

export type AccountOutput = {
  __typename?: 'AccountOutput';
  _id: Scalars['ID'];
  account: Scalars['String'];
  activeType: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  creditOffset?: Maybe<Scalars['String']>;
  debitOffset?: Maybe<Scalars['String']>;
  departament: Scalars['String'];
  description: Scalars['String'];
  position?: Maybe<Scalars['Float']>;
  sheet?: Maybe<Scalars['String']>;
  typicalBalance: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AccountPaginated = {
  __typename?: 'AccountPaginated';
  items: Array<AccountOutput>;
  summary?: Maybe<Array<Scalars['Decimal128']>>;
  total: Scalars['Int'];
};

export type AccountUpdateInput = {
  account?: InputMaybe<Scalars['String']>;
  activeType?: InputMaybe<Scalars['String']>;
  creditOffset?: InputMaybe<Scalars['String']>;
  debitOffset?: InputMaybe<Scalars['String']>;
  departament?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Float']>;
  sheet?: InputMaybe<Scalars['String']>;
  typicalBalance?: InputMaybe<Scalars['String']>;
};

export type ArrayOperator = {
  field: Scalars['String'];
  value: Array<Scalars['String']>;
};

export type BinaryOperator = {
  field: Scalars['String'];
  value: Scalars['String'];
};

export type BooleanBinaryOperator = {
  field: Scalars['String'];
  value?: InputMaybe<Scalars['Boolean']>;
};

export type Filters = {
  contains?: InputMaybe<Array<BinaryOperator>>;
  endsWith?: InputMaybe<Array<BinaryOperator>>;
  equals?: InputMaybe<Array<BinaryOperator>>;
  exists?: InputMaybe<Array<BooleanBinaryOperator>>;
  greaterThan?: InputMaybe<Array<BinaryOperator>>;
  greaterThanOrEqual?: InputMaybe<Array<BinaryOperator>>;
  inArray?: InputMaybe<Array<ArrayOperator>>;
  lessThan?: InputMaybe<Array<BinaryOperator>>;
  lessThanOrEqual?: InputMaybe<Array<BinaryOperator>>;
  notContains?: InputMaybe<Array<BinaryOperator>>;
  notEquals?: InputMaybe<Array<BinaryOperator>>;
  notInArray?: InputMaybe<Array<ArrayOperator>>;
  startsWith?: InputMaybe<Array<BinaryOperator>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** OPERATION_DISABLED */
  createAccount: AccountOutput;
  /** Delete one Account by Id */
  deleteAccount: AccountOutput;
  /** Deleted many Account by Ids */
  deleteManyAccount: Scalars['Float'];
  /** Update an item(Account) by Id} */
  updateAccount: AccountOutput;
};


export type MutationCreateAccountArgs = {
  item: AccountCreateInput;
};


export type MutationDeleteAccountArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteManyAccountArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationUpdateAccountArgs = {
  id: Scalars['ID'];
  item: AccountUpdateInput;
};

export type Query = {
  __typename?: 'Query';
  /** Get one Account by Id */
  Account: AccountOutput;
  /** Filter Account's */
  Accounts: AccountPaginated;
  _service: _Service;
};


export type QueryAccountArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryAccountsArgs = {
  filters?: InputMaybe<Filters>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  sorts?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Array<Summary>>;
};

export type Summary = {
  field: Scalars['String'];
  type: SummaryType;
};

export enum SummaryType {
  Avg = 'avg',
  Count = 'count',
  Max = 'max',
  Min = 'min',
  Sum = 'sum'
}

export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']>;
};

export type UpdateAccountMutationVariables = Exact<{
  id: Scalars['ID'];
  item: AccountUpdateInput;
}>;


export type UpdateAccountMutation = { __typename?: 'Mutation', updateAccount: { __typename?: 'AccountOutput', _id: string, account: string, description: string, departament: string, typicalBalance: string, debitOffset?: string | null, creditOffset?: string | null, activeType: string, position?: number | null, sheet?: string | null } };

export type DeleteAccountMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: { __typename?: 'AccountOutput', _id: string, account: string } };

export type AccountQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AccountQuery = { __typename?: 'Query', Account: { __typename?: 'AccountOutput', _id: string, account: string, description: string, departament: string, typicalBalance: string, debitOffset?: string | null, creditOffset?: string | null, activeType: string, position?: number | null, sheet?: string | null } };

export type AccountsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  sorts?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<Filters>;
  summary?: InputMaybe<Array<Summary> | Summary>;
}>;


export type AccountsQuery = { __typename?: 'Query', Accounts: { __typename?: 'AccountPaginated', total: number, summary?: Array<any> | null, items: Array<{ __typename?: 'AccountOutput', _id: string, account: string, description: string, departament: string, typicalBalance: string, debitOffset?: string | null, creditOffset?: string | null, activeType: string, position?: number | null, sheet?: string | null }> } };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccountCreateInput: AccountCreateInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  AccountOutput: ResolverTypeWrapper<AccountOutput>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  AccountPaginated: ResolverTypeWrapper<AccountPaginated>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  AccountUpdateInput: AccountUpdateInput;
  ArrayOperator: ArrayOperator;
  BinaryOperator: BinaryOperator;
  BooleanBinaryOperator: BooleanBinaryOperator;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Decimal128: ResolverTypeWrapper<Scalars['Decimal128']>;
  Filters: Filters;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Summary: Summary;
  SummaryType: SummaryType;
  _Any: ResolverTypeWrapper<Scalars['_Any']>;
  _FieldSet: ResolverTypeWrapper<Scalars['_FieldSet']>;
  _Service: ResolverTypeWrapper<_Service>;
  link__Import: ResolverTypeWrapper<Scalars['link__Import']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccountCreateInput: AccountCreateInput;
  String: Scalars['String'];
  Float: Scalars['Float'];
  AccountOutput: AccountOutput;
  ID: Scalars['ID'];
  AccountPaginated: AccountPaginated;
  Int: Scalars['Int'];
  AccountUpdateInput: AccountUpdateInput;
  ArrayOperator: ArrayOperator;
  BinaryOperator: BinaryOperator;
  BooleanBinaryOperator: BooleanBinaryOperator;
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  Decimal128: Scalars['Decimal128'];
  Filters: Filters;
  Mutation: {};
  Query: {};
  Summary: Summary;
  _Any: Scalars['_Any'];
  _FieldSet: Scalars['_FieldSet'];
  _Service: _Service;
  link__Import: Scalars['link__Import'];
};

export type ExtendsDirectiveArgs = { };

export type ExtendsDirectiveResolver<Result, Parent, ContextType = any, Args = ExtendsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ExternalDirectiveArgs = { };

export type ExternalDirectiveResolver<Result, Parent, ContextType = any, Args = ExternalDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type InaccessibleDirectiveArgs = { };

export type InaccessibleDirectiveResolver<Result, Parent, ContextType = any, Args = InaccessibleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type KeyDirectiveArgs = {
  fields: Scalars['String'];
  resolvable?: Maybe<Scalars['Boolean']>;
};

export type KeyDirectiveResolver<Result, Parent, ContextType = any, Args = KeyDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  import?: Maybe<Array<Maybe<Scalars['link__Import']>>>;
  url: Scalars['String'];
};

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type OverrideDirectiveArgs = {
  from: Scalars['String'];
};

export type OverrideDirectiveResolver<Result, Parent, ContextType = any, Args = OverrideDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ProvidesDirectiveArgs = {
  fields: Scalars['String'];
};

export type ProvidesDirectiveResolver<Result, Parent, ContextType = any, Args = ProvidesDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type RequiresDirectiveArgs = {
  fields: Scalars['String'];
};

export type RequiresDirectiveResolver<Result, Parent, ContextType = any, Args = RequiresDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ShareableDirectiveArgs = { };

export type ShareableDirectiveResolver<Result, Parent, ContextType = any, Args = ShareableDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type TagDirectiveArgs = {
  name: Scalars['String'];
};

export type TagDirectiveResolver<Result, Parent, ContextType = any, Args = TagDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type NgModuleDirectiveArgs = {
  module: Scalars['String'];
};

export type NgModuleDirectiveResolver<Result, Parent, ContextType = any, Args = NgModuleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type NamedClientDirectiveArgs = {
  name: Scalars['String'];
};

export type NamedClientDirectiveResolver<Result, Parent, ContextType = any, Args = NamedClientDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccountOutput'] = ResolversParentTypes['AccountOutput']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  activeType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  creditOffset?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  debitOffset?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  departament?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  sheet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  typicalBalance?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountPaginatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccountPaginated'] = ResolversParentTypes['AccountPaginated']> = {
  items?: Resolver<Array<ResolversTypes['AccountOutput']>, ParentType, ContextType>;
  summary?: Resolver<Maybe<Array<ResolversTypes['Decimal128']>>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface Decimal128ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Decimal128'], any> {
  name: 'Decimal128';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAccount?: Resolver<ResolversTypes['AccountOutput'], ParentType, ContextType, RequireFields<MutationCreateAccountArgs, 'item'>>;
  deleteAccount?: Resolver<ResolversTypes['AccountOutput'], ParentType, ContextType, RequireFields<MutationDeleteAccountArgs, 'id'>>;
  deleteManyAccount?: Resolver<ResolversTypes['Float'], ParentType, ContextType, RequireFields<MutationDeleteManyAccountArgs, 'ids'>>;
  updateAccount?: Resolver<ResolversTypes['AccountOutput'], ParentType, ContextType, RequireFields<MutationUpdateAccountArgs, 'id' | 'item'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  Account?: Resolver<ResolversTypes['AccountOutput'], ParentType, ContextType, Partial<QueryAccountArgs>>;
  Accounts?: Resolver<ResolversTypes['AccountPaginated'], ParentType, ContextType, RequireFields<QueryAccountsArgs, 'limit' | 'skip' | 'sorts'>>;
  _service?: Resolver<ResolversTypes['_Service'], ParentType, ContextType>;
};

export interface _AnyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['_Any'], any> {
  name: '_Any';
}

export interface _FieldSetScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['_FieldSet'], any> {
  name: '_FieldSet';
}

export type _ServiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['_Service'] = ResolversParentTypes['_Service']> = {
  sdl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Link__ImportScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['link__Import'], any> {
  name: 'link__Import';
}

export type Resolvers<ContextType = any> = {
  AccountOutput?: AccountOutputResolvers<ContextType>;
  AccountPaginated?: AccountPaginatedResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Decimal128?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  _Any?: GraphQLScalarType;
  _FieldSet?: GraphQLScalarType;
  _Service?: _ServiceResolvers<ContextType>;
  link__Import?: GraphQLScalarType;
};

export type DirectiveResolvers<ContextType = any> = {
  extends?: ExtendsDirectiveResolver<any, any, ContextType>;
  external?: ExternalDirectiveResolver<any, any, ContextType>;
  inaccessible?: InaccessibleDirectiveResolver<any, any, ContextType>;
  key?: KeyDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  override?: OverrideDirectiveResolver<any, any, ContextType>;
  provides?: ProvidesDirectiveResolver<any, any, ContextType>;
  requires?: RequiresDirectiveResolver<any, any, ContextType>;
  shareable?: ShareableDirectiveResolver<any, any, ContextType>;
  tag?: TagDirectiveResolver<any, any, ContextType>;
  NgModule?: NgModuleDirectiveResolver<any, any, ContextType>;
  namedClient?: NamedClientDirectiveResolver<any, any, ContextType>;
};

export const UpdateAccountDocument = gql`
    mutation updateAccount($id: ID!, $item: AccountUpdateInput!) {
  updateAccount(id: $id, item: $item) {
    _id
    account
    description
    departament
    typicalBalance
    debitOffset
    creditOffset
    activeType
    position
    sheet
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateAccountGQL extends Apollo.Mutation<UpdateAccountMutation, UpdateAccountMutationVariables> {
    override document = UpdateAccountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteAccountDocument = gql`
    mutation deleteAccount($id: ID!) {
  deleteAccount(id: $id) {
    _id
    account
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteAccountGQL extends Apollo.Mutation<DeleteAccountMutation, DeleteAccountMutationVariables> {
    override document = DeleteAccountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AccountDocument = gql`
    query Account($id: ID!) {
  Account(id: $id) {
    _id
    account
    description
    departament
    typicalBalance
    debitOffset
    creditOffset
    activeType
    position
    sheet
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AccountGQL extends Apollo.Query<AccountQuery, AccountQueryVariables> {
    override document = AccountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AccountsDocument = gql`
    query Accounts($skip: Int, $limit: Int, $sorts: String, $filters: Filters, $summary: [Summary!]) {
  Accounts(
    skip: $skip
    limit: $limit
    sorts: $sorts
    filters: $filters
    summary: $summary
  ) {
    total
    summary
    items {
      _id
      account
      description
      departament
      typicalBalance
      debitOffset
      creditOffset
      activeType
      position
      sheet
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AccountsGQL extends Apollo.Query<AccountsQuery, AccountsQueryVariables> {
    override document = AccountsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }