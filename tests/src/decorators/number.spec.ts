import { expect } from "../../helpers";
import { klass, number } from "../../../src/decorators";

describe("number attribute decorators", function () {
  describe("@number.unsafe decorator", function () {
    describe("same class", function () {
      class User {
        @number.unsafe()
        public code: number;
      }

      it("should pass when field value is not an unsafe number", () => {
        const user = new User();

        user.code = Number("90071992547409924");
        expect(user).to.be.valid;
      });
    });

    describe("inheritance", function () {
      class Base {
        @number.unsafe()
        public code: number;
      }

      class User extends Base {
        @number.unsafe(false)
        public code: number;
      }

      it("should error when field value is an unsafe number and false is passed to decorator", () => {
        const user = new User();

        user.code = Number("90071992547409924");
        expect(user).to.not.be.valid;

        user.code = Number("-90071992547409924");
        expect(user).to.not.be.valid;
      });
    });
  });

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

  describe("@number.precision decorator", function () {
    describe("with convert validation option passed to class schema options", function () {
      @klass.schemaOptions({ convert: false })
      class User {
        @number.precision(3)
        public code: number;
      }

      it("should pass when number of decimal places of field value is less than or equal to the value passed to the decorator", () => {
        const user = new User();

        user.code = 3;
        expect(user).to.be.valid;

        user.code = 2.223;
        expect(user).to.be.valid;
      });

      it("should error when number of decimal places of field value greater than the value passed to the decorator", () => {
        const user = new User();

        user.code = 4.4444;
        expect(user).to.not.be.valid;
      });
    });

    describe("without convert validation option passed to class schema options", function () {
      class User {
        @number.precision(3)
        public code: number;
      }

      it("should pass when number of decimal places of field value is less than or equal to the value passed to the decorator", () => {
        const user = new User();

        user.code = 3;
        expect(user).to.be.valid;

        user.code = 2.223;
        expect(user).to.be.valid;
      });

      it("should pass when number of decimal places of field value greater than the value passed to the decorator", () => {
        const user = new User();

        user.code = 4.4444;
        expect(user).to.be.valid;
      });
    });
  });

  describe("@number.port decorator", function () {
    describe("same class", function () {
      class User {
        @number.port()
        public code: number;
      }

      it("should pass when field value is a TCP port", () => {
        const user = new User();

        user.code = 65535;
        expect(user).to.be.valid;
      });

      it("should error when field value is not a TCP port", () => {
        const user = new User();

        user.code = 655359;
        expect(user).to.not.be.valid;

        user.code = -1;
        expect(user).to.not.be.valid;
      });
    });

    describe("inheritance", function () {
      class Base {
        @number.port()
        public code: number;
      }

      class User extends Base {
        @number.port(false)
        public code: number;
      }

      it("should pass when field value is not a TCP port and false is passed to decorator", () => {
        const user = new User();

        user.code = 655359;
        expect(user).to.be.valid;

        user.code = -1;
        expect(user).to.be.valid;
      });
    });
  });

  describe("@number.min decorator", function () {
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

  describe("@number.max decorator", function () {
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

  describe("@number.positive decorator", function () {
    class User {
      @number.multipleOf(3)
      public code: number;
    }

    it("should pass when field field value is equal to the base passed to decorator", () => {
      const user = new User();

      user.code = 3;
      expect(user).to.be.valid;

      user.code = -6;
      expect(user).to.be.valid;
    });

    it("should error when field value is not a multiple of the base passed to decorator", () => {
      const user = new User();

      user.code = 5;
      expect(user).to.not.be.valid;

      user.code = -5;
      expect(user).to.not.be.valid;
    });
  });
});
