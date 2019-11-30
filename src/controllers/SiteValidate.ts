import AbstractValidator from './AbstractValidator';
import Parser from './Parser';

import Color = require('color');

/**
 * SiteValidator class
 * @module SiteValidate
 */
class SiteValidate extends AbstractValidator {
  constructor(param: MainFormData, test = false) {
    super(param.url, param.device, test);

    if (!this.test) {
      this.getDOM();
    }
  }

  getDOM(): void {
    Parser.getDOMFromURL(this.url, this.device)
      .then((res: NightmareReturnObject) => this.processDOM(res))
      .catch((e) => {
        if (process.env.DEV_ENV) console.error(e);

        this.setError(true);
        this.setFinish(true);
      })
  }

  processDOM(html: NightmareReturnObject) {
    this.setFinish(true)
    /* const parser = new Parser(html.DOM);

    this.checkContrast(
      [html.p, html.span, html.link, html.button],
      [html.h1, html.h2, html.h3, html.h4, html.h5, html.h6],
    );
    this.checkLetter(html.enlargeFonts);
    this.checkAnimation(html.animate);
    this.checkLang(parser.getElements('html'));
    this.checkTitle(parser.getHeadTitle(), html.siteName);
    this.checkNav(parser.getElements('nav'));
    this.checkFooter(parser.getElements('footer'));
    this.checkSection(parser.getElements('section'));
    this.checkTable(parser.getElements('table'));
    this.checkFigure(parser.getElements('figure'));
    this.checkIcon(parser.getElements('i'));
    this.checkMain(parser.getElements('main'));
    this.checkImages(parser.getElements('img'));
    this.checkSVG(parser.getElements('svg'));
    this.checkIframe(parser.getElements('iframe'));
    this.checkHeaders(html.h1, html.h2, html.h3, html.h4, html.h5, html.h6);
    this.checkLinksAndButtons([html.link, html.button]);
    this.checkInputs(html.input);
    this.checkPopup(html.potentialModal);
    this.checkVideoAndAudio(
      parser.getElements('video'),
      parser.getElements('audio'),
    ); */
  }

