const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

describe("table", () => {
  test("table dont have thead", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = new Parser(
      "<html><head><title>Title</title></head><body><table><tbody></tbody><tr><td>test<td></td></table></body></html>"
    );

    validator.checkTable(html.getElements("table"));
    expect(validator.raport).toHaveLength(1);
  });

  test("table valid", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = new Parser(
      "<html lang='es'><head><title>Title</title></head><body><table><thead><tr><th>test<th></td></tead><tbody><tr><td>test<td></td></tbody></table></body></html>"
    );

    validator.checkTable(html.getElements("table"));
    expect(validator.raport).toHaveLength(0);
  });
});
