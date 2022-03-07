import { expect } from "../../helpers";

import Joi from "joi";
import { MetadataKeys } from "../../../src";
import { annotateClass } from "../../../src/helpers";

describe("annotateClass()", function () {
  class User {}

  it("should define reflect metadata object containing passed options as annotation", () => {
    const options = { allowUnknown: true };

    annotateClass(User, { options });
    expect(Reflect.getOwnMetadata(MetadataKeys.Fields, User)).to.include({ options });
  });

  it("should define reflect metadata object containing passed fields as annotation", () => {
    const fields = { "id": { integer: true }, "name": { nullable: true } };

    annotateClass(User, { fields });
    expect(Reflect.getOwnMetadata(MetadataKeys.Fields, User)).to.include({ fields });
  });

  it("should define reflect metadata object containing passed globalArgs as annotation", () => {
    const globalArgs = (j: Joi.Schema) => j.allow("");

    annotateClass(User, { globalArgs });
    expect(Reflect.getOwnMetadata(MetadataKeys.Fields, User)).to.include({ globalArgs });
  });
});
