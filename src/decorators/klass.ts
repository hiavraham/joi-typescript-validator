import { ValidationOptions } from "joi";
import { SchemaArgs } from "..";
import { annotateClass } from "../helpers";
import { Class } from "../types";

/**
 * Constrain class fields by the Joi schema or schema function passed
 * @template T
 * @param {SchemaArgs} schema Joi schema or schema fuction, by which, to constrain class fields
 */
export function customSchema<T>(schema: SchemaArgs) {
  return (target: Class<T>) => {
    annotateClass(target, { globalArgs: schema });
  };
}

/**
 * Set class schema options, to be used when generating validations
 * @template T
 * @param {ValidationOptions} options Validation options
 */
export function schemaOptions<T>(options: ValidationOptions) {
  return (target: Class<T>) => {
    annotateClass(target, { options });
  };
}
