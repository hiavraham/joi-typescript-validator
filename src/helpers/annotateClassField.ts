import { Class, FieldDescription } from "../types";
import { annotateClass } from "./annotateClass";
import { getClassOwnMetadata } from "./getClassOwnMetadata";
import { getFieldMetadata } from "./getFieldMetadata";

/**
 * Annotate class, using Reflect, with field
 * @template T
 * @param {T}                prototype   Class prototype, for the constructor of which, to attach the annotated field metadata
 * @param {string}           propertyKey Property key of class field
 * @param {FieldDescription} annotation  FieldDescription object to annotate the class field metadata
 */
export const annotateClassField = <T extends object>(prototype: T, propertyKey: string, annotation: FieldDescription) => {
  const klass = prototype.constructor as Class<T>;

  const classMetadata = getClassOwnMetadata(klass) || {};
  const fieldMetadata = { ...getFieldMetadata(klass, propertyKey, classMetadata), ...annotation };

  annotateClass(klass, { ...classMetadata, fields: { ...classMetadata.fields, [propertyKey]: fieldMetadata } });
};
