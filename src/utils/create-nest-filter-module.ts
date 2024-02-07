import { DynamicModule, OnModuleInit } from "@nestjs/common";

import { FilterTypeMetadataStorage } from "../types/filter-type-metadata-storage";
import { DatabaseProvider, FilterOptions } from "../types/filter-options";

export const createNestFilterModule = (storage: FilterTypeMetadataStorage) => {
  return class NestFilterModule implements OnModuleInit {
    onModuleInit() {
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
