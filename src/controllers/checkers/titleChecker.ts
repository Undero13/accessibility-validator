import Parser from '../Parser';

/**
 * Check title tag
*/
function checkTitle({ DOM, siteName }: { DOM: string; siteName: string }): Array<RaportModel> {
  const parser = new Parser(DOM);
  const { textContent } = parser.getHeadTitle();
  const checkerResult: Array<RaportModel> = [];

  if (!textContent) {
    checkerResult.push({
      what: 'tytuł',
      category: 'general',
      type: 'error',
      code: 'T1',
      message: '',
    });
  } else if (!textContent.toLocaleLowerCase().includes(siteName.toLocaleLowerCase())) {
    checkerResult.push({
      what: 'tytuł',
      category: 'general',
      type: 'warning',
      code: 'T2',
      message: '',
    });
  }

  return checkerResult;
}

export default checkTitle;
