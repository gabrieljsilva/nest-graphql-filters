import { GqlTypeReference } from '@nestjs/graphql';
interface FieldMetadataConstructor {
    name: string;
    type: GqlTypeReference;
    description?: string;
    originalName: string;
    isArray: boolean;
    nullable: boolean;
}
export declare class FieldMetadata {
    name: string;
    type: GqlTypeReference;
    description?: string;
    originalName: string;
    isArray: boolean;
    nullable: boolean;
    isPrimitiveType: boolean;
    constructor(metadata: FieldMetadataConstructor);
}
export {};
