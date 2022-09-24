import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { BaseModel } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType({ isAbstract: true })
@Schema({
  timestamps: true,
})
export class Account extends BaseModel {
  @Prop({ required: true, unique: true, index: true })
  @Field()
  account: string;

  @Prop({ required: true, index: true })
  @Field()
  description: string;

  @Prop({ required: true })
  @Field()
  departament: string;

  @Prop({ required: true })
  @Field()
  typicalBalance: string;

  @Prop({ required: false })
  @Field({ nullable: true })
  debitOffset?: string;

  @Prop({ required: false })
  @Field({ nullable: true })
  creditOffset?: string;

  @Prop({ required: true })
  @Field()
  activeType: string;

  @Prop({ required: false })
  @Field(() => Number, { nullable: true })
  position?: number;

  @Prop({ required: false })
  @Field({ nullable: true })
  sheet?: string;
}

export type AccountDoc = Account & Document;

export const AccountSchema = SchemaFactory.createForClass(Account);

@InputType()
export class AccountCreateInput extends OmitType(
  Account,
  ['_id', 'createdAt', 'updatedAt'] as const,
  InputType,
) {}

@InputType()
export class AccountUpdateInput extends PartialType(
  OmitType(AccountCreateInput, [] as const),
) {}

@ObjectType()
export class AccountOutput extends OmitType(Account, [] as const) {}
