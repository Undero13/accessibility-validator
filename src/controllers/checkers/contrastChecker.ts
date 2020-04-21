import Color from 'color';

/**
* Check element/backgroung contrast. Good contrast is greater than 4.5.
*/
function checkContrast(html: NightmareReturnObject): Array<RaportModel> {
  const { p, span, link, button, h1, h2, h3, h4, h5, h6 } = html;
  const elements = [p, span, link, button, h1, h2, h3, h4, h5, h6].flat();
  const checkerResult: Array<RaportModel> = [];

  elements.forEach((element) => {
    if (element) {
      const { el, color, background } = element;
      const colorFirst = Color(background);
      const contrast = colorFirst.contrast(Color(color));

      if (contrast < 4.5) {
        checkerResult.push({
          what: 'kontrast',
          category: 'contrast',
          type: 'warning',
          code: 'K1',
          message: `${contrast.toFixed(2)} - ${el}`,
        })
      }
    }
  })

  return checkerResult;
}

export default checkContrast;
