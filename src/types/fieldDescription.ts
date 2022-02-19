import { Class } from "../types";
import { ConditionSchema, SchemaArgs, Threshold } from "../decorators/BaseDecorators";
import Joi from "joi";

/**
 * Metadata of annotated field
 */
export interface FieldDescription {
  /**
   * Design type of the field
   */
  designType?: Class<unknown>;

  /**
   * Type of array field values
   */
  typeInfo?: Class<unknown>;

  /**
   * Conditional constraint
   */
  conditional?: ConditionSchema;

  /**
   * Custom Joi Schema
   */
  customSchema?: SchemaArgs;

  /**
   * Nullable constraint
   */
  nullable?: boolean;

  /**
   * Required constraint
   */
  required?: boolean;

  /**
   * Allowed values constraint
   */
  options?: unknown[];

  /**
   * Value greater than 0 constraint for number fields
   */
  positive?: boolean;

  /**
   * Value less than 0 constraint for number fields
   */
  negative?: boolean;

  /**
   * Min value constraint for number fields
   */
  minValue?: Threshold;

  /**
   * Max value constraint for number fields
   */
  maxValue?: Threshold;

  /**
   * Email format constraint for string fields
   */
  email?: boolean;

  /**
   * Credit card format constraint for string fields
   */
  creditCard?: boolean;

  /**
   * Alphanumeric characters for string fields
   */
  alphanum?: boolean;

  /**
   * Alphabetic and underscore characters constraint for string fields
   */
  token?: boolean;

  /**
   * Length greater than 0 constraint for array or string fields
   */
  nonempty?: boolean;

  /**
   * Min length constraint for array and string fields
   */
  minLength?: number;

  /**
   * Max length constraint for array and string fields
   */
  maxLength?: number;

  /**
   * String field as date field mark
   */
  dateString?: boolean;

  /**
   * ISO 8601 date format constraint
   */
  iso?: boolean;

  /**
   * Date format constraint
   */
  dateStringFormat?: string;

  /**
   * Max date constraint
   */
  maxDate?: string | number | Date | Joi.Reference;

  /**
   * Min date constraint
   */
  minDate?: string | number | Date | Joi.Reference;

  /**
   * Allow unsafe (JavaScript's safety range (Number.MIN_SAFE_INTEGER & Number.MAX_SAFE_INTEGER)) constraint
   */
  unsafe?: boolean;

  /**
   * Integer (no floating point) constraint for number fields
   */
  integer?: boolean;

  /**
   * Maximum number of decimal places constraint for number fields
   */
  precision?: number;

  /**
   * TCP port (between 0 and 65535) constraint for number fields
   */
  port?: boolean;

  /**
   * Multiple of base constraint for number fields
   */
  multipleOf?: number;
}
