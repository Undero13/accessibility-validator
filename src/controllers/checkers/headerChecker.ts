/**
* Check headers hierarchy,repeatability
*/
function checkHeaders({ h1, h2, h3, h4, h5, h6 }: {
  h1: Array<string>;
  h2: Array<string>;
  h3: Array<string>;
  h4: Array<string>;
  h5: Array<string>;
  h6: Array<string>;
}): Array<RaportModel> {
  const headersArr = [h1, h2, h3, h4, h5, h6].flat(2);
  const checkerResult: Array<RaportModel> = [];

  let h1No = 0;
  let h2No = 0;
  let h3No = 0;
  let h4No = 0;
  let h5No = 0;
  let h6No = 0;

  headersArr.forEach((header) => {
    if (header && Object.entries(header.el).length !== 0) {
      const { el } = header;
      if (el.includes('<h1')) h1No++;
      if (el.includes('<h2')) h2No++;
      if (el.includes('<h3')) h3No++;
      if (el.includes('<h4')) h4No++;
      if (el.includes('<h5')) h5No++;
      if (el.includes('<h6')) h6No++;
    }
  });

  if (h1No > 1 || h1No < 1) {
    checkerResult.push({
      what: 'nagłówki',
      category: 'semantic',
      type: 'error',
      code: 'H2',
      message: `${h1}`,
    });
  }

  if (
    (h2No > 0 && h1No < 1)
      || (h3No > 0 && h2No < 1)
      || (h4No > 0 && h3No < 1)
      || (h5No > 0 && h4No < 1)
      || (h6No > 0 && h5No < 1)
  ) {
    checkerResult.push({
      what: 'nagłówki',
      category: 'semantic',
      type: 'error',
      code: 'H3',
      message: '',
    });
  }

  return checkerResult;
}

export default checkHeaders;
