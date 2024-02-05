"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldMetadata = void 0;
const primitive_types_1 = require("../constants/primitive-types");
class FieldMetadata {
    constructor(metadata) {
        this.name = metadata.name;
        this.type = metadata.type;
        this.description = metadata.description;
        this.originalName = metadata.originalName;
        this.isArray = metadata.isArray;
        this.nullable = metadata.nullable;
        this.isPrimitiveType = primitive_types_1.primitiveTypes.has(metadata.type);
    }
}
exports.FieldMetadata = FieldMetadata;
//# sourceMappingURL=field-metadata.js.map