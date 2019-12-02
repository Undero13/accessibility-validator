const checkFooter = require('../compile/controllers/checkers/footerChecker')

describe('footer', () => {
  test('semantic footer not exist', () => {
    const html = { DOM: '<html><head><title>Title</title></head><body></body></html>' };

    expect(checkFooter.default(html)).toHaveLength(1);
  });

  test('footer valid', () => {
    const html = { DOM: "<html lang='es'><head><title>Title</title></head><body><footer>aaa</footer></body></html>" }

    expect(checkFooter.default(html)).toHaveLength(0);
  });
});
