import { expect } from "../../helpers";

import { any, string } from "../../../src/decorators";
import { getClassMetadata, getClassOwnMetadata, getFieldMetadata } from "../../../src/helpers";
import { Class } from "../../../src/types";

describe("getFieldMetadata()", function () {
  class Base {
    @any.nullable()
    public code: string;
  }

  class User extends Base {
    public id: number;

    @any.required()
    @string.token()
    public code: string;
  }

  it("should return field metadata from class metadata", () => {
    const classMetadata = getClassMetadata(User) || {};
    const fieldMetadata = classMetadata.fields?.code;

    expect(getFieldMetadata(User, "code", classMetadata)).to.be.eql(fieldMetadata);
  });

  it("should return field metadata from class own metadata", () => {
    const classMetadata = getClassOwnMetadata(User) || {};
    const fieldMetadata = classMetadata?.fields?.code;

    expect(getFieldMetadata(User, "code", classMetadata)).to.be.eql(fieldMetadata);
  });

  it("should return field metadata only with designType property when field does not have decoration", () => {
    const classMetadata = getClassOwnMetadata(User) || {};
    const fieldMetadata = { designType: Reflect.getOwnMetadata("design:type", User.prototype, "id") as Class<unknown> };

    expect(getFieldMetadata(User, "id", classMetadata)).to.be.eql(fieldMetadata);
  });
});
