import BaseJoi from "joi";
import { getSchema } from "..";
import { Class } from "../types";

/**
 * Return promise of validation value object or thrown validation error object for class instance
 * @template T
 * @param {Class<T>}                  klass        Class of instance object
 * @param {T}                         instance     Class instance object
 * @param {boolean}                   [cache=true] Boolean flag to choose whether to cache the schema
 * @param {BaseJoi.ValidationOptions} options      Joi validation options
 * @returns {Promise<any>} Promise of validation value object or thrown validation error object
 */
export const validateAsync = async <T>(klass: Class<T>, instance: T, cache = true, options?: BaseJoi.ValidationOptions) => {
  return getSchema(klass, cache).validateAsync(instance, options);
};
