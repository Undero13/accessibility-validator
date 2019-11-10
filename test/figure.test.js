const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

describe("figure", () => {
  test("figure dont have figcaption", () => {
    const validator = new SiteValidate("www.fakesite.com");
    const html = new Parser(
      "<html><head><title>Title</title></head><body><figure></figue></body></html>"
    );

    validator.checkFigure(html.getElements("figure"));
    expect(validator.raport).toHaveLength(1);
  });

  test("figure valid", () => {
    const validator = new SiteValidate("www.fakesite.com");
    const html = new Parser(
      "<html lang='es'><head><title>Title</title></head><body><figure><figcaption>dada</figcaption></figue></body></html>"
    );

    validator.checkFigure(html.getElements("figure"));
    expect(validator.raport).toHaveLength(0);
  });
});
