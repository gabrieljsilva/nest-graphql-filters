"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnumOfEntityFields = void 0;
function createEnumOfEntityFields(fields) {
    const enumFields = {};
    for (const field of fields) {
        if (field.isPrimitiveType) {
            enumFields[field.name] = field.name;
        }
    }
    return enumFields;
}
exports.createEnumOfEntityFields = createEnumOfEntityFields;
//# sourceMappingURL=create-enum-of-entity-fields.js.map