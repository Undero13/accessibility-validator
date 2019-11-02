const DomParser = require("dom-parser");

class Parser {
  constructor(html) {
    const parser = new DomParser();
    this.DOM = parser.parseFromString(html);
  }

  getElement(selector) {
    const elements = this.DOM.getElementsByTagName(selector);

    if (elements.length === 0) return null;
    if (elements.length === 1) return elements[0];
    return [...elements];
  }

  getDOM() {
    return this.DOM;
  }
}

module.exports = Parser;
