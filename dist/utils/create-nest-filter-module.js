"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNestFilterModule = void 0;
const filter_options_1 = require("../types/filter-options");
const createNestFilterModule = (storage) => {
    return class NestFilterModule {
        onModuleInit() {
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