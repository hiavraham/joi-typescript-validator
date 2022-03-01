import "reflect-metadata";
import { ValidationOptions } from "joi";

import { MetadataKeys } from "..";
import { ClassDescription, FieldsMap, SchemaArgs } from "../decorators/BaseDecorators";
import { Class } from "../types";

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

  const metadata = Reflect.getOwnMetadata(MetadataKeys.Fields, klass) as ClassDescription | undefined;
  if (metadata === undefined) {
    return;
  }
  const fields = metadata.fields || {};

  const parentClass = Object.getPrototypeOf(klass) as Class<unknown>;
  if (parentClass.name !== "") {
    return { ...getMetadata(parentClass), ...fields };
  }

  return metadata.fields;
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

  const metadata = Reflect.getOwnMetadata(MetadataKeys.Fields, klass) as ClassDescription | undefined;

  if (metadata?.options === undefined) {
    const parentClass = Object.getPrototypeOf(klass) as Class<unknown>;
    if (parentClass.name !== "") {
      return getOptions(parentClass);
    }
  } else {
    return metadata.options;
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

  const metadata = Reflect.getOwnMetadata(MetadataKeys.Fields, klass) as ClassDescription | undefined;

  if (metadata?.globalArgs === undefined) {
    const parentClass = Object.getPrototypeOf(klass) as Class<unknown>;
    if (parentClass.name !== "") {
      return getGlobalArgs(parentClass);
    }
  } else {
    return metadata.globalArgs;
  }
}
