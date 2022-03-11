import Joi from "joi";
import { SchemaArgs } from "../decorators/BaseDecorators";
import { FieldDescription } from "./fieldDescription";

/**
 * Class Metadata, attached with reflect
 */
export interface ClassMetadata {
  /**
   * Class fields object containing each field's metadata
   */
  fields?: { [propertyKey: string | symbol]: FieldDescription };

  /**
   * Class validation options, attached with `@klass.schemaOptions` decorator
   */
  options?: Joi.ValidationOptions;

  /**
   * Class globalArgs, attached with `@klass.customSchema` decorator
   */
  globalArgs?: SchemaArgs;
}
