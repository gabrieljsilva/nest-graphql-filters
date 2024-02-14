import { Field, TypeMetadataStorage } from "@nestjs/graphql";
import { LazyMetadataStorage } from "@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage";

import { FilterTypeMetadataStorage } from "../../types/filter-type-metadata-storage";
import { BidirectionalMap } from "../../types/bidirectional-map";
import { MultiMap } from "../../types/multimap";
import { FieldMetadata } from "../../types/field-metadata";
import { createFilterableFieldDecorator } from "../../utils/create-filterable-field-decorator";
import { createGetFilterOf } from "../../utils/create-get-filter-of";
import { StringFilter } from "../../filters/string.filter";

jest.mock("@nestjs/graphql", () => {
  const original = jest.requireActual("@nestjs/graphql");
  return {
    ...original,
    Field: jest.fn(() => () => null),
    TypeMetadataStorage: {
      ...original.TypeMetadataStorage,
      addClassFieldMetadata: jest.fn(),
    },
  };
});

describe("filter type metadata storage tests", () => {
  let storage: FilterTypeMetadataStorage;
  let FilterableField: ReturnType<typeof createFilterableFieldDecorator>;
  let getFilterOf: ReturnType<typeof createGetFilterOf>;

  beforeEach(() => {
    storage = new FilterTypeMetadataStorage({
      typesToFilterMap: new BidirectionalMap([[String, StringFilter]]),
      fieldsByTarget: new MultiMap(),
      fieldsToTypeIndexedByName: new Map(),
    });
    FilterableField = createFilterableFieldDecorator(storage);
    getFilterOf = createGetFilterOf(storage);

    const mockedInputTypeDecoratorImplementation = () => () => null;

    if (jest.isMockFunction(Field)) {
      Field.mockReset();
      Field.mockImplementation(mockedInputTypeDecoratorImplementation);
    }
  });

  it("should create a FilterType and apply FieldDecorators", () => {
    class Cat {}

    storage.getOrCreateFilterType(Cat);

    const catFilter = getFilterOf(Cat);

    if (jest.isMockFunction(Field)) {
      expect(Field).toBeCalledTimes(3); // 1 call for each logical operator === _AND & _OR & _NOT

      const [_AND_CALL, _OR_CALL, _NOT_CALL] = Field.mock.calls;

      // Test _AND Operation params
      const [_AND_GET_FILTER_TYPE, _AND_OPTIONS] = _AND_CALL;
      const [_AND_FILTER_TYPE] = _AND_GET_FILTER_TYPE();
      expect(_AND_FILTER_TYPE).toBe(catFilter);
      expect(_AND_OPTIONS).toEqual({ nullable: true });

      // Test _OR Operation params
      const [_OR_GET_FILTER_TYPE, _OR_OPTIONS] = _OR_CALL;
      const [_OR_FILTER_TYPE] = _OR_GET_FILTER_TYPE();
      expect(_OR_FILTER_TYPE).toBe(catFilter);
      expect(_OR_OPTIONS).toEqual({ nullable: true });

      // Test _NOT Operation params
      const [_NOT_GET_FILTER_TYPE, _NOT_OPTIONS] = _NOT_CALL;
      const _NOT_FILTER_TYPE = _NOT_GET_FILTER_TYPE();
      expect(_NOT_FILTER_TYPE).toBe(catFilter);
      expect(_NOT_OPTIONS).toEqual({ nullable: true });
    }
  });

  it("should create a FilterType From a given class if storage is empty", () => {
    class Cat {}
    expect(storage.typesToFilterMap.getValueByKey(Cat)).toBe(undefined);
    const catFilter = storage.getOrCreateFilterType(Cat);
    expect(catFilter).toBeInstanceOf(Function);
    expect(catFilter.name).toBe("CatFilter");
  });

  it("should create a FilterType From a given class and add it to storage", () => {
    class Cat {}
    storage.getOrCreateFilterType(Cat);
    const catFilter = storage.getOrCreateFilterType(Cat);
    expect(catFilter).toBeInstanceOf(Function);
  });

  it("should create filter type and add field to metadata", () => {
    class Cat {}

    const fieldMetadata = new FieldMetadata({
      name: "name",
      originalName: "name",
      type: String,
      description: "A pretty orange kitten",
      isArray: false,
      nullable: false,
    });

    storage.createFilterTypeFromField(Cat, fieldMetadata);

    const addClassFieldMetadata = TypeMetadataStorage.addClassFieldMetadata;

    if (jest.isMockFunction(addClassFieldMetadata)) {
      expect(addClassFieldMetadata).toBeCalledWith({
        name: fieldMetadata.name,
        description: fieldMetadata.description,
        options: {
          isArray: false,
          nullable: true,
        },
        schemaName: fieldMetadata.name,
        target: Cat,
        typeFn: expect.any(Function),
      });

      const [calls] = addClassFieldMetadata.mock.calls;
      const [params] = calls;

      expect(params.typeFn()).toBe(StringFilter);
    }
  });

  it("should index all fields by name", () => {
    class Cat {
      @FilterableField()
      name: string;
    }

    LazyMetadataStorage.load();

    storage.indexFieldsByName();

    expect(storage.fieldsToTypeIndexedByName).toBeInstanceOf(Map);
    expect(storage.fieldsToTypeIndexedByName.size).toBe(1);

    const catFields = storage.fieldsToTypeIndexedByName.get(Cat);

    expect(catFields.size).toBe(4);
    expect(catFields.get("name")).toBeInstanceOf(FieldMetadata);
  });
});
