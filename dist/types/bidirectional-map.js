"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidirectionalMap = void 0;
class BidirectionalMap {
    constructor(entries) {
        this.from = new Map();
        this.to = new Map();
        if (entries) {
            for (const [key, value] of entries) {
                this.set(key, value);
            }
        }
    }
    set(key, value) {
        this.from.set(key, value);
        this.to.set(value, key);
    }
    getValueByKey(key) {
        return this.from.get(key);
    }
    getKeyByValue(value) {
        return this.to.get(value);
    }
    get(index) {
        const value = this.getValueByKey(index);
        if (value) {
            return value;
        }
        return this.getKeyByValue(index);
    }
    entries() {
        return this.from.entries();
    }
    keys() {
        return this.from.keys();
    }
    values() {
        return this.to.keys();
    }
}
exports.BidirectionalMap = BidirectionalMap;
//# sourceMappingURL=bidirectional-map.js.map