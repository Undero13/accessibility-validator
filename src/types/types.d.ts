declare module 'dom-parser';

type forEach = (arg: string) => string
type getElementsByTagName = (arg: string) => Array<FakeElement>


interface FakeElement{
  getElementsByTagName: getElementsByTagName;
  outerHTML: string;
}

interface FakeDOMDocument{
  forEach: forEach;
  getElementsByTagName: getElementsByTagName;
}
