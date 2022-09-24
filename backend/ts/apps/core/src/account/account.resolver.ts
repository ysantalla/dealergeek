import { Resolver } from '@nestjs/graphql';
import { MongoGraphqlCrudResolver } from '@app/mongo-graphql-crud';

import { USER_ABILITY } from './abilities';
import {
  Account,
  AccountCreateInput,
  AccountOutput,
  AccountUpdateInput,
} from './account.model';
import { AccountService } from './account.service';

@Resolver()
export class AccountResolver extends MongoGraphqlCrudResolver(
  Account,
  AccountService,
  {
    create: { input: AccountCreateInput, disabled: true },
    update: { input: AccountUpdateInput },
    output: AccountOutput,
    caslAbility: USER_ABILITY,
  },
) {
  constructor() {
    super();
  }
}
