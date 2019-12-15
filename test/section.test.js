const checkSection = require('../compile/controllers/checkers/sectionChecker')

describe('section', () => {
  test('section dont have header', () => {
    const html = { DOM: '<html><head><title>Title</title></head><body><section></section></body></html>' };

    expect(checkSection.default(html)).toHaveLength(1);
  });

  test('section valid', () => {
    const html = { DOM: "<html lang='es'><head><title>Title</title></head><body><section><h2>aaaa</h2></section></body></html>" };

    expect(checkSection.default(html)).toHaveLength(0);
  });
});
