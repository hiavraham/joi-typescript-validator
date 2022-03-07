import { setFieldDescription } from "..";

/**
 * Constrain string field length to be greater than 0
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function notEmpty<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string) => {
    const description = { nonempty: isEnabled };
    setFieldDescription(target, propertyKey, description);
  };
}

/**
 * Constrain string field to only contain alphanumeric characters (a-z, A-Z, and 0-9)
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function alphanum<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string) => {
    const description = { alphanum: isEnabled };
    setFieldDescription(target, propertyKey, description);
  };
}

/**
 * Constrain string field to only contain alphabetic and underscore characters (a-z, A-Z, 0-9, and underscore _)
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function token<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string) => {
    const description = { token: isEnabled };
    setFieldDescription(target, propertyKey, description);
  };
}

/**
 * Constrain string field to have a maximum length
 * @template T
 * @param {number} value Value, by which, to constrain the maximum length
 */
export function max<T extends object>(value: number) {
  return (target: T, propertyKey: string) => {
    const description = { maxLength: value };
    setFieldDescription(target, propertyKey, description);
  };
}

/**
 * Constrain string field to have a minimum length
 * @template T
 * @param {number} value Value, by which, to constrain the minimum length
 */
export function minLength<T extends object>(value: number) {
  return (target: T, propertyKey: string) => {
    const description = { minLength: value };
    setFieldDescription(target, propertyKey, description);
  };
}

/**
 * Constrain field value to be of email format
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function email<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string) => {
    const description = { email: isEnabled };
    setFieldDescription(target, propertyKey, description);
  };
}

/**
 * Constrain field value to be a valid hostname as per RFC1123
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function hostname<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string) => {
    const description = { hostname: isEnabled };
    setFieldDescription(target, propertyKey, description);
  };
}

/**
 * Constrain field value to be of valid ISO 8601 date format
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function isoDate<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string) => {
    const description = { isoDate: isEnabled };
    setFieldDescription(target, propertyKey, description);
  };
}

/**
 * Constrain field value to be of valid ISO 8601 duration format
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function isoDuration<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string) => {
    const description = { isoDuration: isEnabled };
    setFieldDescription(target, propertyKey, description);
  };
}

/**
 * Constrain field value to be a valid credit card number (using Luhn Algorithm)
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function creditCard<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string) => {
    const description = { creditCard: isEnabled };
    setFieldDescription(target, propertyKey, description);
  };
}
