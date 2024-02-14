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
exports.FilterTypeMetadataStorage = void 0;
const graphql_1 = require("@nestjs/graphql");
const field_metadata_1 = require("./field-metadata");
const logical_operations_1 = require("../enums/logical-operations");
const map_by_1 = require("../utils/map-by");
class FilterTypeMetadataStorage {
    constructor(params) {
        this.typesToFilterMap = params.typesToFilterMap;
        this.fieldsByTarget = params.fieldsByTarget;
        this.fieldsToTypeIndexedByName = params.fieldsToTypeIndexedByName;
    }
    addFieldMetadata(target, field) {
        this.fieldsByTarget.add(target, field);
    }
    createTypeFromField(target, field) {
        graphql_1.TypeMetadataStorage.addClassFieldMetadata({
            name: field.originalName,
            schemaName: field.name,
            options: {
                isArray: false,
                nullable: true,
            },
            target: target,
            typeFn: () => field.type,
            description: field.description,
        });
    }
    createFilterTypeFromField(target, field) {
        const fieldFilterType = this.typesToFilterMap.getValueByKey(field.type);
        graphql_1.TypeMetadataStorage.addClassFieldMetadata({
            name: field.originalName,
            schemaName: field.name,
            options: {
                isArray: false,
                nullable: true,
            },
            target: target,
            typeFn: () => fieldFilterType,
            description: field.description,
        });
    }
    indexFieldsByName() {
        const typeFieldsMap = this.fieldsByTarget.entries();
        for (const [type, fields] of typeFieldsMap) {
            const mappedFields = (0, map_by_1.mapBy)(fields, "name");
            this.fieldsToTypeIndexedByName.set(type, mappedFields);
        }
    }
    getOrCreateFilterType(target) {
        const filterType = this.typesToFilterMap.getValueByKey(target);
        if (filterType) {
            return filterType;
        }
        class FilterInputType {
        }
        __decorate([
            (0, graphql_1.Field)(() => [FilterInputType], { nullable: true }),
            __metadata("design:type", FilterInputType)
        ], FilterInputType.prototype, "_AND", void 0);
        __decorate([
            (0, graphql_1.Field)(() => [FilterInputType], { nullable: true }),
            __metadata("design:type", FilterInputType)
        ], FilterInputType.prototype, "_OR", void 0);
        __decorate([
            (0, graphql_1.Field)(() => FilterInputType, { nullable: true }),
            __metadata("design:type", FilterInputType)
        ], FilterInputType.prototype, "_NOT", void 0);
        Object.defineProperty(FilterInputType, "name", {
            value: `${target.name}Filter`,
        });
        this.typesToFilterMap.set(target, FilterInputType);
        this.fieldsByTarget.add(target, new field_metadata_1.FieldMetadata({
            name: logical_operations_1.LOGICAL_OPERATORS._AND,
            originalName: logical_operations_1.LOGICAL_OPERATORS._AND,
            type: target,
            isArray: true,
            nullable: true,
            description: `and operator for ${target.name} filter`,
        }));
        this.fieldsByTarget.add(target, new field_metadata_1.FieldMetadata({
            name: logical_operations_1.LOGICAL_OPERATORS._OR,
            originalName: logical_operations_1.LOGICAL_OPERATORS._OR,
            type: target,
            isArray: true,
            nullable: true,
            description: `or operator for ${target.name} filter`,
        }));
        this.fieldsByTarget.add(target, new field_metadata_1.FieldMetadata({
            name: logical_operations_1.LOGICAL_OPERATORS._NOT,
            originalName: logical_operations_1.LOGICAL_OPERATORS._NOT,
            type: target,
            isArray: false,
            nullable: true,
            description: `not operator for ${target.name} filter`,
        }));
        return FilterInputType;
    }
}
exports.FilterTypeMetadataStorage = FilterTypeMetadataStorage;
//# sourceMappingURL=filter-type-metadata-storage.js.map