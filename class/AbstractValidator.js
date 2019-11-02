class AbstractValidator {
  constructor() {
    if (new.target === AbstractValidator) {
      throw new TypeError(
        'Abstract class "AbstractValidator" cannot be instantiated directly.'
      );
    }
  }

  getDOM() {
    throw new Error("You have to implement the method getDOM");
  }

  processDOM() {
    throw new Error("You have to implement the method processDOM");
  }

  setUrl(newUrl) {
    this.url = newUrl;
  }

  getUrl() {
    return this.url;
  }

  getRaport() {
    return this.raport;
  }
}

module.exports = AbstractValidator;
