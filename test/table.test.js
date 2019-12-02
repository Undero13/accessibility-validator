const checkTable = require('../compile/controllers/checkers/tableChecker')

describe('table', () => {
  test('table dont have thead', () => {
    const html = { DOM: '<html><head><title>Title</title></head><body><table><tbody></tbody><tr><td>test<td></td></table></body></html>' };

    expect(checkTable.default(html)).toHaveLength(1);
  });

  test('table valid', () => {
    const html = { DOM: "<html lang='es'><head><title>Title</title></head><body><table><thead><tr><th>test<th></td></tead><tbody><tr><td>test<td></td></tbody></table></body></html>" };

    expect(checkTable.default(html)).toHaveLength(0);
  });
});
