import { expect } from "chai";
import { date } from "../../../src/decorators";

describe("date attribute decorators", function () {
  describe("@date.format decorator", function () {
    describe("default format", function () {
      class User {
        @date.format()
        public createdAt: string;
      }

      it("should pass when field value is of default (YYYY-MM-DD) date format", () => {
        const user = new User();

        user.createdAt = "1913-12-20";
        expect(user).to.be.valid;
      });

      it("should error when field value is not of default (YYYY-MM-DD) date format", () => {
        const user = new User();

        user.createdAt = "1913-20-12";
        expect(user).to.not.be.valid;
      });
    });

    describe("custom format", function () {
      class User {
        @date.format("YYYY-DD-MM")
        public createdAt: string;
      }

      it("should pass when field value is of format passed to the decorator", () => {
        const user = new User();

        user.createdAt = "1913-20-12";
        expect(user).to.be.valid;
      });

      it("should error when field value is not of format passed to the decorator", () => {
        const user = new User();

        user.createdAt = "1913-12-20";
        expect(user).to.not.be.valid;
      });
    });
  });
});
