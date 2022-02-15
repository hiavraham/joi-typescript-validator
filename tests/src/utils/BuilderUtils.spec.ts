import { expect } from "../../helpers";

import Joi from "joi";
import { Email, getSchemaDescription, MaxLength, MinLength } from "../../../src";
import { any, number } from "../../../src/decorators";


class User {
  @any.required()
  @MaxLength(50)
  @MinLength(10)
  public id: string;

  @any.optional()
  @number.max(50)
  @number.min(0)
  public rank: number;

  @any.optional()
  @Email()
  public email: string;
}

describe("getSchemaDescription function", function () {
  it("should return empty Joi ObjectSchema description for Date class", () => {
    expect(getSchemaDescription(Date)).to.be.eql(Joi.object().keys({}).describe());
  });

  it("should return empty Joi ObjectSchema description for Array class", () => {
    expect(getSchemaDescription(Array)).to.be.eql(Joi.object().keys({}).describe());
  });

  it("should return empty Joi ObjectSchema description for Number class", () => {
    expect(getSchemaDescription(Number)).to.be.eql(Joi.object().keys({}).describe());
  });

  it("should return empty Joi ObjectSchema description for String class", () => {
    expect(getSchemaDescription(String)).to.be.eql(Joi.object().keys({}).describe());
  });

  it("should return empty Joi ObjectSchema description for Object class", () => {
    expect(getSchemaDescription(Object)).to.be.eql(Joi.object().keys({}).describe());
  });

  it("should return appropriate Joi ObjectSchema description for class", () => {
    expect(getSchemaDescription(User)).to.be.eql(
      Joi
        .object()
        .keys({
          id: Joi.string().min(10).max(50).required(),
          rank: Joi.number().min(0).max(50).optional(),
          email: Joi.string().email().optional(),
        })
        .describe()
    );
  });
});
