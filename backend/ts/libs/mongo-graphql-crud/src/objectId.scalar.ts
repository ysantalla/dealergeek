import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind } from 'graphql';
import { ObjectId } from 'mongodb';

@Scalar('ObjectIdScalar')
export class ObjectIdScalar implements CustomScalar<string, ObjectId> {
  description = 'Mongo ObjectID Scalar';

  parseValue(value: string): ObjectId {
    return new ObjectId(value); // value from the client input variables
  }
  serialize(value: ObjectId): string {
    console.log(value);
    return value.toHexString(); // value sent to the client
  }
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value); // value from the client query
    }
    return null;
  }
}
