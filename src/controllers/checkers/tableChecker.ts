import Parser from '../Parser';

/**
 * Table should have thead and tbody
*/
function checkTable({ DOM }: { DOM: string }): Array<RaportModel> {
  const parser = new Parser(DOM);
  const tables = parser.getElements('table')
  const checkerResult: Array<RaportModel> = [];

  if (tables.length > 0) {
    tables.forEach((table) => {
      const thead = table.getElementsByTagName('thead');
      const tbody = table.getElementsByTagName('tbody');

      if (tbody.length > 0 && thead.length < 1) {
        checkerResult.push({
          what: 'tabela nie ma thead',
          category: 'semantic',
          type: 'error',
          code: 'T3',
          message: `Element: ${table.outerHTML}`,
        });
      }
    });
  }

  return checkerResult;
}

export default checkTable;
