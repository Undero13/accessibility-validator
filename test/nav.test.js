const checkNav = require('../compile/controllers/checkers/navChecker')

describe('navbar', () => {
  test('semantic nav not exist', () => {
    const html = { DOM: '<html><head><title>Title</title></head><body></body></html>' };

    expect(checkNav.default(html)).toHaveLength(1);
  });

  test('nav exist but elements is not list', () => {
    const html = { DOM: '<html><head><title>Title</title></head><body><nav></nav></body></html>' };

    expect(checkNav.default(html)).toHaveLength(1);
  });

  test('nav valid', () => {
    const html = { DOM: "<html lang='es'><head><title>Title</title></head><body><nav><ul><li>item1</li></ul></nav></body></html>" }

    expect(checkNav.default(html)).toHaveLength(0);
  });
});
