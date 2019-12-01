import Parser from '../Parser';

/**
* Each site should have exactly 1 main tag
*/
function checkMain({ DOM }: { DOM: string }): Array<RaportModel> {
  const parser = new Parser(DOM);
  const { length } = parser.getElements('main')
  const checkerResult: Array<RaportModel> = [];

  if (length < 1 || length > 1) {
    checkerResult.push({
      what: 'main',
      category: 'semantic',
      type: 'error',
      code: 'M1',
      message: `${length}`,
    });
  }

  return checkerResult;
}

export default checkMain;
