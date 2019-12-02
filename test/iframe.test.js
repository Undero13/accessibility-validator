const checkIframe = require('../compile/controllers/checkers/iframeChecker')

test('iframe not valid', () => {
  const html = { DOM: "<html lang='es'><head></head><iframe></iframe></html>" };

  expect(checkIframe.default(html)).toHaveLength(1);
});

test('iframe title valid', () => {
  const html = { DOM: "<html lang='es'><head></head><iframe title='test'></iframe></html>" };

  expect(checkIframe.default(html)).toHaveLength(0);
});
