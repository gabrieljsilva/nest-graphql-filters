import { createEnumOfEntityFields } from "../../utils/create-enum-of-entity-fields";
import { FieldMetadata } from "../../types/field-metadata";

describe("create enum of entity fields tests", () => {
  it("should create enum from entity fields", () => {
    const fields = [
      new FieldMetadata({
        name: "field1",
        originalName: "field1",
        type: String,
        nullable: false,
        isArray: false,
      }),
      new FieldMetadata({
        name: "field2",
        originalName: "field2",
        type: String,
        nullable: false,
        isArray: false,
      }),
    ];

    const enumFields = createEnumOfEntityFields(fields);

    expect(enumFields).toEqual({ field1: "field1", field2: "field2" });
  });
});
