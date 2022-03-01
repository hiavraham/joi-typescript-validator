import "reflect-metadata";
import Joi, { ValidationOptions } from "joi";

import { Class, FieldDescription } from "../types";

/**
 * Joi Schema or Joi SchemaFunction
 */
export type SchemaArgs = Joi.Schema | Joi.SchemaFunction;

/**
 * MetadataKeys constant object containing Reflect metadata keys
 */
export const MetadataKeys = { Fields: "validate:fields" };

/**
 * Threshold interface, describing a maximum or minimum (exclusive or inclusive) limit
 */
export interface Threshold {
  /**
   * Limit value
   */
  value: number;

  /**
   * Mark to set limit as exclusive
   */
  exclude?: boolean;
}

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
 * Key-value index signature containing description metadata for each field
 */
export type FieldsMap = { [key: string]: FieldDescription };

/**
 * Class description metadata
 */
export class ClassDescription {
  /**
   * Class fields object containing each field's FieldDescription
   */
  public fields?: FieldsMap;

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
 * Class tree metadata
 */
export type TreeMetadata = Map<unknown, ClassDescription>;

/**
 * Attach field design type and description to prototype constructor metadata
 * @template T
 * @param {T}                target      Class prototype, for which, to attach field design type and description to constructor
 * @param {string}           propertyKey Field key to identify the field, for which, to set the description and design type
 * @param {FieldDescription} description Field description metadata to attach to prototype constructor
 */
export function setFieldDescription<T extends object>(target: T, propertyKey: string, description: FieldDescription) {
  const designType = Reflect.getMetadata("design:type", target, propertyKey) as Class<unknown>;
  const constructor = target.constructor as Class<T>;

  const metadata = (Reflect.getMetadata(MetadataKeys.Fields, constructor) || new Map()) as TreeMetadata;
  const classDescription = metadata.get(constructor) || {};

  const fields = classDescription.fields || {};
  fields[propertyKey] = fields[propertyKey] || {};
  fields[propertyKey] = { ...fields[propertyKey], designType, ...description };

  metadata.set(constructor, { ...classDescription, fields });

  Reflect.defineMetadata(MetadataKeys.Fields, metadata, constructor);
}

/**
 * Attach Joi schema or schema function to class metadata as globalArgs
 * @template T
 * @param {Class<T>}   klass Class to attach globalArgs to
 * @param {SchemaArgs} args  Joi schema or schema function to attach to class
 */
export function setSchemaGlobals<T>(klass: Class<T>, args: SchemaArgs) {
  const metadata = (Reflect.getMetadata(MetadataKeys.Fields, klass) || new Map()) as TreeMetadata;
  const classDescription = metadata.get(klass) || {};

  metadata.set(klass, { ...classDescription, globalArgs: args });

  Reflect.defineMetadata(MetadataKeys.Fields, metadata, klass);
}

/**
 * Attach Joi validation options to class metadata as options
 * @template T
 * @param {Class<T>}          klass   Class to attach validations options to
 * @param {ValidationOptions} options Validations options to attach to class
 */
export function setSchemaOptions<T>(klass: Class<T>, options: ValidationOptions) {
  const metadata = (Reflect.getMetadata(MetadataKeys.Fields, klass) || new Map()) as TreeMetadata;
  const classDescription = metadata.get(klass) || {};

  metadata.set(klass, { ...classDescription, options });

  Reflect.defineMetadata(MetadataKeys.Fields, metadata, klass);
}
