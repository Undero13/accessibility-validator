const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

describe("footer", () => {
  test("semantic footer not exist", () => {
    const validator = new SiteValidate("www.fakesite.com");
    const html = new Parser(
      "<html><head><title>Title</title></head><body></body></html>"
    );

    const expectObj = [
      {
        what: "stopka",
        category: "semantic",
        type: "warning",
        message: "Brak semantycznej tagu <footer>"
      }
    ];

    validator.checkFooter(html.getElements("footer"));
    expect(validator.raport).toEqual(expectObj);
  });

  test("footer valid", () => {
    const validator = new SiteValidate("www.fakesite.com");
    const html = new Parser(
      "<html lang='es'><head><title>Title</title></head><body><footer>aaa</footer></body></html>"
    );
    const expectObj = [];

    validator.checkFooter(html.getElements("footer"));
    expect(validator.raport).toEqual(expectObj);
  });
});
