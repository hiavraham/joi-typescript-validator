import "reflect-metadata";
import Joi from "joi";
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
