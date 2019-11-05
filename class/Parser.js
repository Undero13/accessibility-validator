const DomParser = require("dom-parser");
const axios = require("axios");
const cssParser = require("css");
const fs = require("fs");

class Parser {
  constructor(html, url) {
    const parser = new DomParser();
    this.url = url;
    this.DOM = parser.parseFromString(html);
  }

  /*
   * Return this.DOM
   */
  getDOM() {
    return this.DOM;
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

      return newElements;
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
   * Download data from link
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
