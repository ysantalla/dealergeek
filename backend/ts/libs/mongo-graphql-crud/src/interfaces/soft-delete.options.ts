export interface MongooseDeleteOptions {
  softDelete?: boolean;
}

export const OverrideMethodsMongooseSoftDelete = [
  'count',
  'countDocuments',
  'find',
  'findOne',
  'findOneAndUpdate',
  'aggregate',
  // "update",
  'updateMany',
];
