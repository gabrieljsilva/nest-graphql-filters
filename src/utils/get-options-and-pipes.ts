import { PipeTransform, Type } from '@nestjs/common';
import { isPipe } from '@nestjs/graphql/dist/utils/is-pipe.util';
import { FilterArgsOptions } from '../types/filter-args-options';

export function getOptionsOrPipes(
  optionsOrPipes:
    | FilterArgsOptions
    | (Type<PipeTransform> | PipeTransform)[]
    | Type<PipeTransform>
    | PipeTransform,
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
) {
  const extractedOptions: FilterArgsOptions = {
    name: 'filters',
  };

  if (isPipe(optionsOrPipes)) {
    pipes.push(optionsOrPipes);
  } else {
    const options = optionsOrPipes as FilterArgsOptions;
    extractedOptions.name = options?.name || extractedOptions.name;
    extractedOptions.description = options?.description;
  }

  return {
    pipes: pipes,
    options: extractedOptions,
  };
}
