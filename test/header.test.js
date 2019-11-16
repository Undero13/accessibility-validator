const SiteValidate = require("../class/SiteValidate");

describe("header", () => {
  test("hierarchy and repeatability", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const headers = {
      h1: {
        el: ""
      },
      h2: {
        el: "<h2>header2</h2>"
      },
      h3: {
        el: ""
      },
      h4: {
        el: "<h4>header4</h4>"
      },
      h5: {
        el: "<h5>header5</h5>"
      },
      h6: {
        el: "<h6>header6</h6>"
      }
    };
    validator.checkHeaders(
      headers.h1,
      headers.h2,
      headers.h3,
      headers.h4,
      headers.h5,
      headers.h6
    );

    expect(validator.raport).toHaveLength(2);
  });

  test("hierarchy valid", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const headers = {
      h1: {
        el: "<h1>header1</h1>"
      },
      h2: {
        el: "<h2>header2</h2>"
      },
      h3: {
        el: "<h3>header3</h3>"
      },
      h4: {
        el: "<h4>header4</h4>"
      },
      h5: {
        el: "<h5>header5</h5>"
      },
      h6: {
        el: "<h6>header6</h6>"
      }
    };
    validator.checkHeaders(
      headers.h1,
      headers.h2,
      headers.h3,
      headers.h4,
      headers.h5,
      headers.h6
    );

    expect(validator.raport).toHaveLength(0);
  });
});
