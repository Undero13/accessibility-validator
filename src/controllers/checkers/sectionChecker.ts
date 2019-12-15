import Parser from '../Parser';

/**
 * Each section must have header
*/
function checkSection({ DOM }: { DOM: string }): Array<RaportModel> {
  const parser = new Parser(DOM);
  const sections = parser.getElements('section')
  const checkerResult: Array<RaportModel> = [];

  if (sections.length > 0) {
    sections.forEach((item) => {
      for (let i = 0; i < 6; i++) {
        const header = item.getElementsByTagName(`h${i + 1}`);

        if (header.length > 0) {
          break;
        } else if (header.length < 1 && i === 5) {
          checkerResult.push({
            what: 'sekcja nie ma headera',
            category: 'semantic',
            type: 'error',
            code: 'H1',
            message: `Element: ${item.outerHTML}`,
          });
        }
      }
    });
  }

  return checkerResult;
}


export default checkSection;
