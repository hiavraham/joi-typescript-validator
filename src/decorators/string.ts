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
 * Constrain string field to have a maximum length
 * @template T
 * @param {number} value Value, by which, to constrain the maximum length
 */
export function maxLength<T extends object>(value: number) {
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
