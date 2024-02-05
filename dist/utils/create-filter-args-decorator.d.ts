import { PipeTransform, Type } from '@nestjs/common';
import { FilterTypeMetadataStorage } from '../types/filter-type-metadata-storage';
import { FilterArgsOptions } from '../types/filter-args-options';
export declare const createFilterArgsDecorator: (storage: FilterTypeMetadataStorage) => (type: Type, optionsOrPipe?: FilterArgsOptions | Type<PipeTransform> | PipeTransform, ...pipes: (Type<PipeTransform> | PipeTransform)[]) => (target: NonNullable<any>, key: string, index: number) => void;
