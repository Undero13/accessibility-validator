const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

describe("image", () => {
  test("missing alt", () => {
    const validator = new SiteValidate("www.fakesite.com");
    const html = new Parser(
      "<html><head><title>Title</title></head><body><img src='image.jpg'></body></html>"
    );

    validator.checkImages(html.getElements("img"));
    expect(validator.raport).toHaveLength(1);
  });

  test("image valid", () => {
    const validator = new SiteValidate("www.fakesite.com");
    const html = new Parser(
      "<html lang='es'><head><title>Title</title></head><body><img src='image.jpg' alt='image'></body></html>"
    );

    validator.checkImages(html.getElements("img"));
    expect(validator.raport).toHaveLength(0);
  });
});
