import { expect } from "../../helpers";

import Joi from "joi";
import { CustomSchema, Email } from "../../../src";
import { any } from "../../../src/decorators";

describe("any attribute decorators", function () {
  describe("@any.required decorator", function () {
    describe("required overrides optional", function () {
      describe("same class", function () {
        class User {
          @any.required()
          @any.optional()
          public name: string;
        }

        it("should pass when field value is not empty string or undefined", () => {
          const user = new User();

          user.name = "Jane";
          expect(user).to.be.valid;
        });

        it("should error when field value is empty string or undefined", () => {
          const user = new User();

          expect(user).to.not.be.valid;

          user.name = "";
          expect(user).to.not.be.valid;
        });
      });

      describe("inheritance", function () {
        class Base {
          @any.optional()
          public name: string;
        }

        class User extends Base {
          @any.required()
          public name: string;
        }

        it("should pass when field value is not empty string or undefined", () => {
          const user = new User();

          user.name = "Jane";
          expect(user).to.be.valid;
        });

        it("should error when field value is empty string or undefined", () => {
          const user = new User();

          expect(user).to.not.be.valid;

          user.name = "";
          expect(user).to.not.be.valid;
        });
      });
    });

    describe("nullable type", function () {
      class User {
        @any.required()
        public name: string | null;
      }

      it("should pass when field value is not undefined", () => {
        const user = new User();

        user.name = "Jane";
        expect(user).to.be.valid;

        user.name = null;
        expect(user).to.be.valid;

        user.name = "";
        expect(user).to.be.valid;
      });

      it("should error when field value is empty string, null or undefined", () => {
        const user = new User();

        expect(user).to.not.be.valid;
      });
    });

    describe("non-nullable string type", function () {
      class User {
        @any.required()
        public name: string;
      }

      it("should pass when field value is not empty string or undefined", () => {
        const user = new User();

        user.name = "Jane";
        expect(user).to.be.valid;
      });

      it("should error when field value is empty string or undefined", () => {
        const user = new User();

        expect(user).to.not.be.valid;

        user.name = "";
        expect(user).to.not.be.valid;
      });
    });
  });

  describe("@any.optional decorator", function () {
    describe("optional overrides required", function () {
      describe("same class", function () {
        class User {
          @any.optional()
          @any.required()
          public name: string;
        }

        it("should pass when field value that is optional is undefined", () => {
          const user = new User();

          expect(user).to.be.valid;
        });
      });

      describe("inheritance", function () {
        class Base {
          @any.required()
          public name: string;
        }

        class User extends Base {
          @any.optional()
          public name: string;
        }

        it("should pass when field value that is optional is undefined", () => {
          const user = new User();

          expect(user).to.be.valid;
        });
      });
    });
  });

  describe("@any.nullable decorator", function () {
    describe("same class", function () {
      class User {
        @any.required()
        public id: number;

        @any.required()
        @any.nullable()
        public name: string | null;
      }

      it("should pass when nullable field value is null", () => {
        const user = new User();

        user.id = 0;
        user.name = null;
        expect(user).to.be.valid;
      });

      it("should error when non-nullable field value is null", () => {
        const user = new User();

        (user as unknown as (object & { id: null })).id = null;
        user.name = null;
        expect(user).to.not.be.valid;
      });
    });

    describe("inheritance", function () {
      class Base {
        @any.nullable()
        public id: number;
      }

      class User extends Base {
        @any.required()
        @any.nullable(false)
        public id: number;
      }

      it("should pass when field value is not null and false is passed to decorator", () => {
        const user = new User();

        user.id = 3;
        expect(user).to.be.valid;
      });

      it("should error when field value is null and false is passed to decorator", () => {
        const user = new User();

        (user as unknown as (object & { id: null })).id = null;
        expect(user).to.not.be.valid;
      });
    });
  });

  describe("@any.allow decorator", function () {
    enum RoleNames {
      Admin,
      Moderator,
      Viewer,
    }

    class User {
      @any.allow(RoleNames.Admin, RoleNames.Moderator)
      public role: RoleNames;
    }

    it("should pass when field value is part of value passed to decorator", () => {
      const user = new User();

      user.role = RoleNames.Admin;
      expect(user).to.be.valid;
    });

    it("should error when field value is not part of value passed to decorator", () => {
      const user = new User();

      user.role = RoleNames.Viewer;
      expect(user).to.not.be.valid;
    });
  });

  describe("@CustomSchema decorator", function () {
    describe("attribute decorator", function () {
      describe("Joi schema to override attribute schema", function () {
        class User {
          @Email()
          @CustomSchema(Joi.string().uri())
          public url: string;
        }

        it("should pass when field value passes constraint that is passed as Joi schema to decorator", () => {
          const user = new User();

          user.url = "http://example.com";
          expect(user).to.be.valid;
        });

        it("should error when field value does not pass constraint that is passed as Joi schema to decorator", () => {
          const user = new User();

          user.url = "hello@example.com";
          expect(user).to.not.be.valid;
        });
      });

      describe("Joi schema function to extend attribute schema", function () {
        class User {
          @any.required()
          @CustomSchema((j) => j.allow(""))
          public name: string;
        }

        it("should pass when field value passes constraint that is passed as Joi schema to decorator", () => {
          const user = new User();

          user.name = "";
          expect(user).to.be.valid;
        });
      });
    });
  });
});
