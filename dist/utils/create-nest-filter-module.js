"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNestFilterModule = void 0;
const filter_options_1 = require("../types/filter-options");
const lazy_metadata_storage_1 = require("@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage");
const createNestFilterModule = (storage) => {
    return class NestFilterModule {
        onModuleInit() {
            lazy_metadata_storage_1.LazyMetadataStorage.load();
            storage.indexFieldsByName();
        }
        static register(databaseProvider) {
            const provider = {
                provide: filter_options_1.FilterOptions,
                useValue: new filter_options_1.FilterOptions(databaseProvider),
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
exports.createNestFilterModule = createNestFilterModule;
//# sourceMappingURL=create-nest-filter-module.js.map