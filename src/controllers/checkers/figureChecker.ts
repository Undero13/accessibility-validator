import Parser from '../Parser';

/**
 * Figure should have figcaption
*/
function checkFigure({ DOM }: { DOM: string }): Array<RaportModel> {
  const parser = new Parser(DOM);
  const figures = parser.getElements('figure')
  const checkerResult: Array<RaportModel> = [];

  if (figures.length > 0) {
    figures.forEach((figure) => {
      const caption = figure.getElementsByTagName('figcaption');

      if (caption.length < 1) {
        checkerResult.push({
          what: 'brak figcaption',
          category: 'semantic',
          type: 'warning',
          code: 'F2',
          message: `Element:${figure.outerHTML} `,
        });
      }
    });
  }

  return checkerResult;
}

export default checkFigure;
