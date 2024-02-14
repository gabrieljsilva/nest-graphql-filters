import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { LazyMetadataStorage } from "@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage";

import { FilterTypeMetadataStorage } from "../types/filter-type-metadata-storage";
import { FieldMetadata } from "../types/field-metadata";
import { createEnumOfEntityFields } from "./create-enum-of-entity-fields";
import { SORT_DIRECTION } from "../enums/sort-direction";

export const createSortableEntityDecorator = (
  storage: FilterTypeMetadataStorage,
) => {
  registerEnumType(SORT_DIRECTION, { name: "SortDirection" });

  return function SortableEntity() {
    return (target: NonNullable<any>) => {
      const filterInputType = storage.typesToFilterMap.getValueByKey(target);

      const createSortableFieldFN = () => {
        const fields = storage.fieldsByTarget.getValuesByKey(target);

        const enumFields = createEnumOfEntityFields(fields);
        registerEnumType(enumFields, { name: `${target.name}SortableFields` });

        @InputType(`${target.name}SortBy`)
        class OrderByField {
          @Field(/* istanbul ignore next */ () => SORT_DIRECTION)
          direction: SORT_DIRECTION;

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
