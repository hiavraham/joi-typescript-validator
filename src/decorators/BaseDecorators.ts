import "reflect-metadata";
import Joi, { ValidationOptions } from "joi";

import { Class, FieldDescription } from "../types";
import { getClassOwnMetadata } from "../helpers";

/**
 * Joi Schema or Joi SchemaFunction
 */
export type SchemaArgs = Joi.Schema | Joi.SchemaFunction;

/**
 * MetadataKeys constant object containing Reflect metadata keys
 */
export const MetadataKeys = { Fields: "validate:fields" };

/**
 * ConditionSchema interface, describing Joi schema based on condition value
 */
export interface ConditionSchema {
  /**
   * Condition function to return boolean value
   */
  condition: (_args: unknown[]) => boolean;

  /**
   * Joi schema when condition evaluates to true
   */
  truthy: Joi.Schema;

  /**
   * Joi schema when condition evaluates to false
   */
  falsy: Joi.Schema;
}

/**
 * Class description metadata
 */
export class ClassDescription {
  /**
   * Class fields object containing each field's FieldDescription
   */
  public fields?: { [key: string]: FieldDescription };

  /**
   * Class options attached with `@SchemaOptions` decorator
   */
  public options?: ValidationOptions;

  /**
   * Class globalArgs attached with `@CustomSchema` decorator
   */
  public globalArgs?: SchemaArgs;
}

/**
 * Attach field design type and description to prototype constructor metadata
 * @template T
 * @param {T}                target      Class prototype, for which, to attach field design type and description to constructor
 * @param {string}           propertyKey Field key to identify the field, for which, to set the description and design type
 * @param {FieldDescription} description Field description metadata to attach to prototype constructor
 */
export function setFieldDescription<T extends object>(target: T, propertyKey: string, description: FieldDescription) {
  const designType = Reflect.getOwnMetadata("design:type", target, propertyKey) as Class<unknown>;
  const constructor = target.constructor as Class<T>;

  const metadata = getClassOwnMetadata(constructor) || {};

  const fields = metadata.fields || {};
  fields[propertyKey] = fields[propertyKey] || {};
  fields[propertyKey] = { ...fields[propertyKey], designType, ...description };

  Reflect.defineMetadata(MetadataKeys.Fields, { ...metadata, fields }, constructor);
}
