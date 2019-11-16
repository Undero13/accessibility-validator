const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

describe("main", () => {
  test("main not exist", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = new Parser(
      "<html><head><title>Title</title></head><body></body></html>"
    );

    validator.checkMain(html.getElements("main"));
    expect(validator.raport).toHaveLength(1);
  });

  test("main valid", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = new Parser(
      "<html lang='es'><head><title>Title</title></head><body><main>aaa</main></body></html>"
    );

    validator.checkMain(html.getElements("main"));
    expect(validator.raport).toHaveLength(0);
  });
});
