const SiteValidate = require("../class/SiteValidate");

describe("popup", () => {
  test("popup dont have tabindex", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = '<div role="dialog">I am modal!</div>';

    validator.checkPopup({ el: html });
    expect(validator.raport).toHaveLength(1);
  });

  test("popup have invalid tabindex", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = '<div tabindex="-1" role="dialog">I am modal!</div>';

    validator.checkPopup({ el: html });
    expect(validator.raport).toHaveLength(1);
  });

  test("popup dont have role", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = '<div tabindex="5">I am modal!</div>';

    validator.checkPopup({ el: html });
    expect(validator.raport).toHaveLength(1);
  });

  test("popup have invalid role", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = '<div role="alert" tabindex="5">I am modal!</div>';

    validator.checkPopup({ el: html });
    expect(validator.raport).toHaveLength(1);
  });

  test("popup valid", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = '<div role="document" tabindex="5">I am modal!</div>';

    validator.checkPopup({ el: html });
    expect(validator.raport).toHaveLength(0);
  });
});
