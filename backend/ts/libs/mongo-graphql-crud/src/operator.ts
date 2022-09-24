import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BinaryOperator {
  @Field()
  field: string;
  @Field()
  value: string;
}

@InputType()
export class BooleanBinaryOperator {
  @Field()
  field: string;
  @Field({ defaultValue: true, nullable: true })
  value?: boolean;
}

@InputType()
export class ArrayOperator {
  @Field()
  field: string;
  @Field(() => [String])
  value: string[];
}
