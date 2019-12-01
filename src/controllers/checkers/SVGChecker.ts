import Parser from '../Parser';

/**
* Each svg must have title tag
*/
function checkSVG({ DOM }: { DOM: string }): Array<RaportModel> {
  const parser = new Parser(DOM);
  const svgArr = parser.getElements('svg')
  const checkerResult: Array<RaportModel> = [];

  if (svgArr.length > 0) {
    svgArr.forEach((svg) => {
      const parserSVG = new Parser(svg.outerHTML);
      const title = parserSVG.getElements('title');

      if (title.length < 1) {
        checkerResult.push({
          what: 'tytuł w svg',
          category: 'image',
          type: 'error',
          code: 'S1',
          message: `Element: ${svg.outerHTML}`,
        });
      }
    });
  }

  return checkerResult;
}

export default checkSVG;
