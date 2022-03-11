import { annotateClassField } from "../helpers";

/**
 * Allow number field to be unsafe (out of JavaScript's safety range (Number.MIN_SAFE_INTEGER & Number.MAX_SAFE_INTEGER))
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function unsafe<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string | symbol) => {
    const description = { unsafe: isEnabled };
    annotateClassField(target, propertyKey, description);
  };
}

/**
 * Constrain number field to be an integer (no floating point) number
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function integer<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string | symbol) => {
    const description = { integer: isEnabled };
    annotateClassField(target, propertyKey, description);
  };
}

/**
 * Constrain number field to have maximum number of decimal places
 * @template T
 * @param {number} precision Maximum number of decimal places, to constraint the field to
 */
export function precision<T extends object>(precision: number) {
  return (target: T, propertyKey: string | symbol) => {
    const description = { precision };
    annotateClassField(target, propertyKey, description);
  };
}

/**
 * Constrain number field to be a TCP port (between 0 and 65535)
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function port<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string | symbol) => {
    const description = { port: isEnabled };
    annotateClassField(target, propertyKey, description);
  };
}

/**
 * Constrain number field to be less than or equal to a certain value
 * @template T
 * @param {number} value Value, by which, to constrain the field to be less than or equal to
 */
export function max<T extends object>(value: number) {
  return (target: T, propertyKey: string | symbol) => {
    const description = { maxValue: value };
    annotateClassField(target, propertyKey, description);
  };
}

/**
 * Constrain number field to be greater than or equal to a certain value
 * @template T
 * @param {number} value Value, by which, to constrain the field to be greater than or equal to
 */
export function min<T extends object>(value: number) {
  return (target: T, propertyKey: string | symbol) => {
    const description = { minValue: value };
    annotateClassField(target, propertyKey, description);
  };
}

/**
 * Constrain number field to be a positive number (greater than 0)
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function positive<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string | symbol) => {
    const description = { positive: isEnabled };
    annotateClassField(target, propertyKey, description);
  };
}

/**
 * Constrain number field to be a negative number (less than 0)
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function negative<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string | symbol) => {
    const description = { negative: isEnabled };
    annotateClassField(target, propertyKey, description);
  };
}

/**
 * Constrain number field to be a multiple of a base
 * @template T
 * @param {number} base Value, by which, to constraint the field to be a multiple of
 */
export function multipleOf<T extends object>(base: number) {
  return (target: T, propertyKey: string | symbol) => {
    const description = { multipleOf: base };
    annotateClassField(target, propertyKey, description);
  };
}
