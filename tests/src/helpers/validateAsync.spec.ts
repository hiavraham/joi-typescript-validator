import { expect } from "../../helpers";

import Joi from "joi";
import { any, number } from "../../../src/decorators";
import { validateAsync } from "../../../src/helpers";

describe("validateAsync()", function () {
  class User {
    @any.required()
    @number.integer()
    @Reflect.metadata("design:type", Number)
    public id: number | string;

    public name: string;
  }

  it("should return validation value when instance complies with class schema", async () => {
    const user = new User();

    user.id = 13;
    expect(await validateAsync(User, user)).to.be.eql(user);
  });

  it("should throw Joi.ValidationError when instance does not comply with class schema", () => {
    const user = new User();
    user.id = 13.33;

    return validateAsync(User, user)
      .then((_) => {
        throw Error("then should not be called");
      })
      .catch((err: Joi.ValidationError) => {
        expect(err._original).to.be.eql(user);
        expect(err.details).to.be.eql([
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
  });

  describe("passed validation options", function () {
    it("should return validation value when instance complies with class schema", async () => {
      const user = new User();

      user.id = 13;
      user.name = "Jane";
      expect(await validateAsync(User, user, true, { allowUnknown: true })).to.be.eql(user);
    });

    it("should throw Joi.ValidationError when instance does not comply with class schema", () => {
      const user = new User();

      user.id = "13";
      return validateAsync(User, user, true, { convert: false })
        .then((_) => {
          throw Error("then should not be called");
        })
        .catch((err: Joi.ValidationError) => {
          expect(err._original).to.be.eql(user);
          expect(err.details).to.be.eql([
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
});
