import { GqlTypeReference } from "@nestjs/graphql";
import { FilterTypeMetadataStorage } from "../types/filter-type-metadata-storage";

export function createGetIndexedFields(storage: FilterTypeMetadataStorage) {
  return (type: GqlTypeReference) =>
    storage.fieldsToTypeIndexedByName.get(type);
}
