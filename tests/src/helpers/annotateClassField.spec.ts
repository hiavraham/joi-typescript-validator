import { expect } from "../../helpers";

import { any, klass, string } from "../../../src/decorators";
import { annotateClassField, getClassOwnMetadata } from "../../../src/helpers";
import { ClassMetadata } from "../../../src/types";

describe("annotateClassField()", function () {
  it("should attach field metadata to class own metadata when field is defined", () => {
    class User {
      public code: string;
    }

    const expected: ClassMetadata = {
      fields: {
        code: { designType: undefined, alphanum: true },
      },
    };

    annotateClassField(User.prototype, "code", { alphanum: true });
    expect(getClassOwnMetadata(User)).to.be.eql(expected);
  });

  it("should attach field metadata to class own metadata when field is undefined", () => {
    class User {}

    const expected: ClassMetadata = {
      fields: {
        code: { designType: undefined, alphanum: true },
      },
    };

    annotateClassField(User.prototype, "code", { alphanum: true });
    expect(getClassOwnMetadata(User)).to.be.eql(expected);
  });

  it("should attach field metadata to class own metadata when field is decorated", () => {
    class User {
      @any.required()
      public code: string;
    }

    const expected: ClassMetadata = {
      fields: {
        code: { designType: String, required: true, alphanum: true },
      },
    };

    annotateClassField(User.prototype, "code", { alphanum: true });
    expect(getClassOwnMetadata(User)).to.be.eql(expected);
  });

  it("should attach field metadata to class own metadata when field is decorated with same rule", () => {
    class User {
      @string.alphanum()
      public code: string;
    }

    const expected: ClassMetadata = {
      fields: {
        code: { designType: String, alphanum: false },
      },
    };

    annotateClassField(User.prototype, "code", { alphanum: false });
    expect(getClassOwnMetadata(User)).to.be.eql(expected);
  });

  it("should attach field metadata to class own metadata when class is decorated", () => {
    @klass.schemaOptions({ allowUnknown: true })
    class User {}

    const expected: ClassMetadata = {
      fields: {
        code: { designType: undefined, alphanum: true },
      },
      options: {
        allowUnknown: true,
      },
    };

    annotateClassField(User.prototype, "code", { alphanum: true });
    expect(getClassOwnMetadata(User)).to.be.eql(expected);
  });

  it("should attach field metadata to class own metadata when class extends another decorated class", () => {
    @klass.schemaOptions({ allowUnknown: true })
    class Base {
      @any.required()
      public id: number;
    }

    class User extends Base {}

    const expected: ClassMetadata = {
      fields: {
        code: { designType: undefined, alphanum: true },
      },
    };

    annotateClassField(User.prototype, "code", { alphanum: true });
    expect(getClassOwnMetadata(User)).to.be.eql(expected);
  });
});
