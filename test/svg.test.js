const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

test("svg title not valid", () => {
  const html = new Parser("<html lang='es'><head></head><svg></svg></html>");

  const validator = new SiteValidate("www.fakesite.com");

  validator.checkSVG(html.getElements("svg"));
  expect(validator.raport).toHaveLength(1);
});

test("svg title valid", () => {
  const html = new Parser(
    "<html lang='es'><head></head><svg><title>title</title></svg></html>"
  );

  const validator = new SiteValidate("www.fakesite.com");

  validator.checkSVG(html.getElements("svg"));
  expect(validator.raport).toHaveLength(0);
});
