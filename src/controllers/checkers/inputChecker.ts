/**
* Check inputs label, focus,hover
*/
function checkInputs({ inputs }: { inputs: Array<StyleObject> }): Array<RaportModel> {
  const checkerResult: Array<RaportModel> = [];

  if (inputs.length > 0) {
    inputs.forEach((input) => {
      if (input && !input.inputLabel) {
        checkerResult.push({
          what: 'brak etykiety',
          category: 'devices',
          type: 'error',
          code: 'A8',
          message: `Element: ${input.el}`,
        });

        if (!input.correctFocus) {
          checkerResult.push({
            what: 'brak focusa',
            category: 'devices',
            type: 'warning',
            code: 'A9',
            message: `Element: ${input.outerHTML}`,
          });
        }
      }
    });
  }

  return checkerResult;
}

export default checkInputs;
