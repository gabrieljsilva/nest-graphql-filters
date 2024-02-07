import { GqlTypeReference } from "@nestjs/graphql";
export type { FilterOf } from "./types/filter-of.type";
export { DatabaseProvider, FilterOptions } from "./types/filter-options";
export { COMPARISON_OPERATOR } from "./enums/comparison-operators";
export { LOGICAL_OPERATORS } from "./enums/logical-operations";
import { FieldMetadata } from "./types/field-metadata";
export { FieldMetadata } from "./types/field-metadata";
export declare const FilterableField: <T extends import("@nestjs/graphql").ReturnTypeFuncValue>(typeOrOptions?: import("@nestjs/graphql").ReturnTypeFunc<T> | (T extends [GqlTypeReference] ? {
    name?: string;
    description?: string;
    nullable?: boolean;
} : T extends GqlTypeReference ? {
    name?: string;
    description?: string;
    nullable?: boolean;
} : never), fieldOptions?: T extends [GqlTypeReference] ? {
    name?: string;
    description?: string;
    nullable?: boolean;
} : T extends GqlTypeReference ? {
    name?: string;
    description?: string;
    nullable?: boolean;
} : never) => (prototype: {}, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>) => void;
export declare const FilterArgs: (type: import("@nestjs/common").Type<any>, optionsOrPipe?: import("./types/filter-args-options").FilterArgsOptions | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>, ...pipes: (import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => (target: any, key: string, index: number) => void;
export declare const FilterableEntity: (name?: string) => (target: any) => void;
export declare const getFieldMetadata: (target: import("@nestjs/common").Type<any>) => Set<FieldMetadata>;
export declare const getFilterOf: <T = any>(classRef: GqlTypeReference<T>) => import("@nestjs/common").Type<unknown>;
export declare const getIndexedFields: (type: GqlTypeReference) => Map<string, FieldMetadata>;
export declare const NestFilterModule: {
    new (): {
        onModuleInit(): void;
    };
    register(databaseProvider: import("./types/filter-options").DatabaseProvider): import("@nestjs/common").DynamicModule;
};
