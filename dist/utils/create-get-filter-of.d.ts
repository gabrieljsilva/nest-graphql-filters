import { FilterTypeMetadataStorage } from '../types/filter-type-metadata-storage';
import { GqlTypeReference } from '@nestjs/graphql';
export declare function createGetFilterOf(storage: FilterTypeMetadataStorage): <T = any>(classRef: GqlTypeReference<T>) => import("@nestjs/common").Type<unknown>;
