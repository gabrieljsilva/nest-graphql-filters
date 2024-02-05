import {
  getFieldMetadata,
  getIndexedFields,
  getFilterOf,
  FilterableEntity,
  FilterableField,
  NestFilterModule,
  COMPARISON_OPERATOR,
  LOGICAL_OPERATORS,
} from '../index';

describe('index file tests', () => {
  it('Should not have compiling typescript errors', () => {
    expect(getFieldMetadata).toBeInstanceOf(Function);
    expect(getIndexedFields).toBeInstanceOf(Function);
    expect(getFilterOf).toBeInstanceOf(Function);

    expect(getIndexedFields).toBeInstanceOf(Function);
    expect(FilterableEntity).toBeInstanceOf(Function);
    expect(FilterableField).toBeInstanceOf(Function);

    expect(NestFilterModule).toBeInstanceOf(Function);

    expect(COMPARISON_OPERATOR).toBeInstanceOf(Object);
    expect(LOGICAL_OPERATORS).toBeInstanceOf(Object);
  });
});