  /**
   * Check element/backgroung contrast. Good contrast is greater than 4.5.
   * @param {Array<Node>} elements
   * @returns {void}
   */
  /* checkContrast(...elements) {
    const elementsFlat = elements.flat(2);

    elementsFlat.forEach((element) => {
      if (element) {
        const { el, color, background } = element;
        const colorFirst = Color(background);
        const contrast = colorFirst.contrast(Color(color));

        if (contrast < 4.5) {
          this.setRaport({
            what: 'kontrast',
            category: 'contrast',
            type: 'warning',
            code: 'K1',
            message: `${contrast.toFixed(2)} - ${el}`,
          });
        }
      }
    });
  }

  /**
   * Check font-size
   * @param {Array<Node>} elements
   * @todo
   */
  /* checkLetter(elements) {
    if (elements.length > 0) {
      elements.forEach((overlapElm) => {
        this.setRaport({
          what: 'elementy nachodzą na siebie',
          category: 'general',
          type: 'warning',
          code: 'L1',
          message: `Element1:${overlapElm[0]}, Element2:${overlapElm[1]}`,
        });
      });
    }
  }

  /**
   * Check animation gleam (no more than 3 times per 1 sec) - nightmareLib
   * @param {Array<Node>} elements
   * @returns {void}
   */
  /* checkAnimation(elements) {
    if (elements[0] === 'blocker') {
      this.setRaport({
        what: 'animacja',
        category: 'animation',
        type: 'error',
        code: 'A1',
        message: '',
      });
    } else if (elements.length > 0) {
      elements.forEach((element) => this.setRaport({
        what: 'animacja',
        category: 'animation',
        type: 'error',
        code: 'A2',
        message: `${element}`,
      }));
    }
  }

  /**
   * Check html lang attribute
   * @param {Node} html
   * @returns {void}
   */
  /* checkLang([html]) {
    const lang = html.getAttribute('lang');

    if (!lang) {
      this.setRaport({
        what: 'język',
        category: 'general',
        type: 'error',
        code: 'L2',
        message: '',
      });
    }
  }

  /**
   * Check title tag
   * @param {string} textContent
   * @returns {void}
   */
  /* checkTitle({ textContent }, siteName) {
    if (!textContent) {
      this.setRaport({
        what: 'tytuł',
        category: 'general',
        type: 'error',
        code: 'T1',
        message: '',
      });
    } else if (!textContent.includes(siteName)) {
      this.setRaport({
        what: 'tytuł',
        category: 'general',
        type: 'warning',
        code: 'T2',
        message: '',
      });
    }
  }

  /**
   * Check semantic navbar and list in navbar
   * @param {Array<Node>} nav
   * @returns {void|boolean}
   */
  /* checkNav(nav) {
    if (nav.length < 1) {
      this.setRaport({
        what: 'nawigacja',
        category: 'semantic',
        type: 'warning',
        code: 'N1',
        message: '',
      });

      return false;
    }

    const list = nav[0].getElementsByTagName('ul');

    if (list.length < 1) {
      this.setRaport({
        what: 'nawigacja',
        category: 'semantic',
        type: 'warning',
        code: 'N2',
        message: '',
      });
    }
  }

  /**
   * Check semantic footer
   * @param {number} length
   * @returns {void}
   */
  /* checkFooter({ length }) {
    if (length < 1) {
      this.setRaport({
        what: 'stopka',
        category: 'semantic',
        type: 'warning',
        code: 'F1',
        message: '',
      });
    }
  }

  /**
   * Each section must have header
   * @param {Array<Node>} section
   * @returns {void}
   */
  /* checkSection(section) {
    if (section.length > 0) {
      section.forEach((item) => {
        for (let i = 0; i < 6; i++) {
          const header = item.getElementsByTagName(`h${i + 1}`);

          if (header.length > 0) {
            break;
          } else if (header.length < 1 && i === 5) {
            this.setRaport({
              what: 'sekcja nie ma headera',
              category: 'semantic',
              type: 'error',
              code: 'H1',
              message: `Element: ${item.outerHTML}`,
            });
          }
        }
      });
    }
  }

  /**
   * Table should have thead and tbody
   * @param {Array<Node>} elements
   * @returns {void}
   */
  /* checkTable(elements) {
    if (elements.length > 0) {
      elements.forEach((table) => {
        const thead = table.getElementsByTagName('thead');
        const tbody = table.getElementsByTagName('tbody');

        if (tbody.length > 0 && thead.length < 1) {
          this.setRaport({
            what: 'tabela nie ma thead',
            category: 'semantic',
            type: 'error',
            code: 'T3',
            message: `Element: ${table.outerHTML}`,
          });
        }
      });
    }
  }

  /**
   * Figure should have figcaption
   * @param {Array<Node>} figures
   * @returns {void}
   */
  /* checkFigure(figures) {
    if (figures.length > 0) {
      figures.forEach((figure) => {
        const caption = figure.getElementsByTagName('figcaption');

        if (caption.length < 1) {
          this.setRaport({
            what: 'brak figcaption',
            category: 'semantic',
            type: 'warning',
            code: 'F2',
            message: `Element:${figure.outerHTML} `,
          });
        }
      });
    }
  }

  /**
   *Icon should not be in i tag
   * @param {Array<Node>} icons
   * @returns {void}
   */
  /* checkIcon(icons) {
    if (icons.length > 0) {
      icons.forEach((icon) => {
        const classIcon = icon.getAttribute('class')
          ? icon.getAttribute('class')
          : '';
        const haveSVG = !!icon.getElementsByTagName('svg').length;

        if (
          classIcon.includes('icon')
          || classIcon.includes('fas')
          || classIcon.includes('far')
          || classIcon.includes('fal')
          || classIcon.includes('fad')
          || classIcon.includes('fab')
          || haveSVG
        ) {
          this.setRaport({
            what: 'ikona',
            category: 'semantic',
            type: 'error',
            code: 'I1',
            message: `Element ${icon.outerHTML}`,
          });
        }
      });
    }
  }

  /**
   * Each site should have exactly 1 main tag
   * @param {number} length
   * @returns {void}
   */
  /* checkMain({ length }) {
    if (length < 1 || length > 1) {
      this.setRaport({
        what: 'main',
        category: 'semantic',
        type: 'error',
        code: 'M1',
        message: `${length}`,
      });
    }
  }

  /**
   * Check headers hierarchy,repeatability
   * @param {Array<Node>} headers
   * @returns {void}
   */
  /* checkHeaders(...headers) {
    const headersArr = headers.flat(3);
    let h1 = 0;
    let h2 = 0;
    let h3 = 0;
    let h4 = 0;
    let h5 = 0;
    let h6 = 0;

    headersArr.forEach((header) => {
      if (header && Object.entries(header.el).length !== 0) {
        const { el } = header;
        if (el.includes('<h1')) h1++;
        if (el.includes('<h2')) h2++;
        if (el.includes('<h3')) h3++;
        if (el.includes('<h4')) h4++;
        if (el.includes('<h5')) h5++;
        if (el.includes('<h6')) h6++;
      }
    });

    if (h1 > 1 || h1 < 1) {
      this.setRaport({
        what: 'nagłówki',
        category: 'semantic',
        type: 'error',
        code: 'H2',
        message: `${h1}`,
      });
    }

    if (
      (h2 > 0 && h1 < 1)
      || (h3 > 0 && h2 < 1)
      || (h4 > 0 && h3 < 1)
      || (h5 > 0 && h4 < 1)
      || (h6 > 0 && h5 < 1)
    ) {
      this.setRaport({
        what: 'nagłówki',
        category: 'semantic',
        type: 'error',
        code: 'H3',
        message: '',
      });
    }
  }

  /**
   * Iframe must have title attr
   * @param {Array<Node>} iframeArr
   * @returns {void}
   */
  /* checkIframe(iframeArr) {
    if (iframeArr.length > 0) {
      iframeArr.forEach((iframe) => {
        if (iframe && !iframe.getAttribute('title')) {
          this.setRaport({
            what: 'title w iframe',
            category: 'semantic',
            type: 'error',
            code: 'I2',
            message: `Element: ${iframe.outerHTML}`,
          });
        }
      });
    }
  }

  /**
   * Check image alt
   * @param {Array<Node>} images
   * @returns {void}
   */
  /* checkImages(images) {
    if (images.length > 0) {
      images.forEach((img) => {
        const alt = img.getAttribute('alt') ? img.getAttribute('alt') : '';

        if (alt.length < 1) {
          this.setRaport({
            what: 'opis obrazka',
            category: 'image',
            type: 'error',
            code: 'I3',
            message: `${img.getAttribute('src')}`,
          });
        }
      });
    }
  }

  /**
   * Each svg must have title tag
   * @param {Array<Node>} svgArr
   * @returns {void}
   */
  /* checkSVG(svgArr) {
    if (svgArr.length > 0) {
      svgArr.forEach((svg) => {
        const parser = new Parser(svg.outerHTML);
        const title = parser.getElements('title');

        if (title.length < 1) {
          this.setRaport({
            what: 'tytuł w svg',
            category: 'image',
            type: 'error',
            code: 'S1',
            message: `Element: ${svg.outerHTML}`,
          });
        }
      });
    }
  }

  /**
   * Check links hrefs,aria-label, label, tabindex, focus,hover
   * @param {Array<Node>} elementsArr
   * @returns {void}
   */
  /* checkLinksAndButtons(elementsArr) {
    // links href
    if (elementsArr[0].length > 0) {
      elementsArr[0].forEach((element) => {
        if (element && element.el) {
          const parser = new Parser(element.el);
          const [link] = parser.getElements('a');

          if (link && !link.getAttribute('href')) {
            this.setRaport({
              what: 'uszkodzony href',
              category: 'general',
              type: 'error',
              code: 'A3',
              message: `Element: ${link.outerHTML}`,
            });
          }
        }
      });
    }

    // links and buttons
    const flatArr = elementsArr.flat();

    flatArr.forEach((item) => {
      if (item && item.el) {
        const parser = new Parser(item.el);
        const [element] = parser.getElements('a').length > 0
          ? parser.getElements('a')
          : parser.getElements('button');

        if (element && element.getAttribute('aria-label') === '') {
          this.setRaport({
            what: 'pusty aria-label',
            category: 'aria',
            type: 'warning',
            code: 'A4',
            message: `Element: ${element.outerHTML}`,
          });
        }

        if (
          element
          && element.getAttribute('tabindex')
          && element.getAttribute('tabindex') * 1 !== 0
        ) {
          this.setRaport({
            what: 'tabindex',
            category: 'devices',
            type: 'warning',
            code: 'A5',
            message: `Element: ${element.outerHTML}`,
          });
        }

        const image = parser.getElements('img').length > 0
          ? parser.getElements('img')[0]
          : null;

        const title = element ? element.getAttribute('title') : null;

        // BUG #2
        if (!item.textContent && !title && !image) {
          this.setRaport({
            what: 'brak etykiety',
            category: 'general',
            type: 'error',
            code: 'A6',
            message: `Element: ${item.el}`,
          });
        }

        if (!item.correctFocus) {
          this.setRaport({
            what: 'brak focusa',
            category: 'devices',
            type: 'warning',
            code: 'A7',
            message: `Element: ${item.el}`,
          });
        }
      }
    });
  }

  /**
   * Check inputs label, focus,hover
   * @param {Array<Node>} inputs
   * @returns {void}
   */
  /* checkInputs(inputs) {
    if (inputs.length > 0) {
      inputs.forEach((input) => {
        if (input && !input.inputLabel) {
          this.setRaport({
            what: 'brak etykiety',
            category: 'devices',
            type: 'error',
            code: 'A8',
            message: `Element: ${input.el}`,
          });

          if (!input.correctFocus) {
            this.setRaport({
              what: 'brak focusa',
              category: 'devices',
              type: 'warning',
              code: 'A9',
              message: `Element: ${input.outerHTML}`,
            });
          }
        }
      });
    }
  }

  /**
   * Check video and audio subtitles and check autoplay
   * @param {Array<Node>} elements
   * @returns {void}
   */
  /* checkVideoAndAudio(...elements) {
    const flatArr = elements.flat();

    if (flatArr.length > 0) {
      flatArr.forEach((element) => {
        const track = element.outerHTML.includes('track');
        const kindValid = element.outerHTML.includes('kind="subtitles"');
        const autoplay = element.outerHTML.includes('autoplay');

        if (!track) {
          this.setRaport({
            what: 'brak transkrypcji',
            category: 'devices',
            type: 'error',
            code: 'V1',
            message: ` ${element.outerHTML}`,
          });
        } else if (track && !kindValid) {
          this.setRaport({
            what: 'brak transkrypcji',
            category: 'devices',
            type: 'error',
            code: 'V2',
            message: `${element.outerHTML}`,
          });
        }

        if (autoplay) {
          this.setRaport({
            what: 'video autoplay',
            category: 'devices',
            type: 'warning',
            code: 'V3',
            message: `Element: ${element.outerHTML}`,
          });
        }
      });
    }
  }

  /**
   * Check video and audio subtitles and check autoplay
   * @param {Node} el -- probable popup
   * @returns {void}
   */
  /* checkPopup({ el = null }) {
    if (el !== null) {
      const tabindex = el.match(/tabindex=("([^"]|"")*")/i);
      const role = el.match(/role=("([^"]|"")*")/i);

      if (tabindex) {
        tabindex[1] = tabindex[1].replace(/"/g, '');
      }

      if (!tabindex || tabindex[1] < 0) {
        this.setRaport({
          what: 'popup',
          category: 'devices',
          type: 'error',
          code: 'P1',
          message: `Element: ${el}`,
        });
      } else if (
        !role
        || (role[1] !== '"dialog"' && role[1] !== '"document"')
      ) {
        this.setRaport({
          what: 'popup',
          category: 'devices',
          type: 'error',
          code: 'P2',
          message: `Element: ${el}`,
        });
      }
    }
  } */
}

export default SiteValidate;
