declare module 'dom-parser';
declare module 'electron-localizer';

type forEach = (arg: string) => string
type getElementsByTagName = (arg: string) => Array<FakeDOMElement>
type getAttribute = (arg: string) => string;
type getHeadTitle = (arg: string) => string;

interface FakeDOMElement{
  getElementsByTagName: getElementsByTagName;
  outerHTML: string;
  getAttribute: getAttribute;
  textContent: string;
}

interface FakeDOMDocument{
  forEach: forEach;
  getElementsByTagName: getElementsByTagName;
}

interface InputModel {
  url?: string;
  device?: string;
}

interface UrlEventModel {
  url: string;
  device: string;
}

interface RaportModel {
  what: string;
  category: string;
  type: string;
  code: string;
  message: string;
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
  outerHTML: string;
}

interface PotentialModalObject{
  el: string;
  zIndex: number;
}

interface NightmareReturnObject{
  link?: Array<StyleObject>;
  button?: Array<StyleObject>;
  inputs?: Array<StyleObject>;
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

interface PotentialModal {
  el: string;
  zIndex: number;
}

declare function getStyleFormDom(selector: NodeList, param?: boolean): Array<StyleObject>
declare function enlargeFonts(): Array<string>
declare function getAnimationElement(): Array<string>
declare function getPotentialModal(): PotentialModalObject
declare function clearURL(): string
