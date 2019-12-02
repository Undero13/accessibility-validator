const checkLinksAndButtons = require('../compile/controllers/checkers/linksAndButtonsChecker')

describe('buttons', () => {
  test('button aria and tabindex', () => {
    const elements = {
      link: [
        {
          el: '<a href="/link" aria-label="" tabindex="-1">test</a>',
          correctFocus: true,
          textContent: 'test',
        },
      ],
      button: [
        {
          el: '<button aria-label="" tabindex="-1">test2</button>',
          correctFocus: true,
          textContent: 'test2',
        },
      ],
    };

    expect(checkLinksAndButtons.default(elements)).toHaveLength(4)
  });

  test('Empty textContent', () => {
    const elements = {
      link: [
        {
          el: '<a href="/link"></a>',
          correctFocus: true,
          textContent: '',
        },
      ],
      button: [
        {
          el: '<button></button>',
          correctFocus: true,
          textContent: '',
        },
      ],
    };

    expect(checkLinksAndButtons.default(elements)).toHaveLength(2);
  });

  test('Not valid focus', () => {
    const elements = {
      link: [
        {
          el: '<a href="/link">test1</a>',
          correctFocus: false,
          textContent: 'test1',
        },
      ],
      button: [
        {
          el: '<button>test2</button>',
          correctFocus: false,
          textContent: 'test2',
        },
      ],
    };

    expect(checkLinksAndButtons.default(elements)).toHaveLength(2);
  });

  test('button valid', () => {
    const elements = {
      link: [
        {
          el: '<a href="/link">test1</a>',
          correctFocus: true,
          textContent: 'test1',
        },
      ],
      button: [
        {
          el: '<button>test2</button>',
          correctFocus: true,
          textContent: 'test2',
        },
      ],
    };

    expect(checkLinksAndButtons.default(elements)).toHaveLength(0);
  });
});
