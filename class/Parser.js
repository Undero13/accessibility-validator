const DomParser = require("dom-parser");
const axios = require("axios");
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
   * Return DOM
   */
  static async getDOMFromURL(url = "") {
    const nightmare = Nightmare({
      electronPath: electron,
      show: config.DEV_ENV
    });
    try {
      const result = await nightmare
        .goto(url)
        .wait(config.SITE_LOADING_TIMEOUT * 1)
        .evaluate(() => {
          const { body } = document;
          body.scrollIntoView({ behavior: "smooth", block: "end" });
        })
        .wait(config.SITE_SCROLLING_TIMEOUT * 1)
        .evaluate(() => {
          const returnObj = {};
          const links = document.querySelectorAll("a");
          const buttons = document.querySelectorAll("button");
          const paragraphs = document.querySelectorAll("p");
          const spans = document.querySelectorAll("span");
          const inputs = document.querySelectorAll(
            "input:not([type='submit']):not([type='hidden'])"
          );
          const h1 = document.querySelectorAll("h1");
          const h2 = document.querySelectorAll("h2");
          const h3 = document.querySelectorAll("h3");
          const h4 = document.querySelectorAll("h4");
          const h5 = document.querySelectorAll("h5");
          const h6 = document.querySelectorAll("h6");

          /*
           * Get backgroung from element
           */
          const getElementBackground = (element, attr) =>
            window.getComputedStyle(element, null).getPropertyValue(attr);

          /*
           * If element don't have backgroung get this from parent
           */
          const getBackground = element => {
            let res = getElementBackground(element, "background-color");
            while (
              !res ||
              res === "transparent" ||
              res === "#000000" ||
              res === "rgba(0, 0, 0, 0)"
            ) {
              if (element === document.body) res = "#fff";
              else {
                element = element.parentNode;
                res = getBackground(element, "background-color");
              }
            }
            return res;
          };

          /*
           * get background,color and font-size and few others
           */
          function getStyle(elements, key, interactive = false) {
            const properties = [];

            if (elements.length < 1) return;

            elements.forEach(elm => {
              const styleFont = window
                .getComputedStyle(elm, null)
                .getPropertyValue("font-size");
              const styleColor = window
                .getComputedStyle(elm, null)
                .getPropertyValue("color");
              // tu focus i hover

              properties.push({
                el: elm.outerHTML,
                textContent: elm.textContent,
                fontSize: styleFont,
                color: styleColor || "#000",
                background: getBackground(elm),
                inputLabel:
                  elm.labels && elm.labels.length === 1 ? elm.labels[0] : ""
              });
            });
            returnObj[key] = properties;
          }

          getStyle(links, "link");
          getStyle(buttons, "button");
          getStyle(paragraphs, "p");
          getStyle(spans, "span");
          getStyle(inputs, "input");
          getStyle(h1, "h1");
          getStyle(h2, "h2");
          getStyle(h3, "h3");
          getStyle(h4, "h4");
          getStyle(h5, "h5");
          getStyle(h6, "h6");

          returnObj.DOM = document.querySelector("html").outerHTML;
          return returnObj;
        })
        .end();
      return result;
    } catch (e) {
      throw Error(e);
    }
  }

  /*
   * Return element
   */
  getElements(selector) {
    const elements = this.DOM.getElementsByTagName(selector);

    // fix for dom-parser search
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
   * Download data from link DEPRECATED
   */
  fetchData(url) {
    axios
      .get(url)
      .then(res => {
        if (res.status === 200) {
          return res;
        }
      })
      .catch(e => {
        throw Error(e);
      });
  }
}

module.exports = Parser;
