import { MultiMap } from '../../types/multimap';
import { Type } from '@nestjs/common';

describe('Multimap tests', () => {
  const multimap = new MultiMap<Type, Type>();

  // Use Object | Class | Function to keep memory ref
  class Key1 {}
  class Key2 {}
  class Value1 {}
  class Value2 {}
  class Value3 {}
  class Value4 {}

  multimap.add(Key1, Value1);
  multimap.add(Key1, Value2);
  multimap.add(Key2, Value3);
  multimap.add(Key2, Value4);

  it('Should get all values key key', () => {
    const values = multimap.getValuesByKey(Key1);

    expect(values.size).toBe(2);
    expect(values.has(Value1)).toBeTruthy();
    expect(values.has(Value2)).toBeTruthy();

    expect(values.has(Value3)).toBeFalsy();
    expect(values.has(Value4)).toBeFalsy();
  });

  it('Should not add value if already exists', () => {
    const values = multimap.getValuesByKey(Key1);
    multimap.add(Key1, Value1);
    expect(values.size).toBe(2);
  });

  it('Should get all keys', () => {
    const keys = new Set(Array.from(multimap.keys()));
    expect(keys.size).toBe(2);
    expect(keys.has(Key1)).toBeTruthy();
    expect(keys.has(Key2)).toBeTruthy();
  });

  it('Should get all values', () => {
    const values = new Set(Array.from(multimap.values()));
    expect(values.size).toBe(4);
    expect(values.has(Value1)).toBeTruthy();
    expect(values.has(Value2)).toBeTruthy();
    expect(values.has(Value3)).toBeTruthy();
    expect(values.has(Value4)).toBeTruthy();
  });

  it('Should get all entries', () => {
    const entries = multimap.entries();
    for (const [key, values] of entries) {
      for (const value of values) {
        const valueByKey = multimap.getValuesByKey(key);
        expect(valueByKey.has(value)).toBe(true);
      }
    }
  });

  it('Should delete key when delete last value', () => {
    const multimap = new MultiMap();
    multimap.add('key', 'value');
    multimap.deleteByValue('value');
    const keys = Array.from(multimap.keys());
    expect(keys.length).toBe(0);
  });
});
