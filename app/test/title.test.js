const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

const validator = new SiteValidate("www.fakesite.com", true);

test("valid title", () => {
  const html = new Parser(
    "<html lang='es'><head><title>title-fakesite</title></head></html>"
  );
  validator.checkTitle(html.getHeadTitle(), "fakesite");
  expect(validator.raport).toHaveLength(0);
});

test("invalid title", () => {
  const html = new Parser(
    "<html lang='es'><head><title>title</title></head></html>"
  );
  validator.checkTitle(html.getHeadTitle(), "fakesite");
  expect(validator.raport).toHaveLength(1);
});
