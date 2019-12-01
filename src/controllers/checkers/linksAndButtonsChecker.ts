import Parser from '../Parser';

/**
* Check links hrefs,aria-label, label, tabindex, focus,hover
*/
function checkLinksAndButtons({ link, button }: {link: Array<StyleObject>;button: Array<StyleObject>}): Array<RaportModel> {
  const elementsArr = [link, button];
  const checkerResult: Array<RaportModel> = [];
  // links href
  if (elementsArr[0].length > 0) {
    elementsArr[0].forEach((element) => {
      if (element && element.el) {
        const parser = new Parser(element.el);
        const [a] = parser.getElements('a');

        if (a && !a.getAttribute('href')) {
          checkerResult.push({
            what: 'uszkodzony href',
            category: 'general',
            type: 'error',
            code: 'A3',
            message: `Element: ${a.outerHTML}`,
          });
        }
      }
    });
  }

  // links and buttons
  const flatArr = elementsArr.flat();

  flatArr.forEach((item) => {
    if (item && item.el) {
      const parser = new Parser(item.el);
      const [element] = parser.getElements('a').length > 0
        ? parser.getElements('a')
        : parser.getElements('button');

      if (element && element.getAttribute('aria-label') === '') {
        checkerResult.push({
          what: 'pusty aria-label',
          category: 'aria',
          type: 'warning',
          code: 'A4',
          message: `Element: ${element.outerHTML}`,
        });
      }

      if (
        element
          && element.getAttribute('tabindex')
          && parseInt(element.getAttribute('tabindex'), 10) !== 0
      ) {
        checkerResult.push({
          what: 'tabindex',
          category: 'devices',
          type: 'warning',
          code: 'A5',
          message: `Element: ${element.outerHTML}`,
        });
      }

      const image = parser.getElements('img').length > 0
        ? parser.getElements('img')[0]
        : null;

      const title = element ? element.getAttribute('title') : null;

      // BUG #2
      if (!item.textContent && !title && !image) {
        checkerResult.push({
          what: 'brak etykiety',
          category: 'general',
          type: 'error',
          code: 'A6',
          message: `Element: ${item.el}`,
        });
      }

      if (!item.correctFocus) {
        checkerResult.push({
          what: 'brak focusa',
          category: 'devices',
          type: 'warning',
          code: 'A7',
          message: `Element: ${item.el}`,
        });
      }
    }
  });

  return checkerResult;
}

export default checkLinksAndButtons;
