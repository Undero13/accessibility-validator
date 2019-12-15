const checkVideoAndAudio = require('../compile/controllers/checkers/videoChecker')

describe('video', () => {
  test('video track not exist', () => {
    const html = { DOM: "<html><head><title>Title</title></head><body><video><source src='example.mp4' type='video/mp4'></video></body></html>" };

    expect(checkVideoAndAudio.default(html)).toHaveLength(1);
  });

  test('video track is empty', () => {
    const html = { DOM: "<html lang='es'><head><title>Title</title></head><body><video><source src='example.mp4' type='video/mp4'><track kind='' src='subtitles_en.vtt' srclang='en'></video></body></html>" };

    expect(checkVideoAndAudio.default(html)).toHaveLength(1);
  });

  test('video is valid', () => {
    const html = { DOM: "<html lang='es'><head><title>Title</title></head><body><video><source src='example.mp4' type='video/mp4'><track kind='subtitles' src='subtitles_en.vtt' srclang='en'></video></body></html>" };

    expect(checkVideoAndAudio.default(html)).toHaveLength(0);
  });
});
