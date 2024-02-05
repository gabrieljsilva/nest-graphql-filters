export declare class MultiMap<Key, Value> {
    protected readonly from: Map<Key, Set<Value>>;
    protected readonly to: Map<Value, Key>;
    constructor();
    add(key: Key, value: Value): void;
    deleteByValue(value: Value): void;
    getValuesByKey(key: Key): Set<Value>;
    keys(): IterableIterator<Key>;
    values(): IterableIterator<Value>;
    entries(): IterableIterator<[Key, Set<Value>]>;
}
