import {
  ArgsType,
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';

import {
  IsEmail,
  MinLength,
  ValidateIf,
  ArrayNotEmpty,
  IsUrl,
} from 'class-validator';
import { BaseModel } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType({ isAbstract: true })
@Schema({
  timestamps: true,
})
export class User extends BaseModel {
  @Prop({ required: true, unique: true, index: true })
  @Field()
  username: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  lastName: string;

  @Prop({ unique: true, index: true })
  @ValidateIf((o) => o.email)
  @IsEmail(
    {},
    {
      message: 'Invalid email',
    },
  )
  @Field()
  email?: string;
}

export type UserDoc = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

@InputType()
export class UserCreateInput extends OmitType(
  User,
  ['_id', 'createdAt', 'updatedAt'] as const,
  InputType,
) {}

@InputType()
export class UserUpdateInput extends PartialType(
  OmitType(UserCreateInput, [] as const),
) {}

@ObjectType()
export class UserOutput extends OmitType(User, [] as const) {}
