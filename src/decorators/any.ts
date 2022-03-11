import { SchemaArgs } from "..";
import { annotateClassField } from "../helpers";

/**
 * Mark field value as required
 * @template T
 */
export function required<T extends object>() {
  return (target: T, propertyKey: string) => {
    const description = { required: true };
    annotateClassField(target, propertyKey, description);
  };
}

/**
 * Mark field value as optional
 * @template T
 */
export function optional<T extends object>() {
  return (target: T, propertyKey: string) => {
    const description = { required: false };
    annotateClassField(target, propertyKey, description);
  };
}

/**
 * Mark field value as nullable
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function nullable<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string) => {
    const description = { nullable: isEnabled };
    annotateClassField(target, propertyKey, description);
  };
}

/**
 * Constrain field to only the allowed values passed
 * @template T
 * @param {unknown[]} args Values, by which, to constrain the field
 */
export function allow<T extends object>(...args: unknown[]) {
  return (target: T, propertyKey: string) => {
    const description = { options: args };
    annotateClassField(target, propertyKey, description);
  };
}

/**
 * Constrain field by the Joi schema or schema function passed
 * @template T
 * @param {SchemaArgs} schema Joi schema or schema fuction, by which, to constrain field
 */
export function customSchema<T extends object>(schema: SchemaArgs) {
  return (target: T, propertyKey: string) => {
    const description = { customSchema: schema };
    annotateClassField(target, propertyKey, description);
  };
}
