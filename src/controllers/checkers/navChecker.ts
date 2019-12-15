import Parser from '../Parser';

/**
 * Check semantic navbar and list in navbar
*/
function checkNav({ DOM }: { DOM: string }): Array<RaportModel> {
  const parser = new Parser(DOM);
  const navs = parser.getElements('nav')
  const checkerResult: Array<RaportModel> = [];

  if (navs.length < 1) {
    checkerResult.push({
      what: 'nawigacja',
      category: 'semantic',
      type: 'warning',
      code: 'N1',
      message: '',
    });
  } else {
    const list = navs[0].getElementsByTagName('ul');

    if (list.length < 1) {
      checkerResult.push({
        what: 'nawigacja',
        category: 'semantic',
        type: 'warning',
        code: 'N2',
        message: '',
      });
    }
  }

  return checkerResult;
}

export default checkNav;
