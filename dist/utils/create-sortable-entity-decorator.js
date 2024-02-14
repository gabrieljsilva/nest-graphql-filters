"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSortableEntityDecorator = void 0;
const graphql_1 = require("@nestjs/graphql");
const lazy_metadata_storage_1 = require("@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage");
const field_metadata_1 = require("../types/field-metadata");
const create_enum_of_entity_fields_1 = require("./create-enum-of-entity-fields");
const createSortableEntityDecorator = (storage) => {
    let SortDirection;
    (function (SortDirection) {
        SortDirection["desc"] = "desc";
        SortDirection["asc"] = "asc";
    })(SortDirection || (SortDirection = {}));
    (0, graphql_1.registerEnumType)(SortDirection, { name: "SortDirection" });
    return function SortableEntity() {
        return (target) => {
            const filterInputType = storage.typesToFilterMap.getValueByKey(target);
            const createSortableFieldFN = () => {
                const fields = storage.fieldsByTarget.getValuesByKey(target);
                const enumFields = (0, create_enum_of_entity_fields_1.createEnumOfEntityFields)(fields);
                (0, graphql_1.registerEnumType)(enumFields, { name: `${target.name}Fields` });
                let OrderByField = class OrderByField {
                };
                __decorate([
                    (0, graphql_1.Field)(() => SortDirection),
                    __metadata("design:type", String)
                ], OrderByField.prototype, "direction", void 0);
                __decorate([
                    (0, graphql_1.Field)(() => [enumFields]),
                    __metadata("design:type", Array)
                ], OrderByField.prototype, "fields", void 0);
                OrderByField = __decorate([
                    (0, graphql_1.InputType)(`${target.name}SortBy`)
                ], OrderByField);
                const fieldMetadata = new field_metadata_1.FieldMetadata({
                    name: "_SORT_BY",
                    originalName: "_SORT_BY",
                    nullable: true,
                    isArray: false,
                    type: OrderByField,
                });
                storage.addFieldMetadata(target, fieldMetadata);
                storage.createTypeFromField(filterInputType, fieldMetadata);
            };
            lazy_metadata_storage_1.LazyMetadataStorage.store(filterInputType, createSortableFieldFN, {
                isField: true,
            });
        };
    };
};
exports.createSortableEntityDecorator = createSortableEntityDecorator;
//# sourceMappingURL=create-sortable-entity-decorator.js.map