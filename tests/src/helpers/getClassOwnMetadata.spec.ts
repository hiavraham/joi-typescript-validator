import { expect } from "../../helpers";

import Joi from "joi";
import { klass, number, string } from "../../../src/decorators";
import { getClassOwnMetadata } from "../../../src/helpers";

describe("getClassOwnMetadata()", function () {
  const func = (j: Joi.Schema) => j.allow("");

  @klass.customSchema(func)
  @klass.schemaOptions({ allowUnknown: true })
  class Base {
    @number.integer()
    public id: number;
  }

  class User extends Base {
    @string.token()
    public name: string;
  }

  class Contract extends Base {}

  class Vehicle {}

  class Car extends Vehicle {}

  it("should return undefined when class has no decorators", () => {
    expect(getClassOwnMetadata(Vehicle)).to.be.undefined;
  });

  it("should return undefined when class and class ancestors have no decorators", () => {
    expect(getClassOwnMetadata(Car)).to.be.undefined;
  });

  describe("#options property", function () {
    it("should be equal to what is passed with @klass.schemaOptions decorator", () => {
      expect(getClassOwnMetadata(Base)?.options).to.be.eql({ allowUnknown: true });
    });

    it("should be equal to undefined when class has no options defined", () => {
      expect(getClassOwnMetadata(Vehicle)?.options).to.be.undefined;
    });

    it("should be equal to undefined when class has no options defined and parent class has options defined", () => {
      expect(getClassOwnMetadata(User)?.options).to.be.undefined;
    });
  });

  describe("#fields property", function () {
    it("should be equal to class fields metadata", () => {
      expect(getClassOwnMetadata(User)?.fields).to.be.eql({
        name: {
          designType: String,
          token: true,
        },
      });
    });

    it("should be equal to undefined when class has no field decorators", () => {
      expect(getClassOwnMetadata(Vehicle)?.fields).to.be.undefined;
    });

    it("should be equal to undefined when class has no field decorators and parent class has field decorators", () => {
      expect(getClassOwnMetadata(Contract)?.fields).to.be.undefined;
    });
  });

  describe("#globalArgs property", function () {
    it("should be equal to what is passed with @klass.customSchema decorator", () => {
      expect(getClassOwnMetadata(Base)?.globalArgs).to.be.eql(func);
    });

    it("should be equal to undefined when class has no globalArgs defined", () => {
      expect(getClassOwnMetadata(Vehicle)?.globalArgs).to.be.undefined;
    });

    it("should be equal to undefined when class has no globalArgs defined and parent class has globalArgs defined", () => {
      expect(getClassOwnMetadata(User)?.globalArgs).to.be.undefined;
    });
  });
});
