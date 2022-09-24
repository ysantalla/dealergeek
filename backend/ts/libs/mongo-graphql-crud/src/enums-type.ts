import { registerEnumType } from '@nestjs/graphql';

export enum SummaryType {
  sum = 'sum',
  min = 'min',
  max = 'max',
  avg = 'avg',
  count = 'count',
}

export enum OrderType {
  asc = 1,
  desc = -1,
}

registerEnumType(SummaryType, {
  name: 'SummaryType',
});

registerEnumType(OrderType, {
  name: 'OrderType',
});
