class AbstractParser {
  constructor() {
    this.DOM = "";
    if (new.target === AbstractParser) {
      throw new TypeError(
        'Abstract class "AbstractParser" cannot be instantiated directly.'
      );
    }
  }

  getDOM() {
    return this.DOM;
  }

  getDOMFromURL() {
    throw new Error("You have to implement the method getDOMFromURL");
  }

  getElements() {
    throw new Error("You have to implement the method getElements");
  }

  getHeadTitle() {
    throw new Error("You have to implement the method getHeadTitle");
  }
}

module.exports = AbstractParser;
