const checkIcon = require('../compile/controllers/checkers/iconChecker')

describe('icon', () => {
  test('wrong tag', () => {
    const html = { DOM: "<html><head><title>Title</title></head><body><i class='icon'></i></body></html>" }

    expect(checkIcon.default(html)).toHaveLength(1);
  });

  test('figure valid', () => {
    const html = { DOM: "<html lang='es'><head><title>Title</title></head><body><span class='icon'></span></body></html>" }

    expect(checkIcon.default(html)).toHaveLength(0);
  });
});
