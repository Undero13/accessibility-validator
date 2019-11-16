const SiteValidate = require("../class/SiteValidate");

describe("input", () => {
  test("button aria and tabindex", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const elements = [
      [
        {
          el: '<a href="/link" aria-label="" tabindex="-1">test</a>',
          correctFocus: true,
          textContent: "test"
        }
      ],
      [
        {
          el: '<button aria-label="" tabindex="-1">test2</button>',
          correctFocus: true,
          textContent: "test2"
        }
      ]
    ];

    validator.checkLinksAndButtons([elements[0], elements[1]]);
    expect(validator.raport).toHaveLength(4);
  });

  test("Empty textContent", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const elements = [
      [
        {
          el: '<a href="/link"></a>',
          correctFocus: true,
          textContent: ""
        }
      ],
      [
        {
          el: "<button></button>",
          correctFocus: true,
          textContent: ""
        }
      ]
    ];

    validator.checkLinksAndButtons([elements[0], elements[1]]);
    expect(validator.raport).toHaveLength(2);
  });

  test("Not valid focus", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const elements = [
      [
        {
          el: '<a href="/link">test1</a>',
          correctFocus: false,
          textContent: "test1"
        }
      ],
      [
        {
          el: "<button>test2</button>",
          correctFocus: false,
          textContent: "test2"
        }
      ]
    ];

    validator.checkLinksAndButtons([elements[0], elements[1]]);
    expect(validator.raport).toHaveLength(2);
  });

  test("button valid", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const elements = [
      [
        {
          el: '<a href="/link">test1</a>',
          correctFocus: true,
          textContent: "test1"
        }
      ],
      [
        {
          el: "<button>test2</button>",
          correctFocus: true,
          textContent: "test2"
        }
      ]
    ];

    validator.checkLinksAndButtons([elements[0], elements[1]]);
    expect(validator.raport).toHaveLength(0);
  });
});
