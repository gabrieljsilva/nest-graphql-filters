import { FilterTypeMetadataStorage } from '../types/filter-type-metadata-storage';
import { DynamicModule } from '@nestjs/common';
export declare const createNestFilterModule: (storage: FilterTypeMetadataStorage) => {
    new (): {
        onModuleInit(): void;
    };
    register(): DynamicModule;
};
