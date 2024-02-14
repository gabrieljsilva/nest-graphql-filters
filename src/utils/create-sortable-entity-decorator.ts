import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { LazyMetadataStorage } from "@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage";

import { FilterTypeMetadataStorage } from "../types/filter-type-metadata-storage";
import { FieldMetadata } from "../types/field-metadata";
import { createEnumOfEntityFields } from "./create-enum-of-entity-fields";

export const createSortableEntityDecorator = (
  storage: FilterTypeMetadataStorage,
) => {
  enum SortDirection {
    "desc" = "desc",
    "asc" = "asc",
  }

  registerEnumType(SortDirection, { name: "SortDirection" });

  return function SortableEntity() {
    return (target: NonNullable<any>) => {
      const filterInputType = storage.typesToFilterMap.getValueByKey(target);

      const createSortableFieldFN = () => {
        const fields = storage.fieldsByTarget.getValuesByKey(target);

        const enumFields = createEnumOfEntityFields(fields);
        registerEnumType(enumFields, { name: `${target.name}Fields` });

        @InputType(`${target.name}SortBy`)
        class OrderByField {
          @Field(/* istanbul ignore next */ () => SortDirection)
          direction: SortDirection;

          @Field(/* istanbul ignore next */ () => [enumFields])
          fields: Array<ReturnType<typeof createEnumOfEntityFields>>;
        }

        const fieldMetadata = new FieldMetadata({
          name: "_SORT_BY",
          originalName: "_SORT_BY",
          nullable: true,
          isArray: false,
          type: OrderByField,
        });

        storage.addFieldMetadata(target, fieldMetadata);
        storage.createTypeFromField(filterInputType, fieldMetadata);
      };

      // Execute the function in the LazyMetadataStorage context to get all dependencies loaded;
      LazyMetadataStorage.store(filterInputType, createSortableFieldFN, {
        isField: true,
      });
    };
  };
};
