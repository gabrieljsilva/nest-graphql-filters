import { FilterTypeMetadataStorage } from '../types/filter-type-metadata-storage';
import { GqlTypeReference } from '@nestjs/graphql';

export function createGetFilterOf(storage: FilterTypeMetadataStorage) {
  return <T = any>(classRef: GqlTypeReference<T>) =>
    storage.typesToFilterMap.getValueByKey(classRef);
}
