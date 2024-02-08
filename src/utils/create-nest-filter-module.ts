import { DynamicModule, OnModuleInit } from "@nestjs/common";

import { FilterTypeMetadataStorage } from "../types/filter-type-metadata-storage";
import { DatabaseProvider, FilterOptions } from "../types/filter-options";
import { LazyMetadataStorage } from "@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage";

export const createNestFilterModule = (storage: FilterTypeMetadataStorage) => {
  return class NestFilterModule implements OnModuleInit {
    onModuleInit() {
      LazyMetadataStorage.load();
      storage.indexFieldsByName();
    }

    static register(databaseProvider: DatabaseProvider): DynamicModule {
      const provider = {
        provide: FilterOptions,
        useValue: new FilterOptions(databaseProvider),
      };

      return {
        global: true,
        module: NestFilterModule,
        imports: [],
        providers: [provider],
        exports: [provider],
      };
    }
  };
};
