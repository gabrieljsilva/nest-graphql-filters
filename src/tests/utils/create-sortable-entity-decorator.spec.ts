import { ID } from "@nestjs/graphql";
import { LazyMetadataStorage } from "@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage";

import { FilterTypeMetadataStorage } from "../../types/filter-type-metadata-storage";
import { BidirectionalMap } from "../../types/bidirectional-map";
import { MultiMap } from "../../types/multimap";
import { createSortableEntityDecorator } from "../../utils/create-sortable-entity-decorator";
import { createFilterableFieldDecorator } from "../../utils/create-filterable-field-decorator";
import { createFilterableEntityDecorator } from "../../utils/create-filterable-entity-decorator";
import { createGetIndexedFields } from "../../utils/create-get-indexed-fields";
import { FieldMetadata } from "../../types/field-metadata";

describe("create a sortable entity decorator tests", () => {
  let storage: FilterTypeMetadataStorage;
  let FilterableEntity: ReturnType<typeof createFilterableEntityDecorator>;
  let SortableEntity: ReturnType<typeof createSortableEntityDecorator>;
  let FilterableField: ReturnType<typeof createFilterableFieldDecorator>;
  let getIndexedFields: ReturnType<typeof createGetIndexedFields>;

  beforeEach(() => {
    storage = new FilterTypeMetadataStorage({
      typesToFilterMap: new BidirectionalMap(),
      fieldsByTarget: new MultiMap(),
      fieldsToTypeIndexedByName: new Map(),
    });

    SortableEntity = createSortableEntityDecorator(storage);
    FilterableEntity = createFilterableEntityDecorator(storage);
    FilterableField = createFilterableFieldDecorator(storage);
    getIndexedFields = createGetIndexedFields(storage);
  });

  it("should create and apply '_SORT_BY' property in target entity type", () => {
    @SortableEntity()
    @FilterableEntity()
    class Cat {
      @FilterableField(() => ID)
      id: String;
    }

    LazyMetadataStorage.load();
    storage.indexFieldsByName();
    const fieldsMetadata = getIndexedFields(Cat);
    const orderByFieldMetadata = fieldsMetadata.get("_SORT_BY");
    expect(orderByFieldMetadata).toBeInstanceOf(FieldMetadata);
  });
});
