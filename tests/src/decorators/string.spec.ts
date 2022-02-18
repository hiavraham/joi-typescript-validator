import { expect } from "../../helpers";
import { string } from "../../../src/decorators";

describe("string attribute decorators", function () {
  describe("@string.notEmpty decorator", function () {
    class User {
      @string.notEmpty()
      public tag: string;
    }

    it("should pass when field value length is greater than 0", () => {
      const user = new User();

      user.tag = "Section A";
      expect(user).to.be.valid;
    });

    it("should error when field value length is 0", () => {
      const user = new User();

      user.tag = "";
      expect(user).to.not.be.valid;
    });
  });

  describe("@string.maxLength decorator", function () {
    class User {
      @string.maxLength(6)
      public tag: string;
    }

    it("should pass when field value length is less than or equal to the value passed to the decorator", () => {
      const user = new User();

      user.tag = "SEC-55";
      expect(user).to.be.valid;

      user.tag = "SEC-5";
      expect(user).to.be.valid;
    });

    it("should error when field value length is greater than the value passed to the decorator", () => {
      const user = new User();

      user.tag = "SEC-555";
      expect(user).to.not.be.valid;
    });
  });

  describe("@string.minLength decorator", function () {
    class User {
      @string.minLength(5)
      public tag: string;
    }

    it("should pass when field value length is greater than or equal to the value passed to the decorator", () => {
      const user = new User();

      user.tag = "SEC-5";
      expect(user).to.be.valid;

      user.tag = "SEC-555";
      expect(user).to.be.valid;
    });

    it("should error when field value length is less than the value passed to the decorator", () => {
      const user = new User();

      user.tag = "SE-5";
      expect(user).to.not.be.valid;
    });
  });

  describe("@string.email decorator", function () {
    describe("same class", function () {
      class User {
        @string.email()
        public email: string;
      }

      it("should pass when field value is of correct email format", () => {
        const user = new User();

        user.email = "hello@example.com";
        expect(user).to.be.valid;
      });

      it("should error when field value is not of correct email format", () => {
        const user = new User();

        user.email = "lorem";
        expect(user).to.not.be.valid;
      });
    });

    describe("inheritance", function () {
      class Base {
        @string.email()
        public email: string;
      }

      class User extends Base {
        @string.email(false)
        public email: string;
      }

      it("should pass when field value is not of correct email format and false is passed to decorator", () => {
        const user = new User();

        user.email = "lorem";
        expect(user).to.be.valid;
      });
    });
  });
});
