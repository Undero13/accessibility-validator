const SiteValidate = require("../class/SiteValidate");

describe("input", () => {
  test("missing input label and missing focus", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const input = {
      inputLabel: false,
      correctFocus: false
    };

    validator.checkInputs([input]);
    expect(validator.raport).toHaveLength(2);
  });

  test("input valid", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const input = {
      inputLabel: true,
      correctFocus: true
    };

    validator.checkInputs([input]);
    expect(validator.raport).toHaveLength(0);
  });
});
