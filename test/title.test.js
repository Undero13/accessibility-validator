const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

const validator = new SiteValidate("www.fakesite.com");

test("valid title", () => {
  const html = new Parser(
    "<html lang='es'><head><title>title</title></head></html>"
  );
  validator.checkTitle(html.getHeadTitle());
  expect(validator.raport).toHaveLength(0);
});
