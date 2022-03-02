import { expect } from "../../helpers";

import { any, number } from "../../../src/decorators";
import { validate } from "../../../src/helpers";

describe("validate()", function () {
  class User {
    @any.required()
    @number.integer()
    @Reflect.metadata("design:type", Number)
    public id: number | string;

    public name: string;
  }

  it("should return validation result with no error object when instance complies with class schema", () => {
    const user = new User();

    user.id = 13;
    expect(validate(User, user).error).to.be.undefined;
  });

  it("should return validation result with error object when instance does not comply with class schema", () => {
    const user = new User();

    user.id = 13.33;
    expect(validate(User, user).error?.details).to.be.eql([
      {
        message: "\"id\" must be an integer",
        path: ["id"],
        type: "number.integer",
        context: {
          key: "id",
          label: "id",
          value: 13.33,
        },
      },
    ]);
  });

  describe("passed validation options", function () {
    it("should return validation result with no error object when instance complies with class schema", () => {
      const user = new User();

      user.id = 13;
      user.name = "Jane";
      expect(validate(User, user, true, { allowUnknown: true }).error).to.be.undefined;
    });

    it("should return validation result with error object when instance does not comply with class schema", () => {
      const user = new User();

      user.id = "13";
      expect(validate(User, user, true, { convert: false }).error?.details).to.be.eql([
        {
          message: "\"id\" must be a number",
          path: ["id"],
          type: "number.base",
          context: {
            key: "id",
            label: "id",
            value: "13",
          },
        },
      ]);
    });
  });
});
