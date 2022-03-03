import BaseJoi from "joi";
import JoiDateFactory from "@joi/date";

import { Class, FieldDescription } from "../types";
import { getClassMetadata } from "../helpers";

/**
 * Joi instance customized with JoiDateFactory extension
 */
const Joi = BaseJoi.extend(JoiDateFactory) as BaseJoi.Root;

/**
 * Map of saved schemas for faster access internally.
 * Prevents regenerating schemas that have already been generated
 * @type {Map<Class<unknown>, BaseJoi.Schema>}
 */
const savedSchemas = new Map<Class<unknown>, BaseJoi.Schema>();

/**
 * Build string field Joi schema
 * @param {FieldDescription} description Field description object
 * @returns {BaseJoi.StringSchema}
 */
function buildJoiString(description: FieldDescription) {
  let schema = Joi.string();

  if (description.alphanum) {
    schema = schema.alphanum();
  }

  if (description.token) {
    schema = schema.token();
  }

  if (description.minLength || description.nonempty) {
    schema = schema.min(Math.max(description.minLength || 0, 1));
  }

  if (description.maxLength) {
    schema = schema.max(description.maxLength);
  }

  if (description.email) {
    schema = schema.email();
  }

  if (description.hostname) {
    schema = schema.hostname();
  }

  if (description.isoDate) {
    schema = schema.isoDate();
  }

  if (description.isoDuration) {
    schema = schema.isoDuration();
  }

  if (description.creditCard) {
    schema = schema.creditCard();
  }

  return schema;
}

/**
 * Build date field Joi schema
 * @param {FieldDescription} description Field description object
 * @returns {BaseJoi.DateSchema}
 */
function buildJoiDate(description: FieldDescription) {
  let schema = Joi.date();

  if (description.iso) {
    schema = schema.iso();
  }

  if (description.dateStringFormat) {
    schema = schema.format(description.dateStringFormat);
  }

  if (description.maxDate) {
    schema = schema.max(description.maxDate);
  }

  if (description.minDate) {
    schema = schema.min(description.minDate);
  }

  return schema;
}

/**
 * Build number field Joi schema
 * @param {FieldDescription} description Field description object
 * @returns {BaseJoi.NumberSchema}
 */
function buildJoiNumber(description: FieldDescription) {
  let schema = Joi.number();

  if (description.unsafe) {
    schema = schema.unsafe();
  }

  if (description.integer) {
    schema = schema.integer();
  }

  if (description.precision !== undefined) {
    schema = schema.precision(description.precision);
  }

  if (description.port) {
    schema = schema.port();
  }

  if (description.minValue !== undefined) {
    schema = schema.min(description.minValue);
  }

  if (description.maxValue !== undefined) {
    schema = schema.max(description.maxValue);
  }

  if (description.positive) {
    schema = schema.positive();
  }

  if (description.negative) {
    schema = schema.negative();
  }

  if (description.multipleOf !== undefined) {
    schema = schema.multiple(description.multipleOf);
  }

  return schema;
}

/**
 * Build array field Joi schema
 * @param {FieldDescription} description Field description object
 * @returns {BaseJoi.ArraySchema}
 */
function buildJoiArray(description: FieldDescription) {
  let schema = Joi.array();

  if (description.typeInfo) {
    schema = schema.items(buildJoiChildren({ designType: description.typeInfo }));
  } else {
    schema = schema.items(Joi.any());
  }

  if (description.minLength || description.nonempty) {
    schema = schema.min(Math.max(description.minLength || 0, 1));
  }

  if (description.maxLength) {
    schema = schema.max(description.maxLength);
  }

  return schema;
}

/**
 * Build non-primitive object field Joi schema
 * @param {FieldDescription} description Field description object
 * @returns {BaseJoi.ObjectSchema}
 */
