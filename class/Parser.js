const DomParser = require("dom-parser");
const axios = require("axios");
const cssParser = require("css");
const fs = require("fs");
const CSSInterface = require("./CSSInterface");

class Parser {
  constructor(html, url) {
    const parser = new DomParser();
    this.url = url;
    this.DOM = parser.parseFromString(html);
    this.css = "";

    this.processCSS();
  }

  /*
   * Return this.DOM
   */
  getDOM() {
    return this.DOM;
  }

  /*
   * Return this.css
   */
  getCSSInterface() {
    const cssObject = cssParser.parse(this.css);

    if (cssObject.stylesheet.parsingErrors.length > 0) {
      const data = JSON.stringify(cssObject);

      fs.writeFile("../logs/css", data);
      throw Error("Błąd CSS");
    }

    return new CSSInterface(cssObject.stylesheet);
  }

  /*
   * Add more css to var
   */
  setCSS(css) {
    this.css += css;
  }

  /*
   * Return element
   */
  getElements(selector) {
    const elements = this.DOM.getElementsByTagName(selector);
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
   * Get css from the dom
   */
  processCSS() {
    const links = this.getElements("link");
    const styles = this.getElements("style");

    if (links.length > 0) {
      links.forEach(link => {
        const tag = link.outerHTML;

        if (tag.includes('rel="stylesheet"')) {
          let assetUrl = link.getAttribute("href");

          if (assetUrl[0] === "/") {
            assetUrl = assetUrl.substring(1, assetUrl.length);
          }

          const url = `${this.url}${assetUrl}`;
          this.fetchData(url, "css");
        }
      });
    }

    if (styles.length > 0) {
      styles.forEach(({ textContent }) => this.setCSS(textContent));
    }
  }

  /*
   * Download data from link
   */
  fetchData(url, type = null) {
    axios
      .get(url)
      .then(res => {
        if (res.status === 200) {
          return type === "css" ? this.setCSS(res.data) : res;
        }
      })
      .catch(e => {
        throw Error(e);
      });
  }
}

module.exports = Parser;
