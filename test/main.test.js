const checkMain = require('../compile/controllers/checkers/mainChecker')

describe('main', () => {
  test('main not exist', () => {
    const html = { DOM: '<html><head><title>Title</title></head><body></body></html>' };

    expect(checkMain.default(html)).toHaveLength(1);
  });

  test('main valid', () => {
    const html = { DOM: "<html lang='es'><head><title>Title</title></head><body><main>aaa</main></body></html>" };

    expect(checkMain.default(html)).toHaveLength(0);
  });
});
