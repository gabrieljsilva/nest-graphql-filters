import { Args } from '@nestjs/graphql';
import { PipeTransform } from '@nestjs/common';

import { FilterTypeMetadataStorage } from '../../types/filter-type-metadata-storage';
import { createGetFilterOf } from '../../utils/create-get-filter-of';
import { BidirectionalMap } from '../../types/bidirectional-map';
import { MultiMap } from '../../types/multimap';
import { createFilterArgsDecorator } from '../../utils/create-filter-args-decorator';
import { createFilterableFieldDecorator } from '../../utils/create-filterable-field-decorator';
import { FilterOf } from '../../types/filter-of.type';

jest.mock('@nestjs/graphql', () => {
  const original = jest.requireActual('@nestjs/graphql');

  return {
    ...original,
    Args: jest.fn(),
  };
});

describe('create filter args decorator tests', () => {
  let storage: FilterTypeMetadataStorage;
  let FilterableField: ReturnType<typeof createFilterableFieldDecorator>;
  let getFilterOf: ReturnType<typeof createGetFilterOf>;
  let FilterArgs: ReturnType<typeof createFilterArgsDecorator>;

  beforeEach(() => {
    storage = new FilterTypeMetadataStorage({
      typesToFilterMap: new BidirectionalMap(),
      fieldsByTarget: new MultiMap(),
      fieldsToTypeIndexedByName: new Map(),
    });
    FilterableField = createFilterableFieldDecorator(storage);
    getFilterOf = createGetFilterOf(storage);
    FilterArgs = createFilterArgsDecorator(storage);

    const mockedInputTypeDecoratorImplementation = () => () => null;

    if (jest.isMockFunction(Args)) {
      Args.mockReset();
      Args.mockImplementation(mockedInputTypeDecoratorImplementation);
    }
  });

  const options = { name: 'CatFilter', description: 'MyCatFilterQuery' };

  class TestPipe implements PipeTransform {
    transform(value: any) {
      return value;
    }
  }

  it('Should call "args" decorator with correct params and default options', () => {
    class Cat {
      @FilterableField()
      name: string;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class CatResolver {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      findCats(@FilterArgs(Cat) catFilters: FilterOf<Cat>) {}
    }

    if (jest.isMockFunction(Args)) {
      expect(Args).toBeCalledTimes(1);
      expect(Args).toBeCalledWith('filters', {
        type: expect.any(Function),
        nullable: true,
        name: 'filters',
      });

      const catFilter = getFilterOf(Cat);

      const [call] = Args.mock.calls;
      const [, options] = call;

      const type = options.type();
      expect(type).toBe(catFilter);
    }
  });

  it('Should call "args" decorator with correct params and custom options', () => {
    class Cat {
      @FilterableField()
      name: string;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class CatResolver {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      findCats(@FilterArgs(Cat, options) catFilters: FilterOf<Cat>) {}
    }

    if (jest.isMockFunction(Args)) {
      expect(Args).toBeCalledTimes(1);
      expect(Args).toBeCalledWith(options.name, {
        type: expect.any(Function),
        nullable: true,
        name: options.name,
        description: options.description,
      });

      const catFilter = getFilterOf(Cat);

      const [call] = Args.mock.calls;
      const [, calledOptions] = call;

      const type = calledOptions.type();
      expect(type).toBe(catFilter);
    }
  });

  it('Should call "args" decorator with correct params and custom options and pipes', () => {
    class Cat {
      @FilterableField()
      name: string;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class CatResolver {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      findCats(@FilterArgs(Cat, options, TestPipe) catFilters: FilterOf<Cat>) {}
    }

    if (jest.isMockFunction(Args)) {
      expect(Args).toBeCalledTimes(1);
      expect(Args).toBeCalledWith(
        options.name,
        {
          type: expect.any(Function),
          nullable: true,
          name: options.name,
          description: options.description,
        },
        TestPipe,
      );
    }
  });
});
