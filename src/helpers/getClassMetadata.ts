import { getClassOwnMetadata } from ".";
import { Class, ClassMetadata } from "../types";

/**
 * Get class metadata and merge recursively with metadata of ancestor classes
 * @template T
 * @param {Class<T> | undefined} klass Class, for which, to get the metadata of
 * @returns {ClassDescription | undefined}
 */
export const getClassMetadata = <T>(klass: Class<T> | undefined): ClassMetadata | undefined => {
  if (klass === undefined) {
    return;
  }

  const metadata = getClassOwnMetadata(klass);

  const parentClass = Object.getPrototypeOf(klass) as Class<unknown>;
  if (parentClass.name !== "") {
    const parentMetadata = getClassMetadata(parentClass);
    if (parentMetadata !== undefined) {
      return {
        fields: { ...parentMetadata.fields, ...metadata?.fields },
        options: metadata?.options ?? parentMetadata.options,
        globalArgs: metadata?.globalArgs ?? parentMetadata.globalArgs,
      };
    }
  }

  return metadata;
};
