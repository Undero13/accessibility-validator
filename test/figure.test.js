const checkFigure = require('../compile/controllers/checkers/figureChecker')

describe('figure', () => {
  test('figure dont have figcaption', () => {
    const html = { DOM: '<html><head><title>Title</title></head><body><figure></figue></body></html>' };

    expect(checkFigure.default(html)).toHaveLength(1);
  });

  test('figure valid', () => {
    const html = { DOM: "<html lang='es'><head><title>Title</title></head><body><figure><figcaption>dada</figcaption></figue></body></html>" };

    expect(checkFigure.default(html)).toHaveLength(0);
  });
});
