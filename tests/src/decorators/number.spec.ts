import { expect } from "../../helpers";
import { number } from "../../../src/decorators";

describe("number attribute decorators", function () {
  describe("@number.integer decorator", function () {
    describe("same class", function () {
      class User {
        @number.integer()
        public code: number;
      }

      it("should pass when field value is not a floating point number", () => {
        const user = new User();

        user.code = 1;
        expect(user).to.be.valid;
      });

      it("should error when field value is a floating point number", () => {
        const user = new User();

        user.code = 0.1;
        expect(user).to.not.be.valid;

        user.code = -1.1;
        expect(user).to.not.be.valid;
      });
    });

    describe("inheritance", function () {
      class Base {
        @number.integer()
        public code: number;
      }

      class User extends Base {
        @number.integer(false)
        public code: number;
      }

      it("should pass when field value is a floating point number and false is passed to decorator", () => {
        const user = new User();

        user.code = 0.1;
        expect(user).to.be.valid;

        user.code = -1.1;
        expect(user).to.be.valid;
      });
    });
  });

  describe("@number.min decorator", function () {
    describe("inclusive case", function () {
      class User {
        @number.min(3)
        public code: number;
      }

      it("should pass when field value is greater than or equal to the value passed to the decorator", () => {
        const user = new User();

        user.code = 3;
        expect(user).to.be.valid;

        user.code = 4;
        expect(user).to.be.valid;
      });

      it("should error when field value is less than the value passed to the decorator", () => {
        const user = new User();

        user.code = 2;
        expect(user).to.not.be.valid;
      });
    });

    describe("exclusive case", function () {
      class User {
        @number.min({ value: 3, exclude: true })
        public code: number;
      }

      it("should pass when field value is greater the value passed to the decorator", () => {
        const user = new User();

        user.code = 4;
        expect(user).to.be.valid;
      });

      it("should error when field value is less than or equal to the value passed to the decorator", () => {
        const user = new User();

        user.code = 3;
        expect(user).to.not.be.valid;

        user.code = 2;
        expect(user).to.not.be.valid;
      });
    });
  });

  describe("@number.max decorator", function () {
    describe("inclusive case", function () {
      class User {
        @number.max(3)
        public code: number;
      }

      it("should pass when field value is less than or equal to the value passed to the decorator", () => {
        const user = new User();

        user.code = 3;
        expect(user).to.be.valid;

        user.code = 2;
        expect(user).to.be.valid;
      });

      it("should error when field value is greater than the value passed to the decorator", () => {
        const user = new User();

        user.code = 4;
        expect(user).to.not.be.valid;
      });
    });

    describe("exclusive case", function () {
      class User {
        @number.max({ value: 3, exclude: true })
        public code: number;
      }

      it("should pass when field value is less than the value passed to the decorator", () => {
        const user = new User();

        user.code = 2;
        expect(user).to.be.valid;
      });

      it("should error when field value is greater than or equal to the value passed to the decorator", () => {
        const user = new User();

        user.code = 3;
        expect(user).to.not.be.valid;

        user.code = 4;
        expect(user).to.not.be.valid;
      });
    });
  });

  describe("@number.positive decorator", function () {
    describe("same class", function () {
      class User {
        @number.positive()
        public code: number;
      }

      it("should pass when field value is greater than 0", () => {
        const user = new User();

        user.code = 1;
        expect(user).to.be.valid;
      });

      it("should error when field value is less than or equal to 0", () => {
        const user = new User();

        user.code = 0;
        expect(user).to.not.be.valid;

        user.code = -1;
        expect(user).to.not.be.valid;
      });
    });

    describe("inheritance", function () {
      class Base {
        @number.positive()
        public code: number;
      }

      class User extends Base {
        @number.positive(false)
        public code: number;
      }

      it("should pass when field value is less than or equal to 0 and false is passed to decorator", () => {
        const user = new User();

        user.code = 0;
        expect(user).to.be.valid;

        user.code = -1;
        expect(user).to.be.valid;
      });
    });
  });

  describe("@number.negative decorator", function () {
    describe("same class", function () {
      class User {
        @number.negative()
        public code: number;
      }

      it("should pass when field value is less than 0", () => {
        const user = new User();

        user.code = -1;
        expect(user).to.be.valid;
      });

      it("should error when field value is greater than or equal to 0", () => {
        const user = new User();

        user.code = 0;
        expect(user).to.not.be.valid;

        user.code = 1;
        expect(user).to.not.be.valid;
      });
    });

    describe("inheritance", function () {
      class Base {
        @number.negative()
        public code: number;
      }

      class User extends Base {
        @number.negative(false)
        public code: number;
      }

      it("should pass when field value is greater than or equal to 0 and false is passed to decorator", () => {
        const user = new User();

        user.code = 1;
        expect(user).to.be.valid;
      });
    });
  });
});
