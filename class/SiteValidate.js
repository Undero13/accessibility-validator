const { parsed: config } = require("dotenv").config();
const Nightmare = require("nightmare");
const electron = require("../node_modules/electron");

class SiteValidate {
  constructor(url) {
    this.url = url;

    this.getDOM();
  }

  getDOM() {
    const nightmare = Nightmare({
      electronPath: electron,
      show: config.DEV_ENV
    });

    nightmare
      .goto(this.url)
      .wait("body")
      .evaluate(() => document.querySelector("body").innerHTML)
      .end()
      .then(res => console.log(res))
      .catch(error => {
        throw Error(error);
      });
  }
}

module.exports = SiteValidate;
