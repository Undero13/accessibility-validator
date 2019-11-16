const SiteValidate = require("../class/SiteValidate");
const Parser = require("../class/Parser");

describe("video", () => {
  test("video track not exist", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = new Parser(
      "<html><head><title>Title</title></head><body><video><source src='example.mp4' type='video/mp4'></video></body></html>"
    );

    validator.checkVideoAndAudio(html.getElements("video"));
    expect(validator.raport).toHaveLength(1);
  });

  test("video track is empty", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = new Parser(
      "<html lang='es'><head><title>Title</title></head><body><video><source src='example.mp4' type='video/mp4'><track kind='' src='subtitles_en.vtt' srclang='en'></video></body></html>"
    );

    validator.checkVideoAndAudio(html.getElements("video"));
    expect(validator.raport).toHaveLength(1);
  });

  test("video is valid", () => {
    const validator = new SiteValidate("www.fakesite.com", true);
    const html = new Parser(
      "<html lang='es'><head><title>Title</title></head><body><video><source src='example.mp4' type='video/mp4'><track kind='subtitles' src='subtitles_en.vtt' srclang='en'></video></body></html>"
    );

    validator.checkVideoAndAudio(html.getElements("video"));
    expect(validator.raport).toHaveLength(0);
  });
});
