declare module 'dom-parser';

type forEach = (arg: string) => string
type getElementsByTagName = (arg: string) => Array<FakeDOMElement>


interface FakeDOMElement{
  getElementsByTagName: getElementsByTagName;
  outerHTML: string;
}

interface FakeDOMDocument{
  forEach: forEach;
  getElementsByTagName: getElementsByTagName;
}

/**
 * For nightmare.lib
 */
interface StyleObject {
  el: string;
  textContent: string;
  fontSize: string;
  color: string;
  background: string;
  inputLabel: boolean;
  correctFocus: boolean;
}

interface PotentialModalObject{
  el: string;
  zIndex: number;
}

interface NightmareReturnObject{
  link?: Array<StyleObject>;
  button?: Array<StyleObject>;
  input?: Array<StyleObject>;
  p?: Array<StyleObject>;
  span?: Array<StyleObject>;
  h1?: Array<StyleObject>;
  h2?: Array<StyleObject>;
  h3?: Array<StyleObject>;
  h4?: Array<StyleObject>;
  h5?: Array<StyleObject>;
  h6?: Array<StyleObject>;
  enlargeFonts?: Array<string>;
  animate?: Array<string>;
  potentialModal?: PotentialModalObject;
  DOM?: string;
  siteName?: string;
}

interface MainFormData{
  url: string;
  device: string;
}

declare function getStyleFormDom(selector: NodeList, param?: boolean): Array<StyleObject>
declare function enlargeFonts(): Array<string>
declare function getAnimationElement(): Array<string>
declare function getPotentialModal(): PotentialModalObject
declare function clearURL(): string
