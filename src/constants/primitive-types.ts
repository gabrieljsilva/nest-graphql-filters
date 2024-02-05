import {
  Float,
  GqlTypeReference,
  GraphQLISODateTime,
  ID,
  Int,
  GraphQLTimestamp,
} from '@nestjs/graphql';

export const primitiveTypes = new Set<GqlTypeReference>([
  Boolean,
  Number,
  String,
  Date,
  ID,
  Int,
  Float,
  GraphQLISODateTime,
  GraphQLTimestamp,
]);
