import { Injectable } from '@nestjs/common';
import { MongooseGraphqlCrudService } from '@app/mongo-graphql-crud';

import { Account } from './account.model';

@Injectable()
export class AccountService extends MongooseGraphqlCrudService(Account, {
  softDelete: false,
}) {
  constructor() {
    super();
  }
}
