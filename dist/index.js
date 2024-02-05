"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestFilterModule = exports.getIndexedFields = exports.getFilterOf = exports.getFieldMetadata = exports.FilterableEntity = exports.FilterArgs = exports.FilterableField = exports.FieldMetadata = exports.LOGICAL_OPERATORS = exports.COMPARISON_OPERATOR = void 0;
var comparison_operators_1 = require("./enums/comparison-operators");
Object.defineProperty(exports, "COMPARISON_OPERATOR", { enumerable: true, get: function () { return comparison_operators_1.COMPARISON_OPERATOR; } });
var logical_operations_1 = require("./enums/logical-operations");
Object.defineProperty(exports, "LOGICAL_OPERATORS", { enumerable: true, get: function () { return logical_operations_1.LOGICAL_OPERATORS; } });
const filter_type_metadata_storage_1 = require("./types/filter-type-metadata-storage");
const bidirectional_map_1 = require("./types/bidirectional-map");
const multimap_1 = require("./types/multimap");
var field_metadata_1 = require("./types/field-metadata");
Object.defineProperty(exports, "FieldMetadata", { enumerable: true, get: function () { return field_metadata_1.FieldMetadata; } });
const create_get_field_metadata_1 = require("./utils/create-get-field-metadata");
const create_get_filter_of_1 = require("./utils/create-get-filter-of");
const create_get_indexed_fields_1 = require("./utils/create-get-indexed-fields");
const create_filterable_field_decorator_1 = require("./utils/create-filterable-field-decorator");
const create_filter_args_decorator_1 = require("./utils/create-filter-args-decorator");
const create_filterable_entity_decorator_1 = require("./utils/create-filterable-entity-decorator");
const create_nest_filter_module_1 = require("./utils/create-nest-filter-module");
const filter_type_map_1 = require("./constants/filter-type-map");
const typesToFilterMap = new bidirectional_map_1.BidirectionalMap(filter_type_map_1.filterTypeMap);
const fieldsByTarget = new multimap_1.MultiMap();
const fieldsToTypeIndexedByName = new Map();
const filterTypeMetadataStorage = new filter_type_metadata_storage_1.FilterTypeMetadataStorage({
    typesToFilterMap: typesToFilterMap,
    fieldsByTarget: fieldsByTarget,
    fieldsToTypeIndexedByName: fieldsToTypeIndexedByName,
});
exports.FilterableField = (0, create_filterable_field_decorator_1.createFilterableFieldDecorator)(filterTypeMetadataStorage);
exports.FilterArgs = (0, create_filter_args_decorator_1.createFilterArgsDecorator)(filterTypeMetadataStorage);
exports.FilterableEntity = (0, create_filterable_entity_decorator_1.createFilterableEntityDecorator)(filterTypeMetadataStorage);
exports.getFieldMetadata = (0, create_get_field_metadata_1.createGetFieldMetadata)(filterTypeMetadataStorage);
exports.getFilterOf = (0, create_get_filter_of_1.createGetFilterOf)(filterTypeMetadataStorage);
exports.getIndexedFields = (0, create_get_indexed_fields_1.createGetIndexedFields)(filterTypeMetadataStorage);
exports.NestFilterModule = (0, create_nest_filter_module_1.createNestFilterModule)(filterTypeMetadataStorage);
//# sourceMappingURL=index.js.map