import { expect } from "../../helpers";
import { Email, MaxLength, MinLength, NotEmpty } from "../../../src";

describe("String attribute type decorators", function () {
  describe("@Email decorator", function () {
    class User {
      @Email()
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

  describe("@NotEmpty decorator", function () {
    class User {
      @NotEmpty()
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

  describe("@MinLength decorator", function () {
    class User {
      @MinLength(5)
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

  describe("@MaxLength decorator", function () {
    class User {
      @MaxLength(6)
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
});
