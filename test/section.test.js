const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

describe("section", () => {
  test("section dont have header", () => {
    const validator = new SiteValidate("www.fakesite.com");
    const html = new Parser(
      "<html><head><title>Title</title></head><body><section></section></body></html>"
    );

    validator.checkSection(html.getElements("section"));
    expect(validator.raport).toHaveLength(1);
  });

  test("section valid", () => {
    const validator = new SiteValidate("www.fakesite.com");
    const html = new Parser(
      "<html lang='es'><head><title>Title</title></head><body><section><h2>aaaa</h2></section></body></html>"
    );

    validator.checkSection(html.getElements("section"));
    expect(validator.raport).toHaveLength(0);
  });
});
