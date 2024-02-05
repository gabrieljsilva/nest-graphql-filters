import { FilterTypeMetadataStorage } from '../types/filter-type-metadata-storage';
import { DynamicModule, OnModuleInit } from '@nestjs/common';

export const createNestFilterModule = (storage: FilterTypeMetadataStorage) => {
  return class NestFilterModule implements OnModuleInit {
    onModuleInit() {
      storage.indexFieldsByName();
    }

    static register(): DynamicModule {
      return {
        global: true,
        module: NestFilterModule,
        imports: [],
        providers: [],
        exports: [],
      };
    }
  };
};
