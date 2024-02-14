import {
  Field,
  InputType,
  registerEnumType,
  TypeMetadataStorage,
} from "@nestjs/graphql";
import { FilterTypeMetadataStorage } from "../types/filter-type-metadata-storage";
import { FieldMetadata } from "../types/field-metadata";
import { LazyMetadataStorage } from "@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage";

export const createFilterableEntityDecorator = (
  storage: FilterTypeMetadataStorage,
) => {
  return function FilterableEntity(name?: string) {
    return (target: NonNullable<any>) => {
      const filterInputType = storage.typesToFilterMap.getValueByKey(target);

      InputType(name || filterInputType.name)(filterInputType);
    };
  };
};
