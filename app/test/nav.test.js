const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

describe("navbar", () => {
  test("semantic nav not exist", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = new Parser(
      "<html><head><title>Title</title></head><body></body></html>"
    );

    validator.checkNav(html.getElements("nav"));
    expect(validator.raport).toHaveLength(1);
  });

  test("nav exist but elements is not list", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = new Parser(
      "<html><head><title>Title</title></head><body><nav></nav></body></html>"
    );

    validator.checkNav(html.getElements("nav"));
    expect(validator.raport).toHaveLength(1);
  });

  test("nav valid", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = new Parser(
      "<html lang='es'><head><title>Title</title></head><body><nav><ul><li>item1</li></ul></nav></body></html>"
    );

    validator.checkNav(html.getElements("nav"));
    expect(validator.raport).toHaveLength(0);
  });
});
