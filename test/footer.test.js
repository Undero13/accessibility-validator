const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

const validator = new SiteValidate("www.fakesite.com");

test("semantic footer not exist", () => {
  const html = new Parser(
    "<html><head><title>Title</title></head><body></body></html>"
  );
  expect(validator.checkFooter(html.getElements("footer"))).not.toBeTruthy();
});

test("footer valid", () => {
  const html = new Parser(
    "<html lang='es'><head><title>Title</title></head><body><footer>aaa</footer></body></html>"
  );
  expect(validator.checkFooter(html.getElements("footer"))).toBeTruthy();
});
