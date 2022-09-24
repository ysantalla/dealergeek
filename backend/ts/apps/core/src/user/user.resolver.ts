import { Resolver } from '@nestjs/graphql';
import { MongoGraphqlCrudResolver } from '@app/mongo-graphql-crud';

import { USER_ABILITY } from './abilities';
import { UserService } from './user.service';
import {
  User,
  UserCreateInput,
  UserOutput,
  UserUpdateInput,
} from './user.model';

@Resolver()
export class UserResolver extends MongoGraphqlCrudResolver(User, UserService, {
  create: { input: UserCreateInput, disabled: true },
  update: { input: UserUpdateInput },
  output: UserOutput,
  caslAbility: USER_ABILITY,
}) {
  constructor() {
    super();
  }
}
