"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetIndexedFields = void 0;
function createGetIndexedFields(storage) {
    return (type) => storage.fieldsToTypeIndexedByName.get(type);
}
exports.createGetIndexedFields = createGetIndexedFields;
//# sourceMappingURL=create-get-indexed-fields.js.map