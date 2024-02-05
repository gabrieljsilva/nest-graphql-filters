import { Int } from '@nestjs/graphql';
import { LazyMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage';

import { FilterTypeMetadataStorage } from '../../types/filter-type-metadata-storage';
import { createFilterableFieldDecorator } from '../../utils/create-filterable-field-decorator';
import { BidirectionalMap } from '../../types/bidirectional-map';
import { StringFilter } from '../../filters/string.filter';
import { MultiMap } from '../../types/multimap';
import { createGetFieldMetadata } from '../../utils/create-get-field-metadata';
import { FieldMetadata } from '../../types/field-metadata';

describe('create get field metadata tests', () => {
  let storage: FilterTypeMetadataStorage;
  let FilterableField: ReturnType<typeof createFilterableFieldDecorator>;
  let getFieldMetadata: ReturnType<typeof createGetFieldMetadata>;

  beforeEach(() => {
    storage = new FilterTypeMetadataStorage({
      typesToFilterMap: new BidirectionalMap([[String, StringFilter]]),
      fieldsByTarget: new MultiMap(),
      fieldsToTypeIndexedByName: new Map(),
    });
    FilterableField = createFilterableFieldDecorator(storage);
    getFieldMetadata = createGetFieldMetadata(storage);
  });

  it('Should get all field metadata from a filterable entity', () => {
    class Cat {
      @FilterableField()
      name: string;

      @FilterableField(() => Int)
      age: number;
    }

    LazyMetadataStorage.load();

    const fieldMetadata = getFieldMetadata(Cat);

    expect(fieldMetadata.size).toBe(5);

    const [_AND, _OR, _NOT, name, age] = Array.from(getFieldMetadata(Cat));

    expect(_AND).toBeInstanceOf(FieldMetadata);
    expect(_OR).toBeInstanceOf(FieldMetadata);
    expect(_NOT).toBeInstanceOf(FieldMetadata);
    expect(name).toBeInstanceOf(FieldMetadata);
    expect(age).toBeInstanceOf(FieldMetadata);
  });
});
