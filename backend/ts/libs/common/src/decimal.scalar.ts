import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { Decimal128 } from 'mongodb';

export const convertDecimal128ToNumber = (value: Decimal128): number => {
  return parseFloat(parseFloat(value.toString()).toFixed(2));
};

@Scalar('Decimal128', () => Decimal128)
export class DecimalScalar implements CustomScalar<any, number> {
  description = 'Decimal128 mongo type';

  parseValue(value: number): number {
    return value; // value from the client
  }

  serialize(value: Decimal128): number {
    return convertDecimal128ToNumber(value);
  }

  parseLiteral(ast: ValueNode): number {
    if (ast.kind === Kind.FLOAT) {
      return parseFloat(ast.value);
    }
    return null;
  }
}
