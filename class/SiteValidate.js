const { parsed: config } = require("dotenv").config();
const Nightmare = require("nightmare");
const cheerio = require("cheerio");
const AbstractValidator = require("./AbstractValidator");
const electron = require("../node_modules/electron");

class SiteValidate extends AbstractValidator {
  constructor(url) {
    super();
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
      .then(res => this.processDOM(res))
      .catch(error => {
        throw Error(error);
      });
  }

  processDOM(DOM) {
    const $ = cheerio.load(DOM);
    console.log($("img"));
  }
}

module.exports = SiteValidate;
