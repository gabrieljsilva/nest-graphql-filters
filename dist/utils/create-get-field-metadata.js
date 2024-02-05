"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetFieldMetadata = void 0;
function createGetFieldMetadata(storage) {
    return (target) => storage.fieldsByTarget.getValuesByKey(target);
}
exports.createGetFieldMetadata = createGetFieldMetadata;
//# sourceMappingURL=create-get-field-metadata.js.map