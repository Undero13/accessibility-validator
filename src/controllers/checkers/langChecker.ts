import Parser from '../Parser';

/**
   * Check html lang attribute
   */
function checkLang({ DOM }: {DOM: string}): Array<RaportModel> {
  const parser = new Parser(DOM);
  const [html] = parser.getElements('html');
  const lang = html.getAttribute('lang');
  const checkerResult: Array<RaportModel> = [];

  if (!lang) {
    checkerResult.push({
      what: 'język',
      category: 'general',
      type: 'error',
      code: 'L2',
      message: '',
    });
  }

  return checkerResult;
}

export default checkLang
