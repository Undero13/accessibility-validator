const checkTitle = require('../compile/controllers/checkers/titleChecker')


test('valid title', () => {
  const html = { DOM: "<html lang='es'><head><title>title-fakesite</title></head></html>", siteName: 'fakesite' };

  expect(checkTitle.default(html)).toHaveLength(0);
});

test('invalid title', () => {
  const html = { DOM: "<html lang='es'><head><title>title</title></head></html>", siteName: 'fakesite' };

  expect(checkTitle.default(html)).toHaveLength(1);
});
