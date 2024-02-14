import { FieldMetadata } from "../types/field-metadata";

export function createEnumOfEntityFields(
  fields: Iterable<FieldMetadata>,
): Record<string, string> {
  const enumFields = {};

  for (const field of fields) {
    if (field.isPrimitiveType) {
      enumFields[field.name] = field.name;
    }
  }

  return enumFields;
}
