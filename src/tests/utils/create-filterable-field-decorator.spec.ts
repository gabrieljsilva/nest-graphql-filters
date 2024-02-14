import { LazyMetadataStorage } from "@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage";

import { FilterTypeMetadataStorage } from "../../types/filter-type-metadata-storage";
import { BidirectionalMap } from "../../types/bidirectional-map";
import { MultiMap } from "../../types/multimap";
import { createFilterableFieldDecorator } from "../../utils/create-filterable-field-decorator";
import { StringFilter } from "../../filters/string.filter";
import { createGetFieldMetadata } from "../../utils/create-get-field-metadata";
import { FieldMetadata } from "../../types/field-metadata";
import { TypeMetadataStorage } from "@nestjs/graphql";
import { createGetFilterOf } from "../../utils/create-get-filter-of";

jest.mock("@nestjs/graphql", () => {
  const original = jest.requireActual("@nestjs/graphql");
  const mockedDecorator = () => () => null;
  return {
    ...original,
    InputType: jest.fn(mockedDecorator),
    TypeMetadataStorage: {
      ...original.TypeMetadataStorage,
      addClassFieldMetadata: jest.fn(),
    },
  };
});

describe("filterable field decorator tests", () => {
  let storage: FilterTypeMetadataStorage;
  let FilterableField: ReturnType<typeof createFilterableFieldDecorator>;
  let getFieldMetadata: ReturnType<typeof createGetFieldMetadata>;
  let getFilterOf: ReturnType<typeof createGetFilterOf>;
  const addClassFieldMetadata = TypeMetadataStorage.addClassFieldMetadata;

  beforeEach(() => {
    storage = new FilterTypeMetadataStorage({
      typesToFilterMap: new BidirectionalMap([[String, StringFilter]]),
      fieldsByTarget: new MultiMap(),
      fieldsToTypeIndexedByName: new Map(),
    });

    FilterableField = createFilterableFieldDecorator(storage);
    getFieldMetadata = createGetFieldMetadata(storage);
    getFilterOf = createGetFilterOf(storage);
  });

  it("should add class property in filter metadata and add _AND, _OR and NOT logical operators", () => {
    class Cat {
      @FilterableField()
      name: string;
    }

    // Load types from LazyMetadataStorage from '@nestjs/graphql' packages
    LazyMetadataStorage.load();

    const [_AND, _OR, _NOT, name] = Array.from(getFieldMetadata(Cat));

    expect(addClassFieldMetadata).toHaveBeenCalledTimes(1);

    expect(addClassFieldMetadata).toHaveBeenCalledWith({
      name: name.originalName,
      schemaName: name.name,
      options: {
        isArray: false,
        nullable: true,
      },
      target: getFilterOf(Cat),
      typeFn: expect.any(Function),
      description: name.description,
    });

    // the if bellow is just to infer jest.fn type in addClassFieldMetadata
    if (jest.isMockFunction(addClassFieldMetadata)) {
      const [call] = addClassFieldMetadata.mock.calls;
      const [params] = call;

      expect(params.typeFn()).toBe(getFilterOf(String));
    }

    expect(_AND).toBeInstanceOf(FieldMetadata);
    expect(_OR).toBeInstanceOf(FieldMetadata);
    expect(_NOT).toBeInstanceOf(FieldMetadata);
    expect(name).toBeInstanceOf(FieldMetadata);

    // _AND properties
    expect(_AND).toHaveProperty("name", "_AND");
    expect(_AND).toHaveProperty("originalName", "_AND");
    expect(_AND).toHaveProperty("isPrimitiveType", false);
    expect(_AND).toHaveProperty("nullable", true);
    expect(_AND).toHaveProperty("isArray", true);
    expect(_AND).toHaveProperty("type", Cat);

    // _OR properties
    expect(_OR).toHaveProperty("name", "_OR");
    expect(_OR).toHaveProperty("originalName", "_OR");
    expect(_OR).toHaveProperty("isPrimitiveType", false);
    expect(_OR).toHaveProperty("nullable", true);
    expect(_OR).toHaveProperty("isArray", true);
    expect(_OR).toHaveProperty("type", Cat);

    // _NOT properties
    expect(_NOT).toHaveProperty("name", "_NOT");
    expect(_NOT).toHaveProperty("originalName", "_NOT");
    expect(_NOT).toHaveProperty("isPrimitiveType", false);
    expect(_NOT).toHaveProperty("nullable", true);
    expect(_NOT).toHaveProperty("isArray", false);
    expect(_NOT).toHaveProperty("type", Cat);

    // name properties
    expect(name).toHaveProperty("name", "name");
    expect(name).toHaveProperty("originalName", "name");
    expect(name).toHaveProperty("isPrimitiveType", true);
    expect(name).toHaveProperty("nullable", false);
    expect(name).toHaveProperty("isArray", false);
    expect(name).toHaveProperty("type", String);
  });
});
