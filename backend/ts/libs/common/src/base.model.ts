import { Field, ObjectType, ID } from '@nestjs/graphql';
@ObjectType({ isAbstract: true })
export class BaseModel {
  @Field(() => ID)
  _id: string;
  @Field(() => Date, { nullable: true })
  createdAt: Date;
  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}
