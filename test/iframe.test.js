const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

test("iframe not valid", () => {
  const html = new Parser(
    "<html lang='es'><head></head><iframe></iframe></html>"
  );

  const validator = new SiteValidate("www.fakesite.com", true);

  validator.checkIframe(html.getElements("iframe"));
  expect(validator.raport).toHaveLength(1);
});

test("iframe title valid", () => {
  const html = new Parser(
    "<html lang='es'><head></head><iframe title='test'></iframe></html>"
  );

  const validator = new SiteValidate("www.fakesite.com", true);

  validator.checkIframe(html.getElements("iframe"));
  expect(validator.raport).toHaveLength(0);
});
