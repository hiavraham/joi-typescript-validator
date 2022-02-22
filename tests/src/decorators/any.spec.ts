import { expect } from "../../helpers";

import Joi from "joi";
import { any, string } from "../../../src/decorators";

describe("any attribute decorators", function () {
  describe("@any.required decorator", function () {
    describe("base", function () {
      describe("array type", function () {
        class User {
          @any.required()
          @Reflect.metadata("design:type", Array)
          public favoriteColors: string[] | null;
        }

        it("should pass when field value is array", () => {
          const user = new User();

          user.favoriteColors = [];
          expect(user).to.be.valid;

          user.favoriteColors = ["violet", "purple"];
          expect(user).to.be.valid;
        });

        it("should error when field value is null or undefined", () => {
          const user = new User();

          expect(user).to.not.be.valid;

          user.favoriteColors = null;
          expect(user).to.not.be.valid;
        });
      });

      describe("boolean type", function () {
        class User {
          @any.required()
          @Reflect.metadata("design:type", Boolean)
          public isAdmin: boolean | null;
        }

        it("should pass when field value is boolean", () => {
          const user = new User();

          user.isAdmin = true;
          expect(user).to.be.valid;

          user.isAdmin = false;
          expect(user).to.be.valid;
        });

        it("should error when field value is null or undefined", () => {
          const user = new User();

          expect(user).to.not.be.valid;

          user.isAdmin = null;
          expect(user).to.not.be.valid;
        });
      });

      describe("date type", function () {
        class User {
          @any.required()
          @Reflect.metadata("design:type", Date)
          public createdAt: Date | null;
        }

        it("should pass when field value is date", () => {
          const user = new User();

          user.createdAt = new Date();
          expect(user).to.be.valid;
        });

        it("should error when field value is null or undefined", () => {
          const user = new User();

          expect(user).to.not.be.valid;

          user.createdAt = null;
          expect(user).to.not.be.valid;
        });
      });

      describe("number type", function () {
        class User {
          @any.required()
          @Reflect.metadata("design:type", Number)
          public code: number | null;
        }

        it("should pass when field value is number", () => {
          const user = new User();

          user.code = 0;
          expect(user).to.be.valid;

          user.code = 1;
          expect(user).to.be.valid;
        });

        it("should error when field value is null or undefined", () => {
          const user = new User();

          expect(user).to.not.be.valid;

          user.code = null;
          expect(user).to.not.be.valid;
        });
      });

      describe("object type", function () {
        class Vehicle {}

        class User {
          @any.required()
          @Reflect.metadata("design:type", Vehicle)
          public vehicle: Vehicle | null;
        }

        it("should pass when field value is object", () => {
          const user = new User();

          user.vehicle = new Vehicle();
          expect(user).to.be.valid;
        });

        it("should error when field value is null or undefined", () => {
          const user = new User();

          expect(user).to.not.be.valid;

          user.vehicle = null;
          expect(user).to.not.be.valid;
        });
      });

      describe("string type", function () {
        class User {
          @any.required()
          @Reflect.metadata("design:type", String)
          public name: string | null;
        }

        it("should pass when field value is string of length greater than 0", () => {
          const user = new User();

          user.name = "Jane";
          expect(user).to.be.valid;
        });

        it("should error when field value is an empty string, null or undefined", () => {
          const user = new User();

          expect(user).to.not.be.valid;

          user.name = null;
          expect(user).to.not.be.valid;

          user.name = "";
          expect(user).to.not.be.valid;
        });
      });
    });

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

  describe("@any.customSchema decorator", function () {
    describe("attribute decorator", function () {
      describe("Joi schema to override attribute schema", function () {
        class User {
          @string.email()
          @any.customSchema(Joi.string().uri())
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
          @any.customSchema((j) => j.allow(""))
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
