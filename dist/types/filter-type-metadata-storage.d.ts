import { GqlTypeReference } from "@nestjs/graphql";
import { Type } from "@nestjs/common";
import { BidirectionalMap } from "./bidirectional-map";
import { MultiMap } from "./multimap";
import { FieldMetadata } from "./field-metadata";
interface IFilterTypeMetadataStorage {
    typesToFilterMap: BidirectionalMap<GqlTypeReference, Type<unknown>>;
    fieldsByTarget: MultiMap<GqlTypeReference, FieldMetadata>;
    fieldsToTypeIndexedByName: Map<GqlTypeReference, Map<string, FieldMetadata>>;
}
export declare class FilterTypeMetadataStorage implements IFilterTypeMetadataStorage {
    typesToFilterMap: BidirectionalMap<GqlTypeReference, Type<unknown>>;
    fieldsByTarget: MultiMap<GqlTypeReference, FieldMetadata>;
    fieldsToTypeIndexedByName: Map<GqlTypeReference, Map<string, FieldMetadata>>;
    constructor(params: IFilterTypeMetadataStorage);
    addFieldMetadata(target: GqlTypeReference, field: FieldMetadata): void;
    createTypeFromField(target: Type, field: FieldMetadata): void;
    createFilterTypeFromField(target: Type<unknown>, field: FieldMetadata): void;
    indexFieldsByName(): void;
    getOrCreateFilterType(target: Type<unknown>): Type<unknown>;
}
export {};
