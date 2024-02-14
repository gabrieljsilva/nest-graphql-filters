import { GqlTypeReference } from "@nestjs/graphql";

export type { FilterOf } from "./types/filter-of.type";
export { DatabaseProvider, FilterOptions } from "./types/filter-options";
export { COMPARISON_OPERATOR } from "./enums/comparison-operators";
export { LOGICAL_OPERATORS } from "./enums/logical-operations";
export { SORT_OPERATOR } from "./enums/sort-operator";
export { FieldMetadata } from "./types/field-metadata";

import { FieldMetadata } from "./types/field-metadata";
import { FilterTypeMetadataStorage } from "./types/filter-type-metadata-storage";
import { BidirectionalMap } from "./types/bidirectional-map";
import { MultiMap } from "./types/multimap";

import { createGetFieldMetadata } from "./utils/create-get-field-metadata";
import { createGetFilterOf } from "./utils/create-get-filter-of";
import { createGetIndexedFields } from "./utils/create-get-indexed-fields";
import { createFilterableFieldDecorator } from "./utils/create-filterable-field-decorator";
import { createFilterArgsDecorator } from "./utils/create-filter-args-decorator";
import { createFilterableEntityDecorator } from "./utils/create-filterable-entity-decorator";
import { createNestFilterModule } from "./utils/create-nest-filter-module";

import { filterTypeMap } from "./constants/filter-type-map";
import { createSortableEntityDecorator } from "./utils/create-sortable-entity-decorator";

const typesToFilterMap = new BidirectionalMap(filterTypeMap);
const fieldsByTarget = new MultiMap<GqlTypeReference, FieldMetadata>();
const fieldsToTypeIndexedByName = new Map();

const storage = new FilterTypeMetadataStorage({
  typesToFilterMap: typesToFilterMap,
  fieldsByTarget: fieldsByTarget,
  fieldsToTypeIndexedByName: fieldsToTypeIndexedByName,
});

export const FilterableField = createFilterableFieldDecorator(storage);
export const FilterArgs = createFilterArgsDecorator(storage);
export const FilterableEntity = createFilterableEntityDecorator(storage);
export const SortableEntity = createSortableEntityDecorator(storage);
export const getFieldMetadata = createGetFieldMetadata(storage);
export const getFilterOf = createGetFilterOf(storage);
export const getIndexedFields = createGetIndexedFields(storage);
export const NestFilterModule = createNestFilterModule(storage);
