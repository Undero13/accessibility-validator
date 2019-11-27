abstract class AbstractParser {
  public DOM: FakeDOMDocument;

  constructor(DOM: FakeDOMDocument) {
    this.DOM = DOM
  }

  abstract getElements(selector: string): Array<FakeElement>
  abstract getHeadTitle(): FakeElement

  getDOM(): FakeDOMDocument {
    return this.DOM;
  }
}

export default AbstractParser;
