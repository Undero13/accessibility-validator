import AbstractParser from './AbstractParser';

import DomParser = require('dom-parser');
import Nightmare = require('nightmare');

/**
 * AbstractValidator class
 * @module Parser
 * @constructor @param {Node} DOM
 */
class Parser extends AbstractParser {
  constructor(html: string) {
    const parser = new DomParser();
    super(parser.parseFromString(html));
  }

  getElements(selector: string): Array<FakeDOMElement> {
    const elements = this.DOM.getElementsByTagName(selector)

    // fix bug form dom-parser search
    if (selector.length === 1) {
      const newElements: Array<FakeDOMElement> = [];

      elements.forEach((element: FakeDOMElement) => {
        const test = element.outerHTML.substring(0, 3).replace(' ', '');

        if (test.length === 2) {
          newElements.push(element);
        }
      });

      return newElements.length > 0 ? newElements : [];
    }

    return elements.length > 0 ? elements : [];
  }

  getHeadTitle(): FakeDOMElement {
    const head = this.getElements('head');
    const title = head[0].getElementsByTagName('title');

    return title.length > 0 ? title[0] : null;
  }

  static async getDOMFromURL(url = '', device = 'desktop'): Promise<NightmareReturnObject> {
    const nightmareWidth = parseInt(process.env[`${device}_WIDTH`], 10);
    const nightmareHeight = parseInt(process.env[`${device}HEIGHT`], 10)
    const nightmareElectron = require(`${__dirname}/../../node_modules/nightmare/node_modules/electron`);

    const nightmare = new Nightmare({
      electronPath: nightmareElectron,
      show: true,
      width: nightmareWidth,
      height: nightmareHeight,
    });

    try {
      const result = await nightmare
        .goto(url)
        .inject('js', `${__dirname}/nightmareLib.js`)
        .wait(parseInt(process.env.SITE_LOADING_TIMEOUT, 10))
        .evaluate(() => document.body.scrollIntoView({ behavior: 'smooth', block: 'end' }))
        .wait(parseInt(process.env.SITE_SCROLLING_TIMEOUT, 10))
        .evaluate(() => {
          const returnObj: NightmareReturnObject = {};

          const links = document.querySelectorAll('a');
          const buttons = document.querySelectorAll('button');
          const paragraphs = document.querySelectorAll('p');
          const spans = document.querySelectorAll('span');
          const h1 = document.querySelectorAll('h1');
          const h2 = document.querySelectorAll('h2');
          const h3 = document.querySelectorAll('h3');
          const h4 = document.querySelectorAll('h4');
          const h5 = document.querySelectorAll('h5');
          const h6 = document.querySelectorAll('h6');
          const inputs = document.querySelectorAll(
            "input:not([type='submit']):not([type='hidden'])",
          );

          returnObj.link = getStyleFormDom(links, true);
          returnObj.button = getStyleFormDom(buttons, true);
          returnObj.input = getStyleFormDom(inputs, true);
          returnObj.p = getStyleFormDom(paragraphs);
          returnObj.span = getStyleFormDom(spans);
          returnObj.h1 = getStyleFormDom(h1);
          returnObj.h2 = getStyleFormDom(h2);
          returnObj.h3 = getStyleFormDom(h3);
          returnObj.h4 = getStyleFormDom(h4);
          returnObj.h5 = getStyleFormDom(h5);
          returnObj.h6 = getStyleFormDom(h6);

          returnObj.enlargeFonts = enlargeFonts();
          returnObj.animate = getAnimationElement();
          returnObj.potentialModal = getPotentialModal();
          returnObj.DOM = document.querySelector('html').outerHTML;
          returnObj.siteName = clearURL();

          return returnObj;
        })
        .end()
      return result;
    } catch (e) {
      console.error(e)
      return {};
    }
  }
}

export default Parser;
