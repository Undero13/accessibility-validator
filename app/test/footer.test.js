const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

describe("footer", () => {
  test("semantic footer not exist", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = new Parser(
      "<html><head><title>Title</title></head><body></body></html>"
    );

    validator.checkFooter(html.getElements("footer"));
    expect(validator.raport).toHaveLength(1);
  });

  test("footer valid", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = new Parser(
      "<html lang='es'><head><title>Title</title></head><body><footer>aaa</footer></body></html>"
    );

    validator.checkFooter(html.getElements("footer"));
    expect(validator.raport).toHaveLength(0);
  });
});
