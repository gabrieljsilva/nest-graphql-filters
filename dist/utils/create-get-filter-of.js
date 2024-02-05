"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetFilterOf = void 0;
function createGetFilterOf(storage) {
    return (classRef) => storage.typesToFilterMap.getValueByKey(classRef);
}
exports.createGetFilterOf = createGetFilterOf;
//# sourceMappingURL=create-get-filter-of.js.map