import { Type } from '@nestjs/common';
import { FilterTypeMetadataStorage } from '../types/filter-type-metadata-storage';
export declare function createGetFieldMetadata(storage: FilterTypeMetadataStorage): (target: Type) => Set<import("..").FieldMetadata>;
