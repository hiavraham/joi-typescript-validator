import { setFieldDescription } from "..";
import { Class } from "../types";

/**
 * Constrain array item type
 * @template T
 * @template I
 * @param {Class<I>} type Primitive or class value to set the field type to
 */
export function itemType<T extends object, I>(type: Class<I>) {
  return (target: T, propertyKey: string) => {
    const description = { typeInfo: type };
    setFieldDescription(target, propertyKey, description);
  };
}

/**
 * Constrain array field length to be greater than 0
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
 * Constrain array field to have a maximum length
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
 * Constrain array field to have a minimum length
 * @template T
 * @param {number} value Value, by which, to constrain the minimum length
 */
export function min<T extends object>(value: number) {
  return (target: T, propertyKey: string) => {
    const description = { minLength: value };
    setFieldDescription(target, propertyKey, description);
  };
}
