/**
 * AbstractValidator class
 * @module AbstractValidator
 * @throws {Error} if not override
 */

class AbstractValidator {
  constructor() {
    if (new.target === AbstractValidator) {
      throw new TypeError(
        'Abstract class "AbstractValidator" cannot be instantiated directly.'
      );
    }
  }

  /**
   * processDOM abstract method
   * @throws {Error} if not override
   * @returns {void}
   */
  processDOM() {
    throw new Error("You have to implement the method processDOM");
  }

  /**
   * Get url property
   * @returns {string}
   */
  getURL() {
    return this.url;
  }

  /**
   * Get raport property
   *  @returns {Array<object>}
   */
  getRaport() {
    return this.raport;
  }

  /**
   * Push new raport object
   * @param {object} data
   * @returns {void}
   */
  setRaport(data) {
    this.raport.push(data);
  }
}

module.exports = AbstractValidator;
