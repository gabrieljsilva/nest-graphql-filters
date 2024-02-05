import { Type } from '@nestjs/common';
import { FilterTypeMetadataStorage } from '../types/filter-type-metadata-storage';

export function createGetFieldMetadata(storage: FilterTypeMetadataStorage) {
  return (target: Type) => storage.fieldsByTarget.getValuesByKey(target);
}
