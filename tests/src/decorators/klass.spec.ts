import { expect } from "../../helpers";

import Joi from "joi";
import { any, klass, string } from "../../../src/decorators";

describe("class attribute decorators", function () {
  describe("@klass.customSchema decorator", function () {
    describe("Joi schema to override class schema", function () {
      @klass.customSchema(Joi.object({ username: Joi.string().alphanum() }))
      class User {
        @string.min(3)
        public name: string;

        @string.email()
        public email: string;

        public username: string;
      }

      it("should pass when none of the attribute decorator constraints are met", () => {
        const user = new User();

        expect(user).to.be.valid;
      });

      it("should pass when decorator constraints are met", () => {
        const user = new User();

        user.username = "jane";
        expect(user).to.be.valid;
      });

      it("should error when decorator constraints are not met", () => {
        const user = new User();

        user.username = "####";
        expect(user).to.not.be.valid;
      });
    });
  });

  describe("@klass.schemaOptions decorator", function () {
    @klass.schemaOptions({ allowUnknown: true })
    class User {
      @any.optional()
      public id: number;

      public name: string;
    }

    it("should pass when object complies with Joi validation options passed to decorator", () => {
      const user = new User();

      user.name = "Jane";
      expect(user).to.be.valid;
    });
  });
});
