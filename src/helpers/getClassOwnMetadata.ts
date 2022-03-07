import { MetadataKeys } from "..";
import { Class, ClassMetadata } from "../types";

/**
 * Get class metadata attached directly to class
 * @template T
 * @param {Class<T>} klass Class, for which, to get the direct metadata of
 * @returns {ClassMetadata | undefined}
 */
export const getClassOwnMetadata = <T>(klass: Class<T>) => {
  return Reflect.getOwnMetadata(MetadataKeys.Fields, klass) as ClassMetadata | undefined;
};
