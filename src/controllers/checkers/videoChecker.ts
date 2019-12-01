import Parser from "../Parser";

/**
* Check video and audio subtitles and check autoplay
*/
  function checkVideoAndAudio({ DOM }: { DOM: string }): Array<RaportModel> {
    const parser = new Parser(DOM);
    const video = parser.getElements('video')
    const audio = parser.getElements('audio')
    const flatArr = [video,audio].flat(2);
    const checkerResult: Array<RaportModel> = [];

    if (flatArr.length > 0) {
      flatArr.forEach((element) => {
        const track = element.outerHTML.includes('track');
        const kindValid = element.outerHTML.includes('kind="subtitles"');
        const autoplay = element.outerHTML.includes('autoplay');

        if (!track) {
            checkerResult.push({
            what: 'brak transkrypcji',
            category: 'devices',
            type: 'error',
            code: 'V1',
            message: ` ${element.outerHTML}`,
          });
        } else if (track && !kindValid) {
            checkerResult.push({
            what: 'brak transkrypcji',
            category: 'devices',
            type: 'error',
            code: 'V2',
            message: `${element.outerHTML}`,
          });
        }

        if (autoplay) {
            checkerResult.push({
            what: 'video autoplay',
            category: 'devices',
            type: 'warning',
            code: 'V3',
            message: `Element: ${element.outerHTML}`,
          });
        }
      });
    }

    return checkerResult;
  }

  export default checkVideoAndAudio;