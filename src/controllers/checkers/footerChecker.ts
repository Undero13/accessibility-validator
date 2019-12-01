import Parser from '../Parser';

/**
 * Check semantic footer
*/
function checkFooter({ DOM }: { DOM: string }): Array<RaportModel> {
  const parser = new Parser(DOM);
  const { length } = parser.getElements('footer')
  const checkerResult: Array<RaportModel> = [];

  if (length < 1) {
    checkerResult.push({
      what: 'stopka',
      category: 'semantic',
      type: 'warning',
      code: 'F1',
      message: '',
    });
  }

  return checkerResult;
}

export default checkFooter;
