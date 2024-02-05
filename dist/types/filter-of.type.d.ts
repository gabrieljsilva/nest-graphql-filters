import { BooleanFilter } from '../filters/boolean-filter.filter';
import { FloatFilter } from '../filters/float-filter.filter';
import { StringFilter } from '../filters/string.filter';
import { DateTimeFilter } from '../filters/date-time.filter';
type ArrayFilter<T> = T extends Array<infer U> ? FilterOf<U> : never;
type BaseFilter<T> = {
    [K in keyof T]: T[K] extends boolean ? BooleanFilter : T[K] extends number ? FloatFilter : T[K] extends string ? StringFilter : T[K] extends Date ? DateTimeFilter : ArrayFilter<T[K]> extends never ? FilterOf<T[K]> : ArrayFilter<T[K]>;
};
export type LogicalOperationsFilter<T> = {
    _AND: Array<FilterOf<T>>;
    _OR: Array<FilterOf<T>>;
    _NOT: FilterOf<T>;
};
export type FilterOf<T> = BaseFilter<T> & LogicalOperationsFilter<T>;
export {};
