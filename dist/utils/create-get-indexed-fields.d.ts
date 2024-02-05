import { GqlTypeReference } from "@nestjs/graphql";
import { FilterTypeMetadataStorage } from "../types/filter-type-metadata-storage";
export declare function createGetIndexedFields(storage: FilterTypeMetadataStorage): (type: GqlTypeReference) => Map<string, import("..").FieldMetadata>;