function buildJoiObject(description: FieldDescription) {
  let schema = Joi.object();

  const metadata = getClassMetadata(description.designType);
  if (metadata !== undefined) {
    const fields = metadata.fields || {};
    const payload = Object.keys(fields).reduce((acc, item) => ({
      ...acc,
      [item]: buildJoiChildren(fields[item]),
    }), {});

    schema = schema.keys(payload);
  }

  const options = metadata?.options;

  return options ? schema.options(options) : schema;
}

/**
 * Extend field Joi schema with global conditions
 * @param {BaseJoi.Schema}   fieldSchema Field Joi schema
 * @param {FieldDescription} description Field description object
 * @returns {BaseJoi.Schema}
 */
function buildJoiGlobals(fieldSchema: BaseJoi.Schema, description: FieldDescription) {
  let schema = fieldSchema;

  if (description.nullable) {
    schema = schema.allow(null);
  }

  if (description.options) {
    schema = schema.valid(...description.options);
  }

  if (description.required) {
    schema = schema.required();
  } else {
    schema = schema.optional();
  }

  if (description.customSchema) {
    if (typeof description.customSchema === "function") {
      schema = description.customSchema(schema);
    } else {
      schema = description.customSchema;
    }
  }

  const globals = getClassMetadata(description.designType)?.globalArgs;
  if (globals) {
    if (typeof globals === "function") {
      schema = globals(schema);
    } else {
      schema = globals;
    }
  }

  return schema;
}

/**
 * Build field schema depending on type
 * @param {FieldDescription} description Field description object
 * @returns {BaseJoi.Schema}
 */
function buildFieldSchema(description: FieldDescription) {
  const designType = description.dateString ? "Date" : description.designType?.name;

  switch (designType) {
    case "Array":
      return buildJoiArray(description);
    case "Date":
      return buildJoiDate(description);
    case "Boolean":
      return Joi.boolean();
    case "Number":
      return buildJoiNumber(description);
    case "String":
      return buildJoiString(description);
    default:
      return buildJoiObject(description);
  }
}

/**
 * Build field schema with global conditions
 * @param {FieldDescription} description Field description object
 */
function buildJoiChildren(description: FieldDescription) {
  return buildJoiGlobals(buildFieldSchema(description), description);
}

/**
 * Build Joi schema for given class
 * @template T
 * @param {Class<T>} klass Class, for which, to generate the Joi schema
 * @returns {BaseJoi.ObjectSchema}
 */
function buildJoiRoot<T>(klass: Class<T>) {
  const metadata = getClassMetadata(klass) || {};

  const fields = metadata.fields || {};
  const partialSchema = Object.keys(fields).reduce((acc, item) => ({
    ...acc,
    [item]: buildJoiChildren(fields[item]),
  }), {});

  const options = metadata.options;
  const globals = metadata.globalArgs;

  const objectSchema = BaseJoi.object().keys(partialSchema);
  const schema = options ? objectSchema.options(options) : objectSchema;

  if (globals) {
    if (typeof globals === "function") {
      return globals(schema);
    }

    return globals;
  }

  return schema;
}

/**
 * Returns Joi schema for the given class
 * @template T
 * @param {Class<T>} klass             Class for which to get or build the schema
 * @param {boolean}  [shouldSave=true] Boolean flag to choose whether or not to save the schema
 * @returns {BaseJoi.Schema} Joi Schema
 */
export function getSchema<T>(klass: Class<T>, shouldSave = true) {
  const schema = savedSchemas.get(klass) || buildJoiRoot(klass);

  if (shouldSave) {
    savedSchemas.set(klass, schema);
  }

  return schema;
}

/**
 * Returns a plain object representing the schema's rules and properties for the given class
 * @template T
 * @param {Class<T>} klass             Class for which to get the schema's rules and properties
 * @param {boolean}  [shouldSave=true] Boolean flag to choose whether or not to save the schema
 * @returns {BaseJoi.Description} Joi schema's rules and properties
 */
export function getSchemaDescription<T>(klass: Class<T>, shouldSave = true) {
  return getSchema(klass, shouldSave).describe();
}
