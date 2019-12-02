const checkInputs = require('../compile/controllers/checkers/inputChecker')

describe('input', () => {
  test('missing input label and missing focus', () => {
    const input = {
      inputs: [{
        inputLabel: false,
        correctFocus: false,
      }],
    };

    expect(checkInputs.default(input)).toHaveLength(2);
  });

  test('input valid', () => {
    const input = {
      inputs: {
        inputLabel: true,
        correctFocus: true,
      },
    };

    expect(checkInputs.default(input)).toHaveLength(0);
  });
});
