import { GqlTypeReference, ReturnTypeFunc, ReturnTypeFuncValue } from '@nestjs/graphql';
import { FilterTypeMetadataStorage } from '../types/filter-type-metadata-storage';
type FieldOptions = {
    name?: string;
    description?: string;
    nullable?: boolean;
};
type FieldOptionsExtractor<T> = T extends [GqlTypeReference] ? FieldOptions : T extends GqlTypeReference ? FieldOptions : never;
export declare const createFilterableFieldDecorator: (storage: FilterTypeMetadataStorage) => <T extends ReturnTypeFuncValue>(typeOrOptions?: ReturnTypeFunc<T> | FieldOptionsExtractor<T>, fieldOptions?: FieldOptionsExtractor<T>) => (prototype: NonNullable<unknown>, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>) => void;
export {};
