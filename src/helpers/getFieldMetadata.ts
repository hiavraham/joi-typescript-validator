import { Class, ClassMetadata } from "../types";

/**
 * Get field metadata from reflect own metadata and given class metadata
 * @template T
 * @param {Class<T>}        klass         Class of field
 * @param {string | symbol} propertyKey   Field property key
 * @param {ClassMetadata}   classMetadata Class metadata, from which, to get field metadata
 * @returns {FieldDescription} Field metadata
 */
export const getFieldMetadata = <T>(klass: Class<T>, propertyKey: string | symbol, classMetadata: ClassMetadata) => {
  const fieldMetadata = classMetadata.fields?.[propertyKey];
  const getDesignType = () => {
    return Reflect.getOwnMetadata("design:type", klass.prototype, propertyKey) as Class<unknown>;
  };

  return fieldMetadata || { designType: getDesignType() };
};
