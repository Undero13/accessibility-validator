import Parser from '../Parser';

/**
*Icon should not be in i tag
*/
function checkIcon({ DOM }: { DOM: string }): Array<RaportModel> {
  const parser = new Parser(DOM);
  const icons = parser.getElements('i')
  const checkerResult: Array<RaportModel> = [];

  if (icons.length > 0) {
    icons.forEach((icon) => {
      const classIcon = icon.getAttribute('class')
        ? icon.getAttribute('class')
        : '';
      const haveSVG = !!icon.getElementsByTagName('svg').length;

      if (
        classIcon.includes('icon')
          || classIcon.includes('fas')
          || classIcon.includes('far')
          || classIcon.includes('fal')
          || classIcon.includes('fad')
          || classIcon.includes('fab')
          || haveSVG
      ) {
        checkerResult.push({
          what: 'ikona',
          category: 'semantic',
          type: 'error',
          code: 'I1',
          message: `Element ${icon.outerHTML}`,
        });
      }
    });
  }

  return checkerResult;
}

export default checkIcon;
