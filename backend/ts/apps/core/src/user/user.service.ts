import { Injectable } from '@nestjs/common';
import { MongooseGraphqlCrudService } from '@app/mongo-graphql-crud';

import { User } from './user.model';

@Injectable()
export class UserService extends MongooseGraphqlCrudService(User, {
  softDelete: false,
}) {
  constructor() {
    super();
  }

  async getUserById(id: string): Promise<any> {
    return await this.getOne({
      $or: [
        {
          _id: id,
          banned: false,
        },
      ],
    });
  }
}
