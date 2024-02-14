import { Field, GqlTypeReference, TypeMetadataStorage } from "@nestjs/graphql";
import { Type } from "@nestjs/common";

import { BidirectionalMap } from "./bidirectional-map";
import { MultiMap } from "./multimap";
import { FieldMetadata } from "./field-metadata";
import { LOGICAL_OPERATORS } from "../enums/logical-operations";
import { mapBy } from "../utils/map-by";

interface IFilterTypeMetadataStorage {
  typesToFilterMap: BidirectionalMap<GqlTypeReference, Type<unknown>>;
  fieldsByTarget: MultiMap<GqlTypeReference, FieldMetadata>;
  fieldsToTypeIndexedByName: Map<GqlTypeReference, Map<string, FieldMetadata>>;
}

export class FilterTypeMetadataStorage implements IFilterTypeMetadataStorage {
  typesToFilterMap: BidirectionalMap<GqlTypeReference, Type<unknown>>;
  fieldsByTarget: MultiMap<GqlTypeReference, FieldMetadata>;
  fieldsToTypeIndexedByName: Map<GqlTypeReference, Map<string, FieldMetadata>>;

  constructor(params: IFilterTypeMetadataStorage) {
    this.typesToFilterMap = params.typesToFilterMap;
    this.fieldsByTarget = params.fieldsByTarget;
    this.fieldsToTypeIndexedByName = params.fieldsToTypeIndexedByName;
  }

  public addFieldMetadata(target: GqlTypeReference, field: FieldMetadata) {
    this.fieldsByTarget.add(target, field);
  }

  public createTypeFromField(target: Type, field: FieldMetadata) {
    TypeMetadataStorage.addClassFieldMetadata({
      name: field.originalName,
      schemaName: field.name,
      options: {
        isArray: false,
        nullable: true,
      },
      target: target,
      typeFn: /* istanbul ignore next */ () => field.type,
      description: field.description,
    });
  }

  public createFilterTypeFromField(
    target: Type<unknown>,
    field: FieldMetadata,
  ) {
    const fieldFilterType = this.typesToFilterMap.getValueByKey(field.type);

    TypeMetadataStorage.addClassFieldMetadata({
      name: field.originalName,
      schemaName: field.name,
      options: {
        isArray: false,
        nullable: true,
      },
      target: target,
      typeFn: () => fieldFilterType,
      description: field.description,
    });
  }

  public indexFieldsByName() {
    const typeFieldsMap = this.fieldsByTarget.entries();
    for (const [type, fields] of typeFieldsMap) {
      const mappedFields = mapBy(fields, "name");
      this.fieldsToTypeIndexedByName.set(type, mappedFields);
    }
  }

  public getOrCreateFilterType(target: Type<unknown>) {
    const filterType = this.typesToFilterMap.getValueByKey(target);

    if (filterType) {
      return filterType;
    }

    class FilterInputType {
      @Field(() => [FilterInputType], { nullable: true })
      _AND?: FilterInputType;

      @Field(() => [FilterInputType], { nullable: true })
      _OR?: FilterInputType;

      @Field(() => FilterInputType, { nullable: true })
      _NOT?: FilterInputType;
    }

    Object.defineProperty(FilterInputType, "name", {
      value: `${target.name}Filter`,
    });

    this.typesToFilterMap.set(target, FilterInputType);

    this.fieldsByTarget.add(
      target,
      new FieldMetadata({
        name: LOGICAL_OPERATORS._AND,
        originalName: LOGICAL_OPERATORS._AND,
        type: target,
        isArray: true,
        nullable: true,
        description: `and operator for ${target.name} filter`,
      }),
    );

    this.fieldsByTarget.add(
      target,
      new FieldMetadata({
        name: LOGICAL_OPERATORS._OR,
        originalName: LOGICAL_OPERATORS._OR,
        type: target,
        isArray: true,
        nullable: true,
        description: `or operator for ${target.name} filter`,
      }),
    );

    this.fieldsByTarget.add(
      target,
      new FieldMetadata({
        name: LOGICAL_OPERATORS._NOT,
        originalName: LOGICAL_OPERATORS._NOT,
        type: target,
        isArray: false,
        nullable: true,
        description: `not operator for ${target.name} filter`,
      }),
    );

    return FilterInputType;
  }
}
