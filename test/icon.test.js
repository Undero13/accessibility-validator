const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

describe("icon", () => {
  test("wrong tag", () => {
    const validator = new SiteValidate("www.fakesite.com");
    const html = new Parser(
      "<html><head><title>Title</title></head><body><i class='icon'></i></body></html>"
    );

    validator.checkIcon(html.getElements("i"));
    expect(validator.raport).toHaveLength(1);
  });

  test("figure valid", () => {
    const validator = new SiteValidate("www.fakesite.com");
    const html = new Parser(
      "<html lang='es'><head><title>Title</title></head><body><span class='icon'></span></body></html>"
    );

    validator.checkIcon(html.getElements("i"));
    expect(validator.raport).toHaveLength(0);
  });
});
