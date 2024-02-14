import { BooleanFilter } from "../filters/boolean-filter.filter";
import { FloatFilter } from "../filters/float-filter.filter";
import { StringFilter } from "../filters/string.filter";
import { DateTimeFilter } from "../filters/date-time.filter";
import { SORT_DIRECTION } from "../enums/sort-direction";
import { SORT_OPERATOR } from "../enums/sort-operator";
import { LOGICAL_OPERATORS } from "../enums/logical-operations";

type ArrayFilter<T> = T extends Array<infer U> ? FilterOf<U> : never;

type BaseFilter<T> = {
  [K in keyof T]: T[K] extends boolean
    ? BooleanFilter
    : T[K] extends number
      ? FloatFilter
      : T[K] extends string
        ? StringFilter
        : T[K] extends Date
          ? DateTimeFilter
          : ArrayFilter<T[K]> extends never
            ? FilterOf<T[K]>
            : ArrayFilter<T[K]>;
};

export type LogicalOperationsFilter<T> = {
  [LOGICAL_OPERATORS._AND]: Array<FilterOf<T>>;
  [LOGICAL_OPERATORS._OR]: Array<FilterOf<T>>;
  [LOGICAL_OPERATORS._NOT]: FilterOf<T>;
};

export type SortOperator<T> = {
  fields: Array<keyof T>;
  direction: SORT_DIRECTION;
};

export type SortOperatorField<T> = {
  [SORT_OPERATOR._SORT_BY]?: SortOperator<T>;
};

export type FilterOf<T> = Partial<BaseFilter<T> & LogicalOperationsFilter<T>> &
  SortOperatorField<T>;
