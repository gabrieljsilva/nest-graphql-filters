import { FilterTypeMetadataStorage } from "../../types/filter-type-metadata-storage";
import { BidirectionalMap } from "../../types/bidirectional-map";
import { MultiMap } from "../../types/multimap";
import { createNestFilterModule } from "../../utils/create-nest-filter-module";
import { FilterOptions } from "../../types/filter-options";

describe("create nest filter module function tests", () => {
  let storage: FilterTypeMetadataStorage;

  beforeEach(() => {
    storage = new FilterTypeMetadataStorage({
      typesToFilterMap: new BidirectionalMap(),
      fieldsByTarget: new MultiMap(),
      fieldsToTypeIndexedByName: new Map(),
    });

    storage.indexFieldsByName = jest.fn();
  });

  it("should create a nest filter module with given storage", () => {
    const NestFilterModule = createNestFilterModule(storage);
    const instance = new NestFilterModule();
    instance.onModuleInit();

    expect(NestFilterModule).toBeInstanceOf(Function);
    expect(NestFilterModule.register).toBeInstanceOf(Function);
    expect(storage.indexFieldsByName).toBeCalledTimes(1);
  });

  it("should create a dynamic instance of nest filter module by register method", () => {
    const NestFilterModule = createNestFilterModule(storage);
    const instance = NestFilterModule.register("pg");

    expect(instance).toHaveProperty("global", true);
    expect(instance).toHaveProperty("module", NestFilterModule);
    expect(instance).toHaveProperty("imports", []);
    expect(instance).toHaveProperty("exports");
    expect(instance).toHaveProperty("providers");
  });
});
