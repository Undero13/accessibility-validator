const DomParser = require("dom-parser");
const { parsed: config } = require("dotenv").config();
const Nightmare = require("nightmare");
const electron = require("../node_modules/electron");
const AbstractParser = require("./AbstractParser");

class Parser extends AbstractParser {
  constructor(html) {
    super();
    const parser = new DomParser();
    this.DOM = parser.parseFromString(html);
  }

  /*
   * Return element
   */
  getElements(selector) {
    const elements = this.DOM.getElementsByTagName(selector);

    // fix bug form dom-parser search
    if (selector.length === 1) {
      const newElements = [];
      elements.forEach(element => {
        const test = element.outerHTML.substring(0, 3).replace(" ", "");

        if (test.length === 2) {
          newElements.push(element);
        }
      });

      return newElements.length > 0 ? newElements : [];
    }

    return elements.length > 0 ? elements : [];
  }

  /*
   * Return html title tag
   */
  getHeadTitle() {
    const head = this.getElements("head");
    const title = head[0].getElementsByTagName("title");

    return title.length > 0 ? title[0] : null;
  }

  /*
   * Return DOM, and tags styles
   */
  static async getDOMFromURL(url = "") {
    const nightmare = Nightmare({
      electronPath: electron,
      show: config.DEV_ENV
    });

    try {
      const result = await nightmare
        .goto(url)
        .inject("js", `${__dirname}/nightmareLib.js`)
        .wait(config.SITE_LOADING_TIMEOUT * 1)
        .evaluate(() =>
          document.body.scrollIntoView({ behavior: "smooth", block: "end" })
        )
        .wait(config.SITE_SCROLLING_TIMEOUT * 1)
        .evaluate(() => {
          const returnObj = {};
          const links = document.querySelectorAll("a");
          const buttons = document.querySelectorAll("button");
          const paragraphs = document.querySelectorAll("p");
          const spans = document.querySelectorAll("span");
          const h1 = document.querySelectorAll("h1");
          const h2 = document.querySelectorAll("h2");
          const h3 = document.querySelectorAll("h3");
          const h4 = document.querySelectorAll("h4");
          const h5 = document.querySelectorAll("h5");
          const h6 = document.querySelectorAll("h6");
          const inputs = document.querySelectorAll(
            "input:not([type='submit']):not([type='hidden'])"
          );

          returnObj.link = getStyleFormDom(links, true);
          returnObj.button = getStyleFormDom(buttons, true);
          returnObj.input = getStyleFormDom(inputs, true);
          returnObj.p = getStyleFormDom(paragraphs);
          returnObj.span = getStyleFormDom(spans);
          returnObj.h1 = getStyleFormDom(h1);
          returnObj.h2 = getStyleFormDom(h2);
          returnObj.h3 = getStyleFormDom(h3);
          returnObj.h4 = getStyleFormDom(h4);
          returnObj.h5 = getStyleFormDom(h5);
          returnObj.h6 = getStyleFormDom(h6);

          returnObj.animate = getAnimationElement();

          returnObj.DOM = document.querySelector("html").outerHTML;
          return returnObj;
        })
        .end();
      return result;
    } catch (e) {
      throw Error(e);
    }
  }
}

module.exports = Parser;
