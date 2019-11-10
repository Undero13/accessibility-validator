const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

describe("navbar", () => {
  test("semantic nav not exist", () => {
    const validator = new SiteValidate("www.fakesite.com");
    const html = new Parser(
      "<html><head><title>Title</title></head><body></body></html>"
    );

    const expectObj = [
      {
        what: "nawigacja",
        category: "semantic",
        type: "warning",
        message: "Brak semantycznego tagu <nav> na stronie!"
      }
    ];

    validator.checkNav(html.getElements("nav"));
    expect(validator.raport).toEqual(expectObj);
  });

  test("nav exist but elements is not list", () => {
    const validator = new SiteValidate("www.fakesite.com");
    const html = new Parser(
      "<html><head><title>Title</title></head><body><nav></nav></body></html>"
    );

    const expectObj = [
      {
        what: "nawigacja lista",
        category: "semantic",
        type: "warning",
        message: "Elementy w navbarze powinny być listą"
      }
    ];

    validator.checkNav(html.getElements("nav"));
    expect(validator.raport).toEqual(expectObj);
  });

  test("nav valid", () => {
    const validator = new SiteValidate("www.fakesite.com");
    const html = new Parser(
      "<html lang='es'><head><title>Title</title></head><body><nav><ul><li>item1</li></ul></nav></body></html>"
    );
    const expectObj = [];

    validator.checkNav(html.getElements("nav"));
    expect(validator.raport).toEqual(expectObj);
  });
});
