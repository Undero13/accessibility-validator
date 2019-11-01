const { parsed: config } = require("dotenv").config();
const Nightmare = require("nightmare");

class SiteValidate {
  constructor(url) {
    this.url = url;
    this.getDOM();
  }

  getDOM() {
    const nightmare = Nightmare({ show: config.DEV_ENV });
    nightmare
      .goto(this.url)
      .wait(2000)
      .end()
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }
}

module.exports = SiteValidate;
