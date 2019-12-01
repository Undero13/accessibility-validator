/**
 * Check font-size
 */
function checkLetter({ enlargeFonts }: {enlargeFonts: Array<Array<string>>}): Array<RaportModel> {
  const checkerResult: Array<RaportModel> = [];

  if (enlargeFonts.length > 0) {
    enlargeFonts.forEach((overlapElements) => {
      checkerResult.push({
        what: 'elementy nachodzą na siebie',
        category: 'general',
        type: 'warning',
        code: 'L1',
        message: `Element1:${overlapElements[0]}, Element2:${overlapElements[1]}`,
      });
    });
  }

  return checkerResult;
}

export default checkLetter;
