import { ClassDescription, MetadataKeys } from "..";
import { Class } from "../types";

/**
 * Get class metadata attached directly to class
 * @template T
 * @param {Class<T>} klass Class, for which, to get the direct metadata of
 * @returns {ClassDescription | undefined}
 */
export const getClassOwnMetadata = <T>(klass: Class<T>) => {
  return Reflect.getOwnMetadata(MetadataKeys.Fields, klass) as ClassDescription | undefined;
};
