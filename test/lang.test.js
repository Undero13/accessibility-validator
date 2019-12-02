const checkLang = require('../compile/controllers/checkers/langChecker')

describe('lang', () => {
  test('not valid lang', () => {
    const html = { DOM: '<html><head><title>Title</title></head></html>' };

    expect(checkLang.default(html)).toHaveLength(1);
  });

  test('valid lang', () => {
    const html = { DOM: "<html lang='es'><head><title>Title</title></head></html>" }


    expect(checkLang.default(html)).toHaveLength(0);
  });
});
