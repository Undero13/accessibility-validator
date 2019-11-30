abstract class AbstractParser {
  protected DOM: FakeDOMDocument;

  constructor(DOM: FakeDOMDocument) {
    this.DOM = DOM
  }

  abstract getElements(selector: string): Array<FakeDOMElement>
  abstract getHeadTitle(): FakeDOMElement

  getDOM(): FakeDOMDocument {
    return this.DOM;
  }
}

export default AbstractParser;
