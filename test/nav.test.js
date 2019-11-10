const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

const validator = new SiteValidate("www.fakesite.com");

test("semantic nav not exist", () => {
  const html = new Parser(
    "<html><head><title>Title</title></head><body></body></html>"
  );
  expect(validator.checkNav(html.getElements("nav"))).not.toBeTruthy();
});

test("nav exist but elements is not list", () => {
  const html = new Parser(
    "<html><head><title>Title</title></head><body><nav></nav></body></html>"
  );
  expect(validator.checkNav(html.getElements("nav"))).not.toBeTruthy();
});

test("nav valid", () => {
  const html = new Parser(
    "<html lang='es'><head><title>Title</title></head><body><nav><ul><li>item1</li></ul></nav></body></html>"
  );
  expect(validator.checkNav(html.getElements("nav"))).toBeTruthy();
});
