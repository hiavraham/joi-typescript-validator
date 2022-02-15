import { setFieldDescription } from "..";

/**
 * Constrain date or string field to be of a given format
 * @template T
 * @param {string} [format="YYYY-MM-DD"] Format, by which, to constrain the field
 */
export function format<T extends object>(format = "YYYY-MM-DD") {
  return (target: T, propertyKey: string) => {
    const description = { dateString: true, dateStringFormat: format };
    setFieldDescription(target, propertyKey, description);
  };
}
