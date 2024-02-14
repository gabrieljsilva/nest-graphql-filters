import {
  getFieldMetadata,
  getIndexedFields,
  getFilterOf,
  FilterableEntity,
  FilterableField,
  SortableEntity,
  FilterArgs,
  NestFilterModule,
  COMPARISON_OPERATOR,
  LOGICAL_OPERATORS,
  FieldMetadata,
  FilterOptions,
} from "../index";

describe("index file tests", () => {
  it("should not have compiling typescript errors", () => {
    expect(getFieldMetadata).toBeInstanceOf(Function);
    expect(getIndexedFields).toBeInstanceOf(Function);
    expect(getFilterOf).toBeInstanceOf(Function);

    expect(getIndexedFields).toBeInstanceOf(Function);
    expect(FilterableEntity).toBeInstanceOf(Function);
    expect(SortableEntity).toBeInstanceOf(Function);
    expect(FilterArgs).toBeInstanceOf(Function);
    expect(FilterableField).toBeInstanceOf(Function);

    expect(NestFilterModule).toBeInstanceOf(Function);

    expect(COMPARISON_OPERATOR).toBeInstanceOf(Object);
    expect(LOGICAL_OPERATORS).toBeInstanceOf(Object);
    expect(FieldMetadata).toBeInstanceOf(Function);
    expect(FilterOptions).toBeInstanceOf(Function);
  });
});
