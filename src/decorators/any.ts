import { setFieldDescription } from "..";

/**
 * Mark field value as required
 * @template T
 */
export function required<T extends object>() {
  return (target: T, propertyKey: string) => {
    const description = { required: true };
    setFieldDescription(target, propertyKey, description);
  };
}

/**
 * Mark field value as optional
 * @template T
 */
export function optional<T extends object>() {
  return (target: T, propertyKey: string) => {
    const description = { required: false };
    setFieldDescription(target, propertyKey, description);
  };
}

/**
 * Mark field value as nullable
 * @template T
 * @param {boolean} [isEnabled=true] Flag used to overwrite decorator on parent class field
 */
export function nullable<T extends object>(isEnabled = true) {
  return (target: T, propertyKey: string) => {
    const description = { nullable: isEnabled };
    setFieldDescription(target, propertyKey, description);
  };
}

/**
 * Constrain field to only the allowed values passed
 * @template T
 * @param {unknown[]} args Values, by which, to constrain the field
 */
export function allow<T extends object>(...args: unknown[]) {
  return (target: T, propertyKey: string) => {
    const description = { options: args };
    setFieldDescription(target, propertyKey, description);
  };
}
