import Parser from '../Parser';

/**
* Check image alt
*/
function checkImages({ DOM }: { DOM: string }): Array<RaportModel> {
  const parser = new Parser(DOM);
  const images = parser.getElements('img')
  const checkerResult: Array<RaportModel> = [];

  if (images.length > 0) {
    images.forEach((img) => {
      const alt = img.getAttribute('alt') ? img.getAttribute('alt') : '';

      if (alt.length < 1) {
        checkerResult.push({
          what: 'opis obrazka',
          category: 'image',
          type: 'error',
          code: 'I3',
          message: `${img.getAttribute('src')}`,
        });
      }
    });
  }

  return checkerResult;
}

export default checkImages;
