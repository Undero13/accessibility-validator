const checkHeaders = require('../compile/controllers/checkers/headerChecker')

describe('header', () => {
  test('hierarchy and repeatability', () => {
    const headers = {
      h1: {
        el: '',
      },
      h2: {
        el: '<h2>header2</h2>',
      },
      h3: {
        el: '',
      },
      h4: {
        el: '<h4>header4</h4>',
      },
      h5: {
        el: '<h5>header5</h5>',
      },
      h6: {
        el: '<h6>header6</h6>',
      },
    };

    expect(checkHeaders.default(headers)).toHaveLength(2);
  });

  test('hierarchy valid', () => {
    const headers = {
      h1: {
        el: '<h1>header1</h1>',
      },
      h2: {
        el: '<h2>header2</h2>',
      },
      h3: {
        el: '<h3>header3</h3>',
      },
      h4: {
        el: '<h4>header4</h4>',
      },
      h5: {
        el: '<h5>header5</h5>',
      },
      h6: {
        el: '<h6>header6</h6>',
      },
    };

    expect(checkHeaders.default(headers)).toHaveLength(0);
  });
});
