const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

describe("lang", () => {
  test("not valid lang", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = new Parser("<html><head><title>Title</title></head></html>");

    const expectObj = [
      {
        what: "język",
        category: "general",
        type: "error",
        message: "Brak określonego atrybutu lang"
      }
    ];

    validator.checkLang(html.getElements("html"));
    expect(validator.raport).toEqual(expectObj);
  });

  test("valid lang", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = new Parser(
      "<html lang='es'><head><title>Title</title></head></html>"
    );

    validator.checkLang(html.getElements("html"));
    expect(validator.raport).toHaveLength(0);
  });
});
