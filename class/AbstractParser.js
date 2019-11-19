/**
 * AbstractParser class
 * @module AbstractParser
 * @throws {Error} if not override
 * @constructor @var {string} DOM
 */

class AbstractParser {
  constructor() {
    this.DOM = "";
    if (new.target === AbstractParser) {
      throw new TypeError(
        'Abstract class "AbstractParser" cannot be instantiated directly.'
      );
    }
  }

  /**
   * Get DOM property
   * @returns {string} DOM
   */
  getDOM() {
    return this.DOM;
  }

  /**
   * GetDOMFromURL abstract method
   * @throws {Error} if not override
   * @returns {void}
   */
  getDOMFromURL() {
    throw new Error("You have to implement the method getDOMFromURL");
  }

  /**
   * getElements abstract method
   * @throws {Error} if not override
   * @returns {void}
   */
  getElements() {
    throw new Error("You have to implement the method getElements");
  }

  /**
   * getHeadTitle abstract method
   * @throws {Error} if not override
   * @returns {void}
   */
  getHeadTitle() {
    throw new Error("You have to implement the method getHeadTitle");
  }
}

module.exports = AbstractParser;
