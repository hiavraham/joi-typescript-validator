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

  describe("@date.max decorator", function () {
    describe("Date type", function () {
      class User {
        @date.max("now")
        public createdAt: Date;
      }

      it("should pass when field value is less than or equal to the value passed to the decorator", () => {
        const user = new User();

        user.createdAt = new Date();
        expect(user).to.be.valid;

        const date = new Date();
        date.setSeconds(date.getSeconds() - 60);

        user.createdAt = date;
        expect(user).to.be.valid;
      });

      it("should error when field value is greater than the value passed to the decorator", () => {
        const user = new User();

        const date = new Date();
        date.setSeconds(date.getSeconds() + 60);

        user.createdAt = date;
        expect(user).to.not.be.valid;
      });
    });

    describe("string type", function () {
      class User {
        @date.max(new Date ("09-11-1989"))
        public createdAt: string;
      }

      it("should pass when field value is less than or equal to the value passed to the decorator", () => {
        const user = new User();

        user.createdAt = "09-11-1989";
        expect(user).to.be.valid;

        user.createdAt = "06-11-1989";
        expect(user).to.be.valid;
      });

      it("should error when field value is greater than the value passed to the decorator", () => {
        const user = new User();

        user.createdAt = new Date().toString();
        expect(user).to.not.be.valid;
      });
    });
  });
});
