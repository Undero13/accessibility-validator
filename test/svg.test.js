const checkSVG = require('../compile/controllers/checkers/SVGChecker')

test('svg title not valid', () => {
  const html = { DOM: "<html lang='es'><head></head><svg></svg></html>" };

  expect(checkSVG.default(html)).toHaveLength(1);
});

test('svg title valid', () => {
  const html = { DOM: "<html lang='es'><head></head><svg><title>title</title></svg></html>" };

  expect(checkSVG.default(html)).toHaveLength(0);
});
