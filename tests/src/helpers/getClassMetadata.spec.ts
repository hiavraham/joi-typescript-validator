import { expect } from "../../helpers";

import Joi from "joi";
import { any, klass, number, string } from "../../../src/decorators";
import { getClassMetadata } from "../../../src/helpers";

describe("getClassMetadata()", function () {
  const allowFunc = (j: Joi.Schema) => j.allow("");
  const invalidFunc = (j: Joi.Schema) => j.invalid("-");

  enum RoleNames {
    Admin,
    Moderator,
    Viewer,
  }

  @klass.customSchema(allowFunc)
  @klass.schemaOptions({ allowUnknown: true })
  class Base {
    @number.integer()
    public id: number;
  }

  @klass.schemaOptions({ stripUnknown: true })
  class Person extends Base {
    @string.email()
    public email: string;
  }

  @klass.customSchema(invalidFunc)
  class User extends Person {
    @any.allow(RoleNames.Admin, RoleNames.Moderator)
    public role: RoleNames;
  }

  class Contractor extends User {
    @any.required()
    public email: string;
  }

  class Vehicle {}

  class Car extends Vehicle {}

  it("should return undefined when class has no decorators", () => {
    expect(getClassMetadata(Vehicle)).to.be.undefined;
  });

  it("should return undefined when class and class ancestors have no decorators", () => {
    expect(getClassMetadata(Car)).to.be.undefined;
  });

  describe("#options property", function () {
    it("should be equal to what is passed with @klass.schemaOptions decorator", () => {
      expect(getClassMetadata(Base)?.options).to.be.eql({ allowUnknown: true });
    });

    it("should be equal to undefined when class has no options defined", () => {
      expect(getClassMetadata(Vehicle)?.options).to.be.undefined;
    });

    it("should be equal to closest ancestor class options when class has no options defined", () => {
      expect(getClassMetadata(Contractor)?.options).to.be.eql({ stripUnknown: true });
    });
  });

  describe("#fields property", function () {
    it("should be equal to class fields metadata", () => {
      expect(getClassMetadata(Base)?.fields).to.be.eql({
        id: {
          designType: Number,
          integer: true,
        },
      });
    });

    it("should be equal to undefined when class has no fields decorated", () => {
      expect(getClassMetadata(Vehicle)?.fields).to.be.undefined;
    });

    it("should be equal to the recursive merge of class and ancestor classes fields metadata", () => {
      expect(getClassMetadata(Contractor)?.fields).to.be.eql({
        id: {
          designType: Number,
          integer: true,
        },
        role: {
          designType: Number,
          options: [0, 1],
        },
        email: {
          designType: String,
          required: true,
        },
      });
    });
  });

  describe("#globalArgs property", function () {
    it("should be equal to what is passed with @klass.customSchema decorator", () => {
      expect(getClassMetadata(Base)?.globalArgs).to.be.eql(allowFunc);
    });

    it("should be equal to undefined when class has no globalArgs defined", () => {
      expect(getClassMetadata(Vehicle)?.globalArgs).to.be.undefined;
    });

    it("should be equal to closest ancestor class globalArgs when class has no globalArgs defined", () => {
      expect(getClassMetadata(Contractor)?.globalArgs).to.be.eql(invalidFunc);
    });
  });
});
