import { Type } from "@nestjs/common";
import { GqlTypeReference, GraphQLTimestamp, Int, ID } from "@nestjs/graphql";

import { BooleanFilter } from "../filters/boolean-filter.filter";
import { StringFilter } from "../filters/string.filter";
import { FloatFilter } from "../filters/float-filter.filter";
import { DateTimeFilter } from "../filters/date-time.filter";
import { IdFilter } from "../filters/id-filter.filter";
import { IntFilter } from "../filters/int-filter.filter";
import { TimestampFilter } from "../filters/timestamp.filter";

export const filterTypeMap: Array<[GqlTypeReference, Type]> = [
  [Boolean, BooleanFilter],
  [String, StringFilter],
  [Number, FloatFilter],
  [Date, DateTimeFilter],
  [ID, IdFilter],
  [Int, IntFilter],
  [GraphQLTimestamp, TimestampFilter],
];
