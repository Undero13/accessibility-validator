import Parser from '../Parser';

/**
* Iframe must have title attr
 */
function checkIframe({ DOM }: { DOM: string }): Array<RaportModel> {
  const parser = new Parser(DOM);
  const iframeArr = parser.getElements('iframe')
  const checkerResult: Array<RaportModel> = [];

  if (iframeArr.length > 0) {
    iframeArr.forEach((iframe) => {
      if (iframe && !iframe.getAttribute('title')) {
        checkerResult.push({
          what: 'title w iframe',
          category: 'semantic',
          type: 'error',
          code: 'I2',
          message: `Element: ${iframe.outerHTML}`,
        });
      }
    });
  }

  return checkerResult;
}

export default checkIframe;
