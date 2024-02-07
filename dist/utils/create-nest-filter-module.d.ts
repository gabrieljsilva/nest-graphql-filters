import { DynamicModule } from "@nestjs/common";
import { FilterTypeMetadataStorage } from "../types/filter-type-metadata-storage";
import { DatabaseProvider } from "../types/filter-options";
export declare const createNestFilterModule: (storage: FilterTypeMetadataStorage) => {
    new (): {
        onModuleInit(): void;
    };
    register(databaseProvider: DatabaseProvider): DynamicModule;
};
