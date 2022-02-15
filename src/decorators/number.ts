import { setFieldDescription, Threshold } from "..";

/**
 * Constrain number field to be less than or equal to a certain value
 * @template T
 * @param {Threshold | number} value Value, by which, to constrain the field to be less than or equal to
 */
export function max<T extends object>(value: Threshold | number) {
  const maxValue = typeof (value) === "number" ? { value } : value;

  return (target: T, propertyKey: string) => {
    const description = { maxValue };
    setFieldDescription(target, propertyKey, description);
  };
}

/**
 * Constrain number field to be greater than or equal to a certain value
 * @template T
 * @param {Threshold | number} value Value, by which, to constrain the field to be greater than or equal to
 */
export function min<T extends object>(value: Threshold | number) {
  const minValue = typeof (value) === "number" ? { value } : value;

  return (target: T, propertyKey: string) => {
    const description = { minValue };
    setFieldDescription(target, propertyKey, description);
  };
}

/**
 * Constrain number field to be a positive number (greater than 0)
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function positive<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string) => {
    const description = { positive: isEnabled };
    setFieldDescription(target, propertyKey, description);
  };
}

/**
 * Constrain number field to be a negative number (less than 0)
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function negative<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string) => {
    const description = { negative: isEnabled };
    setFieldDescription(target, propertyKey, description);
  };
}
