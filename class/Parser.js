const DomParser = require("dom-parser");
const axios = require("axios");
const cssParser = require("css");

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
  getCSS() {
    return cssParser.parse(this.css);
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
  getElement(selector) {
    const elements = this.DOM.getElementsByTagName(selector);

    if (elements.length === 0) return null;
    if (elements.length === 1) return elements[0];
    return [...elements];
  }

  /*
   * Return html title tag
   */
  getHeadTitle() {
    const head = this.getElement("head");
    let title = "";

    try {
      title = head.getElementsByTagName("title");
    } catch (e) {
      title = head[0].getElementsByTagName("title");
    }

    return title[0];
  }

  /*
   * Get css from the dom
   */
  processCSS() {
    const links = this.getElement("link");
    const styles = this.getElement("style");

    links.forEach(link => {
      const tag = link.outerHTML;

      if (tag.includes('rel="stylesheet"')) {
        const url = `${this.url}/${link.getAttribute("href")}`;
        this.fetchData(url, "css");
      }
    });

    if (styles) {
      if (Array.isArray(styles)) {
        styles.forEach(style => this.setCSS(style.textContent));
      } else {
        this.setCSS(styles.textContent);
      }
    }
  }

  /*
   * Download data from link
   */
  fetchData(url, type = null) {
    axios
      .get(url)
      .then(res => {
        if (type === "css") {
          return this.setCSS(res.data);
        }
        return res;
      })
      .catch(e => {
        throw new Error(e);
      });
  }
}

module.exports = Parser;
