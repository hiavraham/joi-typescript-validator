import { expect } from "../../helpers";
import { array } from "../../../src/decorators";

describe("array attribute decorators", function () {
  describe("@array.itemType decorator", function () {
    class User {
      @array.itemType(String)
      public favoriteColors: unknown[];
    }

    it("should pass when array field values are of the type passed to the decorator", () => {
      const user = new User();

      user.favoriteColors = ["blue", "red"];
      expect(user).to.be.valid;
    });

    it("should error when array field values are not of the type passed to the decorator", () => {
      const user = new User();

      user.favoriteColors = [Symbol("blue"), "red"];
      expect(user).to.not.be.valid;

      user.favoriteColors = [Symbol("blue"), 3];
      expect(user).to.not.be.valid;
    });
  });

  describe("@array.notEmpty decorator", function () {
    class User {
      @array.notEmpty()
      public favoriteColors: string[];
    }

    it("should pass when field value length is greater than 0", () => {
      const user = new User();

      user.favoriteColors = ["blue"];
      expect(user).to.be.valid;
    });

    it("should error when field value length is 0", () => {
      const user = new User();

      user.favoriteColors = [];
      expect(user).to.not.be.valid;
    });
  });

  describe("@array.maxLength decorator", function () {
    class User {
      @array.maxLength(5)
      public favoriteColors: string[];
    }

    it("should pass when field value length is less than or equal to the value passed to the decorator", () => {
      const user = new User();

      user.favoriteColors = ["blue", "red", "cyan", "yellow", "white"];
      expect(user).to.be.valid;

      user.favoriteColors = ["blue", "red", "cyan", "yellow"];
      expect(user).to.be.valid;
    });

    it("should error when field value length is greater than the value passed to the decorator", () => {
      const user = new User();

      user.favoriteColors = ["blue", "red", "cyan", "yellow", "white", "black"];
      expect(user).to.not.be.valid;
    });
  });

  describe("@array.minLength decorator", function () {
    class User {
      @array.minLength(3)
      public favoriteColors: string[];
    }

    it("should pass when field value length is greater than or equal to the value passed to the decorator", () => {
      const user = new User();

      user.favoriteColors = ["blue", "red", "cyan"];
      expect(user).to.be.valid;

      user.favoriteColors = ["blue", "red", "cyan", "yellow"];
      expect(user).to.be.valid;
    });

    it("should error when field value length is less than the value passed to the decorator", () => {
      const user = new User();

      user.favoriteColors = ["blue", "red"];
      expect(user).to.not.be.valid;
    });
  });
});
