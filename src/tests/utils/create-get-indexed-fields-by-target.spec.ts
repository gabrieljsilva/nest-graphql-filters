import { LazyMetadataStorage } from "@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage";

import { FilterTypeMetadataStorage } from "../../types/filter-type-metadata-storage";
import { createFilterableFieldDecorator } from "../../utils/create-filterable-field-decorator";
import { BidirectionalMap } from "../../types/bidirectional-map";
import { StringFilter } from "../../filters/string.filter";
import { MultiMap } from "../../types/multimap";
import { FieldMetadata } from "../../types/field-metadata";
import { createGetIndexedFields } from "../../utils/create-get-indexed-fields";

describe("create get indexed fields by target tests", () => {
  let storage: FilterTypeMetadataStorage;
  let FilterableField: ReturnType<typeof createFilterableFieldDecorator>;
  let getIndexedFieldsByTarget: ReturnType<typeof createGetIndexedFields>;

  beforeEach(() => {
    storage = new FilterTypeMetadataStorage({
      typesToFilterMap: new BidirectionalMap([[String, StringFilter]]),
      fieldsByTarget: new MultiMap(),
      fieldsToTypeIndexedByName: new Map(),
    });
    FilterableField = createFilterableFieldDecorator(storage);
    getIndexedFieldsByTarget = createGetIndexedFields(storage);
  });

  it("Should get all field metadata from a filterable entity", () => {
    class Cat {
      @FilterableField()
      name: string;
    }

    LazyMetadataStorage.load();

    storage.indexFieldsByName();

    const fieldMetadata = getIndexedFieldsByTarget(Cat);

    expect(fieldMetadata).toBeInstanceOf(Map);
    expect(fieldMetadata.size).toBe(4);

    expect(fieldMetadata.get("_AND")).toBeInstanceOf(FieldMetadata);
    expect(fieldMetadata.get("_OR")).toBeInstanceOf(FieldMetadata);
    expect(fieldMetadata.get("_NOT")).toBeInstanceOf(FieldMetadata);
    expect(fieldMetadata.get("name")).toBeInstanceOf(FieldMetadata);
  });
});
