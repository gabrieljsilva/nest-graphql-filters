import { PipeTransform, Type } from '@nestjs/common';
import { FilterArgsOptions } from '../types/filter-args-options';
export declare function getOptionsOrPipes(optionsOrPipes: FilterArgsOptions | (Type<PipeTransform> | PipeTransform)[] | Type<PipeTransform> | PipeTransform, ...pipes: (Type<PipeTransform> | PipeTransform)[]): {
    pipes: (PipeTransform<any, any> | Type<PipeTransform<any, any>>)[];
    options: FilterArgsOptions;
};
