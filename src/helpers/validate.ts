import BaseJoi from "joi";
import { getSchema } from "..";
import { Class } from "../types";

/**
 * Return Joi validation result object for class instance
 * @template T
 * @param {Class<T>}                  klass        Class of instance object
 * @param {T}                         instance     Class instance object
 * @param {boolean}                   [cache=true] Boolean flag to choose whether to cache the schema
 * @param {BaseJoi.ValidationOptions} options      Joi validation options
 * @returns {BaseJoi.ValidationResult}
 */
export const validate = <T>(klass: Class<T>, instance: T, cache = true, options?: BaseJoi.ValidationOptions) => {
  return getSchema(klass, cache).validate(instance, options);
};
