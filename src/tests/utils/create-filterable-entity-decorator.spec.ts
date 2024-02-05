import { InputType } from '@nestjs/graphql';
import { FilterTypeMetadataStorage } from '../../types/filter-type-metadata-storage';
import { BidirectionalMap } from '../../types/bidirectional-map';
import { MultiMap } from '../../types/multimap';
import { createFilterableEntityDecorator } from '../../utils/create-filterable-entity-decorator';
import { createFilterableFieldDecorator } from '../../utils/create-filterable-field-decorator';

jest.mock('@nestjs/graphql', () => {
  const original = jest.requireActual('@nestjs/graphql');
  const MockedInputTypeDecoratorImplementation = () => () => null;

  return {
    ...original,
    InputType: jest.fn(MockedInputTypeDecoratorImplementation),
  };
});

describe('create filterable entity decorator tests', () => {
  const storage = new FilterTypeMetadataStorage({
    typesToFilterMap: new BidirectionalMap(),
    fieldsByTarget: new MultiMap(),
    fieldsToTypeIndexedByName: new Map(),
  });

  const FilterableField = createFilterableFieldDecorator(storage);
  const FilterableEntity = createFilterableEntityDecorator(storage);

  it('Should mark a class as InputType with default filter name', () => {
    @FilterableEntity()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class Cat {
      @FilterableField(() => String)
      name: string;
    }

    expect(InputType).toBeCalledWith('CatFilter');
  });

  it('Should mark a class as InputType with custom filter name', () => {
    const customFilterName = 'kittenFilter';

    @FilterableEntity(customFilterName)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class Cat {
      @FilterableField()
      name: string;
    }

    expect(InputType).toBeCalledWith(customFilterName);
  });
});
