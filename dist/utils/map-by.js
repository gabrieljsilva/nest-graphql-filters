"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapBy = void 0;
function mapBy(iterable, property) {
    const map = new Map();
    for (const obj of iterable) {
        map.set(obj[property], obj);
    }
    return map;
}
exports.mapBy = mapBy;
//# sourceMappingURL=map-by.js.map