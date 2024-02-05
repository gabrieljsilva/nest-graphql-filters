import { PipeTransform, Type } from '@nestjs/common';
import { Args } from '@nestjs/graphql';

import { FilterTypeMetadataStorage } from '../types/filter-type-metadata-storage';
import { FilterArgsOptions } from '../types/filter-args-options';
import { getOptionsOrPipes } from './get-options-and-pipes';

export const createFilterArgsDecorator = (
  storage: FilterTypeMetadataStorage,
) => {
  return function FilterArgs(
    type: Type,
    optionsOrPipe?: FilterArgsOptions | Type<PipeTransform> | PipeTransform,
    ...pipes: (Type<PipeTransform> | PipeTransform)[]
  ) {
    const { options, pipes: extractedPipes } = getOptionsOrPipes(
      optionsOrPipe,
      ...pipes,
    );

    return (target: NonNullable<any>, key: string, index: number) => {
      const filterType = storage.typesToFilterMap.getValueByKey(type);

      Args(
        options.name,
        {
          type: () => filterType,
          name: options.name,
          description: options?.description,
          nullable: true,
        },
        ...extractedPipes,
      )(target, key, index);
    };
  };
};
