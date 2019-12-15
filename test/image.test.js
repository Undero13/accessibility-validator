const checkImages = require('../compile/controllers/checkers/imageChecker')

describe('image', () => {
  test('missing alt', () => {
    const html = { DOM: "<html><head><title>Title</title></head><body><img src='image.jpg'></body></html>" };

    expect(checkImages.default(html)).toHaveLength(1);
  });

  test('image valid', () => {
    const html = { DOM: "<html lang='es'><head><title>Title</title></head><body><img src='image.jpg' alt='image'></body></html>"  };

    expect(checkImages.default(html)).toHaveLength(0);
  });
});
