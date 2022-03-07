import { MetadataKeys } from "../decorators/BaseDecorators";
import { Class, ClassMetadata } from "../types";
import { getClassOwnMetadata } from "./getClassOwnMetadata";

/**
 * Annotate class, using Reflect, with ClassMetadata object
 * @template T
 * @param {Class<T>} klass
 * @param {ClassMetadata} annotation
 */
export const annotateClass = <T>(klass: Class<T>, annotation: ClassMetadata) => {
  const metadata = getClassOwnMetadata(klass) || {};
  Reflect.defineMetadata(MetadataKeys.Fields, { ...metadata, ...annotation }, klass);
};
