import "reflect-metadata";
import { ValidationOptions } from "joi";

import { MetadataKeys } from "..";
import { FieldsMap, SchemaArgs, TreeMetadata } from "../decorators/BaseDecorators";
import { Class } from "../types";

/**
 * Print class metadata to console
 * @template T
 * @param {Class<T>} klass Class for which to print metadata
 */
export function printMetadata<T>(klass: Class<T>) {
  console.dir(getMetadata(klass), { depth: null });
}

/**
 * Get class fields metadata recursevly from class parents and merge them accordingly
 * @template T
 * @param {Class<T>} klass Class, for which, to get the fields metadata
 * @returns {FieldsMap | void}
 */
export function getMetadata<T>(klass: Class<T> | undefined): FieldsMap | void {
  if (klass === undefined) {
    return;
  }

  const metadata = Reflect.getOwnMetadata(MetadataKeys.Fields, klass) as TreeMetadata | undefined;
  if (metadata === undefined) {
    return;
  }
  const classDescription = metadata.get(klass) || {};
  const fields = classDescription.fields || {};

  const parentClass = Object.getPrototypeOf(klass) as Class<unknown>;
  if (parentClass.name !== "") {
    return { ...getMetadata(parentClass), ...fields };
  }

  return classDescription.fields;
}

/**
 * Get ValidationOptions metadata recursevly until passed to class with `@klass.schemaOptions` decorator
 * @template T
 * @param {Class<T>} klass Class for which to get the schema options passed by decorator
 * @returns {ValidationOptions | void} Joi ValidationOptions
 */
export function getOptions<T>(klass: Class<T> | undefined): ValidationOptions | void {
  if (klass === undefined) {
    return;
  }

  const metadata = Reflect.getOwnMetadata(MetadataKeys.Fields, klass) as TreeMetadata | undefined;

  const classDescription = metadata?.get(klass);
  if (classDescription?.options === undefined) {
    const parentClass = Object.getPrototypeOf(klass) as Class<unknown>;
    if (parentClass.name !== "") {
      return getOptions(parentClass);
    }
  } else {
    return classDescription.options;
  }
}

/**
 * Get SchemaArgs recursevly until passed to class with `@klass.customSchema` decorator
 * @template T
 * @param {Class<T>} klass Class for which to get the custom Joi schema or schema function passed by decorator
 * @returns {SchemaArgs | void} Joi schema or schema function
 */
export function getGlobalArgs<T>(klass: Class<T> | undefined): SchemaArgs | void {
  if (klass === undefined) {
    return;
  }

  const metadata = Reflect.getOwnMetadata(MetadataKeys.Fields, klass) as TreeMetadata | undefined;

  const classDescription = metadata?.get(klass);
  if (classDescription?.globalArgs === undefined) {
    const parentClass = Object.getPrototypeOf(klass) as Class<unknown>;
    if (parentClass.name !== "") {
      return getGlobalArgs(parentClass);
    }
  } else {
    return classDescription.globalArgs;
  }
}
