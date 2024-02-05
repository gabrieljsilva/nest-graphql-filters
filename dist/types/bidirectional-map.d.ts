export declare class BidirectionalMap<Key, Value> {
    private readonly from;
    private readonly to;
    constructor(entries?: Array<[Key, Value]>);
    set(key: Key, value: Value): void;
    getValueByKey(key: Key): Value;
    getKeyByValue(value: Value): Key;
    get(index: Key | Value): Key | Value | undefined;
    entries(): IterableIterator<[Key, Value]>;
    keys(): IterableIterator<Key>;
    values(): IterableIterator<Value>;
}
