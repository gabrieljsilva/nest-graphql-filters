import { BidirectionalMap } from '../../types/bidirectional-map';

describe('Bidirectional Map tests', () => {
  const bidirectionalMap = new BidirectionalMap();
  bidirectionalMap.set('key1', 'value1');
  bidirectionalMap.set('key2', 'value2');
  bidirectionalMap.set('key3', 'value3');

  it('should get values by key', () => {
    expect(bidirectionalMap.getValueByKey('key1')).toBe('value1');
    expect(bidirectionalMap.getValueByKey('key2')).toBe('value2');
    expect(bidirectionalMap.getValueByKey('key3')).toBe('value3');
    expect(Array.from(bidirectionalMap.values()).length).toBe(3);
  });

  it('should get key by value', () => {
    expect(bidirectionalMap.getKeyByValue('value1')).toBe('key1');
    expect(bidirectionalMap.getKeyByValue('value2')).toBe('key2');
    expect(bidirectionalMap.getKeyByValue('value3')).toBe('key3');
    expect(Array.from(bidirectionalMap.keys()).length).toBe(3);
  });

  it('should get values bidirectionally', () => {
    expect(bidirectionalMap.get('value1')).toBe('key1');
    expect(bidirectionalMap.get('value2')).toBe('key2');
    expect(bidirectionalMap.get('value3')).toBe('key3');

    expect(bidirectionalMap.get('key1')).toBe('value1');
    expect(bidirectionalMap.get('key2')).toBe('value2');
    expect(bidirectionalMap.get('key3')).toBe('value3');
  });

  it('should return all bidirectional map entries', () => {
    const entries = bidirectionalMap.entries();

    for (const [key, value] of entries) {
      expect(bidirectionalMap.getValueByKey(key)).toBe(value);
    }
  });

  it('should instantiate object with initial values', () => {
    const bidirectionalMap = new BidirectionalMap([['key1', 'value1']]);
    expect(bidirectionalMap.get('key1')).toBe('value1');
  });
});
