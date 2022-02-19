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

  describe("@string.alphanum decorator", function () {
    describe("same class", function () {
      class User {
        @string.alphanum()
        public email: string;
      }

      it("should pass when field value is alphanumeric", () => {
        const user = new User();

        user.email = "joi";
        expect(user).to.be.valid;
      });

      it("should error when field value is not alphanumeric", () => {
        const user = new User();

        user.email = "%####$";
        expect(user).to.not.be.valid;
      });
    });

    describe("inheritance", function () {
      class Base {
        @string.alphanum()
        public email: string;
      }

      class User extends Base {
        @string.alphanum(false)
        public email: string;
      }

      it("should pass when field value is not alphanumeric and false is passed to decorator", () => {
        const user = new User();

        user.email = "%####$";
        expect(user).to.be.valid;
      });
    });
  });

  describe("@string.token decorator", function () {
    describe("same class", function () {
      class User {
        @string.token()
        public username: string;
      }

      it("should pass when field value contains only alphabetic and underscore characters", () => {
        const user = new User();

        user.username = "joi";
        expect(user).to.be.valid;

        user.username = "_joi";
        expect(user).to.be.valid;
      });

      it("should error when field value does not contain only alphabetic and underscore characters", () => {
        const user = new User();

        user.username = "%####$";
        expect(user).to.not.be.valid;
      });
    });

    describe("inheritance", function () {
      class Base {
        @string.token()
        public username: string;
      }

      class User extends Base {
        @string.token(false)
        public username: string;
      }

      it("should pass when field value does not contain only alphabetic and underscore characters and false is passed to decorator", () => {
        const user = new User();

        user.username = "%####$";
        expect(user).to.be.valid;
      });
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

  describe("@string.isoDate decorator", function () {
    describe("same class", function () {
      class User {
        @string.isoDate()
        public createdAt: string;
      }

      it("should pass when field value is of ISO 8601 date format", () => {
        const user = new User();

        user.createdAt = new Date().toISOString();
        expect(user).to.be.valid;
      });

      it("should error when field value is not of ISO 8601 date format", () => {
        const user = new User();

        user.createdAt = new Date().toDateString();
        expect(user).to.not.be.valid;
      });
    });

    describe("inheritance", function () {
      class Base {
        @string.isoDate()
        public createdAt: string;
      }

      class User extends Base {
        @string.isoDate(false)
        public createdAt: string;
      }

      it("should pass when field value is not of ISO 8601 date format and false is passed to decorator", () => {
        const user = new User();

        user.createdAt = new Date().toDateString();
        expect(user).to.be.valid;
      });
    });
  });

  describe("@string.isoDuration decorator", function () {
    describe("same class", function () {
      class User {
        @string.isoDuration()
        public duration: string;
      }

      it("should pass when field value is of ISO 8601 duration format", () => {
        const user = new User();

        user.duration = "PT40S";
        expect(user).to.be.valid;
      });

      it("should error when field value is not of ISO 8601 duration format", () => {
        const user = new User();

        user.duration = new Date().toDateString();
        expect(user).to.not.be.valid;
      });
    });

    describe("inheritance", function () {
      class Base {
        @string.isoDuration()
        public duration: string;
      }

      class User extends Base {
        @string.isoDuration(false)
        public duration: string;
      }

      it("should pass when field value is not of ISO 8601 duration format and false is passed to decorator", () => {
        const user = new User();

        user.duration = new Date().toDateString();
        expect(user).to.be.valid;
      });
    });
  });

  describe("@string.creditCard decorator", function () {
    describe("same class", function () {
      class User {
        @string.creditCard()
        public creditCard: string;
      }

      it("should pass when field value is a valid credit card number", () => {
        const user = new User();

        user.creditCard = "378734493671000";
        expect(user).to.be.valid;

        user.creditCard = "5610591081018250";
        expect(user).to.be.valid;

        user.creditCard = "5019717010103742";
        expect(user).to.be.valid;

        user.creditCard = "6011000990139424";
        expect(user).to.be.valid;
      });

      it("should error when field value is not a valid credit card number", () => {
        const user = new User();

        user.creditCard = "XXXXXXXXXXXXXXXX";
        expect(user).to.not.be.valid;

        user.creditCard = "4111111111111112";
        expect(user).to.not.be.valid;
      });
    });

    describe("inheritance", function () {
      class Base {
        @string.creditCard()
        public creditCard: string;
      }

      class User extends Base {
        @string.creditCard(false)
        public creditCard: string;
      }

      it("should pass when field value is not a valid credit card number and false is passed to decorator", () => {
        const user = new User();

        user.creditCard = "XXXXXXXXXXXXXXXX";
        expect(user).to.be.valid;
      });
    });
  });
});
