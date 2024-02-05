import { InputType } from '@nestjs/graphql';
import { FilterTypeMetadataStorage } from '../types/filter-type-metadata-storage';

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
