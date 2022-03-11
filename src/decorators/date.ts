import Joi from "joi";
import { annotateClassField } from "../helpers";

/**
 * Constrain date or string field to be of ISO 8601 date format
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function iso<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string | symbol) => {
    const description = { dateString: true, iso: isEnabled };
    annotateClassField(target, propertyKey, description);
  };
}

/**
 * Constrain date or string field to be of a given format
 * @template T
 * @param {string} [format="YYYY-MM-DD"] Format, by which, to constrain the field
 */
export function format<T extends object>(format = "YYYY-MM-DD") {
  return (target: T, propertyKey: string | symbol) => {
    const description = { dateString: true, dateStringFormat: format };
    annotateClassField(target, propertyKey, description);
  };
}

/**
 * Constrain date or string field to be less than or equal to a certain value
 * @template T
 * @param {string} value Value, by which, to constrain the field to be less than or equal to
 */
export function max<T extends object>(value: string | number | Date | Joi.Reference) {
  return (target: T, propertyKey: string | symbol) => {
    const description = { dateString: true, maxDate: value };
    annotateClassField(target, propertyKey, description);
  };
}

/**
 * Constrain date or string field to be greater than or equal to a certain value
 * @template T
 * @param {string} value Value, by which, to constrain the field to be greater than or equal to
 */
export function min<T extends object>(value: string | number | Date | Joi.Reference) {
  return (target: T, propertyKey: string | symbol) => {
    const description = { dateString: true, minDate: value };
    annotateClassField(target, propertyKey, description);
  };
}
