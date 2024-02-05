"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiMap = void 0;
class MultiMap {
    constructor() {
        this.from = new Map();
        this.to = new Map();
    }
    add(key, value) {
        this.deleteByValue(value);
        const set = this.from.get(key) || new Set();
        if (set.size === 0) {
            this.from.set(key, set);
        }
        set.add(value);
        this.to.set(value, key);
    }
    deleteByValue(value) {
        const key = this.to.get(value);
        if (key) {
            const set = this.from.get(key);
            set?.delete(value);
            const isSetEmpty = set?.size === 0;
            if (isSetEmpty) {
                this.from.delete(key);
            }
        }
        this.to.delete(value);
    }
    getValuesByKey(key) {
        return this.from.get(key);
    }
    keys() {
        return this.from.keys();
    }
    values() {
        return this.to.keys();
    }
    entries() {
        return this.from.entries();
    }
}
exports.MultiMap = MultiMap;
//# sourceMappingURL=multimap.js.map