"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFilterableFieldDecorator = void 0;
const lazy_metadata_storage_1 = require("@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const reflection_utilts_1 = require("@nestjs/graphql/dist/utils/reflection.utilts");
const field_metadata_1 = require("../types/field-metadata");
const createFilterableFieldDecorator = (storage) => {
    return function FilterableField(typeOrOptions, fieldOptions) {
        return (prototype, propertyKey, descriptor) => {
            const target = prototype.constructor;
            const [returnTypeFunc, fieldTypeOptions = {}] = (0, shared_utils_1.isFunction)(typeOrOptions)
                ? [typeOrOptions, fieldOptions]
                : [undefined, typeOrOptions];
            const filterInputType = storage.getOrCreateFilterType(target);
            const applyField = () => {
                const isResolverMethod = !!(descriptor && descriptor.value);
                const { typeFn, options: { isArray = false, nullable = false }, } = (0, reflection_utilts_1.reflectTypeFromMetadata)({
                    metadataKey: isResolverMethod ? "design:returntype" : "design:type",
                    prototype: prototype,
                    propertyKey: propertyKey,
                    explicitTypeFn: returnTypeFunc,
                    typeOptions: fieldTypeOptions,
                    ignoreOnUndefinedType: false,
                });
                const fieldMetadata = new field_metadata_1.FieldMetadata({
                    name: fieldOptions?.name || propertyKey,
                    type: typeFn(),
                    isArray: isArray,
                    nullable: nullable,
                    description: fieldOptions?.description,
                    originalName: propertyKey,
                });
                storage.addFieldMetadata(target, fieldMetadata);
                storage.createFilterTypeFromField(filterInputType, fieldMetadata);
            };
            lazy_metadata_storage_1.LazyMetadataStorage.store(filterInputType, applyField, {
                isField: true,
            });
        };
    };
};
exports.createFilterableFieldDecorator = createFilterableFieldDecorator;
//# sourceMappingURL=create-filterable-field-decorator.js.map