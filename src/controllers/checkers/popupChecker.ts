/**
* Check video and audio subtitles and check autoplay
*/
function checkPopup({ potentialModal }: {potentialModal: PotentialModal}): Array<RaportModel> {
  const { el } = potentialModal;
  const checkerResult: Array<RaportModel> = [];

  if (el !== null) {
    const tabindex = el.match(/tabindex=("([^"]|"")*")/i);
    const role = el.match(/role=("([^"]|"")*")/i);

    if (tabindex) {
      tabindex[1] = tabindex[1].replace(/"/g, '');
    }

    if (!tabindex || parseInt(tabindex[1], 10) < 0) {
      checkerResult.push({
        what: 'popup',
        category: 'devices',
        type: 'error',
        code: 'P1',
        message: `Element: ${el}`,
      });
    } else if (
      !role
        || (role[1] !== '"dialog"' && role[1] !== '"document"')
    ) {
      checkerResult.push({
        what: 'popup',
        category: 'devices',
        type: 'error',
        code: 'P2',
        message: `Element: ${el}`,
      });
    }
  }
  return checkerResult;
}

export default checkPopup;
