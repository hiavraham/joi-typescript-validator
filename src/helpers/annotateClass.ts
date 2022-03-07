import { ClassDescription, MetadataKeys } from "../decorators/BaseDecorators";
import { Class } from "../types";
import { getClassOwnMetadata } from "./getClassOwnMetadata";

/**
 * Annotate class, using Reflect, with class description object
 * @template T
 * @param {Class<T>} klass
 * @param {Partial<ClassDescription>} annotation
 */
export const annotateClass = <T>(klass: Class<T>, annotation: Partial<ClassDescription>) => {
  const metadata = getClassOwnMetadata(klass) || {};
  Reflect.defineMetadata(MetadataKeys.Fields, { ...metadata, ...annotation }, klass);
};
