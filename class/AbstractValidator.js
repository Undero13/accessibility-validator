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

  getURL() {
    return this.url;
  }

  getRaport() {
    return this.raport;
  }

  setRaport(data) {
    this.raport.push(data);
  }
}

module.exports = AbstractValidator;
