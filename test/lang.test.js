const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

const validator = new SiteValidate("www.fakesite.com");

test("not valid lang", () => {
  const html = new Parser("<html><head><title>Title</title></head></html>");
  expect(validator.checkLang(html.getElements("html"))).not.toBeTruthy();
});

test("valid lang", () => {
  const html = new Parser(
    "<html lang='es'><head><title>Title</title></head></html>"
  );
  expect(validator.checkLang(html.getElements("html"))).toBeTruthy();
});
