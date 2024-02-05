"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNestFilterModule = void 0;
const createNestFilterModule = (storage) => {
    return class NestFilterModule {
        onModuleInit() {
            storage.indexFieldsByName();
        }
        static register() {
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
exports.createNestFilterModule = createNestFilterModule;
//# sourceMappingURL=create-nest-filter-module.js.map