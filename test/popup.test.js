const checkPopup = require('../compile/controllers/checkers/popupChecker')

describe('popup', () => {
  test('popup dont have tabindex', () => {
    const html = { potentialModal: { el: '<div role="dialog">I am modal!</div>' } };

    expect(checkPopup.default(html)).toHaveLength(1);
  });

  test('popup have invalid tabindex', () => {
    const html = { potentialModal: { el: '<div tabindex="-1" role="dialog">I am modal!</div>' } };

    expect(checkPopup.default(html)).toHaveLength(1);
  });

  test('popup dont have role', () => {
    const html = { potentialModal: { el: '<div tabindex="5">I am modal!</div>' } };

    expect(checkPopup.default(html)).toHaveLength(1);
  });

  test('popup have invalid role', () => {
    const html = { potentialModal: { el: '<div role="alert" tabindex="5">I am modal!</div>' } };

    expect(checkPopup.default(html)).toHaveLength(1);
  });

  test('popup valid', () => {
    const html = { potentialModal: { el: '<div role="document" tabindex="5">I am modal!</div>' } };

    expect(checkPopup.default(html)).toHaveLength(0);
  });
});
