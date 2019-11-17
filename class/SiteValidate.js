const Color = require("color");
const { parsed: config } = require("dotenv").config();
const AbstractValidator = require("./AbstractValidator");
const Parser = require("./Parser");

class SiteValidate extends AbstractValidator {
  constructor(url, test = false) {
    super();
    this.url = url;
    this.finish = false;
    this.error = false;
    this.raport = [];

    if (!test) {
      Parser.getDOMFromURL(this.url)
        .then(data => this.processDOM(data))
        .catch(e => {
          if (config.DEV_ENV) {
            return console.log(e);
          }

          this.error = true;
          this.finish = true;
        });
    }
  }

  /*
   * Trigger validate methods
   */
  processDOM(html) {
    const parser = new Parser(html.DOM);

    // category:general,semantic,image,contrast,animation,devices,aria

    this.checkContrast(
      [html.p, html.span, html.link, html.button],
      [html.h1, html.h2, html.h3, html.h4, html.h5, html.h6]
    );
    this.checkLetter(
      [html.p, html.span, html.link, html.button],
      [html.h1, html.h2, html.h3, html.h4, html.h5, html.h6]
    );
    this.checkAnimation(html.animate);
    this.checkLang(parser.getElements("html"));
    this.checkTitle(parser.getHeadTitle());
    this.checkNav(parser.getElements("nav"));
    this.checkFooter(parser.getElements("footer"));
    this.checkSection(parser.getElements("section"));
    this.checkFigure(parser.getElements("figure"));
    this.checkIcon(parser.getElements("i"));
    this.checkMain(parser.getElements("main"));
    this.checkImages(parser.getElements("img"));
    this.checkSVG(parser.getElements("svg"));
    this.checkIframe(parser.getElements("iframe"));
    this.checkHeaders(html.h1, html.h2, html.h3, html.h4, html.h5, html.h6);
    this.checkLinksAndButtons([html.link, html.button]);
    this.checkInputs(html.input);
    this.checkVideoAndAudio(
      parser.getElements("video"),
      parser.getElements("audio")
    );

    this.finish = true;
  }

  /*
   * Check element/backgroung contrast. Good contrast is greater than 4.5.
   */
  checkContrast(...elements) {
    const elementsFlat = elements.flat(2);

    elementsFlat.forEach(element => {
      if (element) {
        const { el, color, background } = element;
        const colorFirst = Color(background);
        const contrast = colorFirst.contrast(Color(color));

        if (contrast < 4.5) {
          this.setRaport({
            what: "kontrast",
            category: "contrast",
            type: "warning",
            message: `Zalecany kontrast dla elementów to powyżej 4.5. Wykryto ${contrast.toFixed(
              2
            )} dla ${el}`
          });
        }
      }
    });
  }

  /*
   * Check font-size
   */
  checkLetter(...elements) {
    const elementsFlat = elements.flat(2);

    elementsFlat.forEach(element => {
      if (element) {
        // trzeba przemyśleć czy ta funkcja w ogóle ma sens bo czytelność czcionki na serwisie jest kwestią bardzo umowną i subiektywną oraz zależną od wielu czynników nie tylko technologicznych ale i personalnych
        // według standardów tekst powiększony do 200% nie powinien rozwalać strony i dalej być czytelny
        // ponadto na różnych urządeniach (desktopy, mobilki i tablety) wielkość fontów powinna być różna
      }
    });
  }

  /*
   * Check animation gleam (no more than 3 times per 1 sec) - nightmareLib
   */
  checkAnimation(elements) {
    if (elements.length > 0) {
      elements.forEach(element =>
        this.setRaport({
          what: "animacja",
          category: "animation",
          type: "error",
          message: `Nieprawidłowa animacja dla elementu: ${element}`
        })
      );
    }
  }

  /*
   * Check html lang attribute
   */
  checkLang([html]) {
    const lang = html.getAttribute("lang");

    if (!lang) {
      this.setRaport({
        what: "język",
        category: "general",
        type: "error",
        message: "Brak określonego atrybutu lang"
      });
    }
  }

  /*
   * Check title tag
   */
  checkTitle({ textContent }) {
    if (!textContent) {
      this.setRaport({
        what: "tytuł",
        category: "general",
        type: "error",
        message: "Pusty tag <title>"
      });
    }
  }

  /*
   * Check semantic navbar and list in navbar
   */
  checkNav(nav) {
    if (nav.length < 1) {
      this.setRaport({
        what: "nawigacja",
        category: "semantic",
        type: "warning",
        message: "Brak semantycznego tagu <nav> na stronie!"
      });

      return false;
    }

    const list = nav[0].getElementsByTagName("ul");

    if (list.length < 1) {
      this.setRaport({
        what: "nawigacja lista",
        category: "semantic",
        type: "warning",
        message: "Elementy w navbarze powinny być listą"
      });
    }
  }

  /*
   * Check semantic footer
   */
  checkFooter({ length }) {
    if (length < 1) {
      this.setRaport({
        what: "stopka",
        category: "semantic",
        type: "warning",
        message: "Brak semantycznej tagu <footer>"
      });
    }
  }

  /*
   * Each section must have header
   */
  checkSection(section) {
    if (section.length > 0) {
      section.forEach(item => {
        for (let i = 0; i < 6; i++) {
          const header = item.getElementsByTagName(`h${i + 1}`);

          if (header.length > 0) {
            break;
          } else if (header.length < 1 && i === 5) {
            this.setRaport({
              what: "sekcja nie ma headera",
              category: "semantic",
              type: "error",
              message: `Każda sekcja musi mieć header. Element: ${item.outerHTML}`
            });
          }
        }
      });
    }
  }

  /*
   * Figure should have figcaption
   */
  checkFigure(figures) {
    if (figures.length > 0) {
      figures.forEach(figure => {
        const caption = figure.getElementsByTagName("figcaption");

        if (caption.length < 1) {
          this.setRaport({
            what: "brak figcaption",
            category: "semantic",
            type: "warning",
            message: `Element <figure> nie ma tagu <figcaption> ${figure.outerHTML} `
          });
        }
      });
    }
  }

  /*
   *Icon should not be in i tag
   */
  checkIcon(icons) {
    if (icons.length > 0) {
      icons.forEach(icon => {
        const classIcon = icon.getAttribute("class")
          ? icon.getAttribute("class")
          : "";
        const haveSVG = !!icon.getElementsByTagName("svg").length;

        if (
          classIcon.includes("icon") ||
          classIcon.includes("fas") ||
          classIcon.includes("far") ||
          classIcon.includes("fal") ||
          classIcon.includes("fad") ||
          classIcon.includes("fab") ||
          haveSVG
        ) {
          this.setRaport({
            what: "ikona",
            category: "semantic",
            type: "error",
            message: `Znacznik <i> nie służy do osadzania ikon! Element ${icon.outerHTML}`
          });
        }
      });
    }
  }

  /*
   * Each site should have exactly 1 main tag
   */
  checkMain({ length }) {
    if (length < 1 || length > 1) {
      this.setRaport({
        what: "main",
        category: "semantic",
        type: "error",
        message: `Każda podstrona powinna mieć 1 znacznik <main>. Znaleziono:${length}`
      });
    }
  }

  /*
   * Check headers hierarchy,repeatability
   */
  checkHeaders(...headers) {
    const headersArr = headers.flat(3);
    let h1 = 0;
    let h2 = 0;
    let h3 = 0;
    let h4 = 0;
    let h5 = 0;
    let h6 = 0;

    headersArr.forEach(header => {
      if (header && Object.entries(header.el).length !== 0) {
        const { el } = header;
        if (el.includes("<h1")) h1++;
        if (el.includes("<h2")) h2++;
        if (el.includes("<h3")) h3++;
        if (el.includes("<h4")) h4++;
        if (el.includes("<h5")) h5++;
        if (el.includes("<h6")) h6++;
      }
    });

    if (h1 > 1 || h1 < 1) {
      this.setRaport({
        what: "nagłówki",
        category: "semantic",
        type: "error",
        message: `Każda podstrona powinna mieć 1 znacznik <h1>. Znaleziono:${h1}`
      });
    }

    if (
      (h2 > 0 && h1 < 1) ||
      (h3 > 0 && h2 < 1) ||
      (h4 > 0 && h3 < 1) ||
      (h5 > 0 && h4 < 1) ||
      (h6 > 0 && h5 < 1)
    ) {
      this.setRaport({
        what: "nagłówki",
        category: "semantic",
        type: "error",
        message: `Zachwiana hierarchia nagłówków na stronie`
      });
    }
  }

  /*
   * Iframe must have title attr
   */
  checkIframe(iframeArr) {
    if (iframeArr.length > 0) {
      iframeArr.forEach(iframe => {
        if (iframe && !iframe.getAttribute("title")) {
          this.setRaport({
            what: "title w iframe",
            category: "semantic",
            type: "error",
            message: `Brak atrybutu title dla <iframe>. Element: ${iframe.outerHTML}`
          });
        }
      });
    }
  }

  /*
   * Check image alt
   */
  checkImages(images) {
    if (images.length > 0) {
      images.forEach(img => {
        const alt = img.getAttribute("alt") ? img.getAttribute("alt") : "";

        if (alt.length < 1) {
          this.setRaport({
            what: "opis obrazka",
            category: "image",
            type: "error",
            message: `Pusty alt obrazka. Ścieżka obrazka: ${img.getAttribute(
              "src"
            )}`
          });
        }
      });
    }
  }

  /*
   * Each svg must have title tag
   */
  checkSVG(svgArr) {
    if (svgArr.length > 0) {
      svgArr.forEach(svg => {
        const parser = new Parser(svg.outerHTML);
        const title = parser.getElements("title");

        if (title.length < 1) {
          this.setRaport({
            what: "title w svg",
            category: "image",
            type: "error",
            message: `Pusty <title> dla <svg>. Element: ${svg.outerHTML}`
          });
        }
      });
    }
  }

  /*
   * Check links hrefs,aria-label, label, tabindex, focus,hover
   */
  checkLinksAndButtons(elementsArr) {
    // links href
    if (elementsArr[0].length > 0) {
      elementsArr[0].forEach(element => {
        if (element && element.el) {
          const parser = new Parser(element.el);
          const [link] = parser.getElements("a");

          if (link && !link.getAttribute("href")) {
            this.setRaport({
              what: "uszkodzony href",
              category: "general",
              type: "error",
              message: `Element <a> ma uszkodzony atrybut href! Element: ${link.outerHTML}`
            });
          }
        }
      });
    }

    // links and buttons
    const flatArr = elementsArr.flat();

    flatArr.forEach(item => {
      if (item && item.el) {
        const parser = new Parser(item.el);
        const [element] =
          parser.getElements("a").length > 0
            ? parser.getElements("a")
            : parser.getElements("button");

        if (element && element.getAttribute("aria-label") === "") {
          this.setRaport({
            what: "pusty aria-label",
            category: "aria",
            type: "warning",
            message: `Element ma pusty atrybut aria-label! Element: ${element.outerHTML}`
          });
        }

        //  BUG#3
        if (
          element &&
          element.getAttribute("tabindex") &&
          element.getAttribute("tabindex") * 1 !== 0
        ) {
          this.setRaport({
            what: "tabindex",
            category: "devices",
            type: "warning",
            message: `Element ma zmienioną wartość tabindex! Element: ${element.outerHTML}`
          });
        }

        const image =
          parser.getElements("img").length > 0
            ? parser.getElements("img")[0]
            : null;

        // BUG #2
        if (!item.textContent && !element.getAttribute("title") && !image) {
          this.setRaport({
            what: "brak etykiety",
            category: "general",
            type: "error",
            message: `Element nie ma etykiety! Element: ${element.outerHTML}`
          });
        }

        if (!item.correctFocus) {
          this.setRaport({
            what: "brak focusa",
            category: "devices",
            type: "warning",
            message: `Element nie ma widocznego focusa! Element: ${element.outerHTML}`
          });
        }
      }
    });
  }

  /*
   * Check inputs label, focus,hover
   */
  checkInputs(inputs) {
    inputs.forEach(input => {
      if (input && !input.inputLabel) {
        this.setRaport({
          what: "brak etykiety",
          category: "devices",
          type: "error",
          message: `Input nie ma etykiety lub ma więcej niż 1! Element: ${input.el}`
        });

        if (!input.correctFocus) {
          this.setRaport({
            what: "brak focusa",
            category: "devices",
            type: "warning",
            message: `Element nie ma widocznego focusa! Element: ${input.outerHTML}`
          });
        }
      }
    });
  }

  /*
   * Check video and audio subtitles and check autoplay
   */
  checkVideoAndAudio(...elements) {
    const flatArr = elements.flat();

    if (flatArr.length > 0) {
      flatArr.forEach(element => {
        const track = element.outerHTML.includes("track");
        const kindValid = element.outerHTML.includes('kind="subtitles"');
        const autoplay = element.outerHTML.includes("autoplay");

        if (!track) {
          this.setRaport({
            what: "brak transkrypcji",
            category: "devices",
            type: "error",
            message: `Brak traansktypcji dla elementu: ${element.outerHTML}`
          });
        } else if (track && !kindValid) {
          this.setRaport({
            what: "brak transkrypcji",
            category: "devices",
            type: "error",
            message: `Brak traansktypcji dla elementu: ${element.outerHTML}`
          });
        }

        if (autoplay) {
          this.setRaport({
            what: "video autoplay",
            category: "devices",
            type: "warning",
            message: `Autoplay nie powinien być właczony. Element: ${element.outerHTML}`
          });
        }
      });
    }
  }
}

module.exports = SiteValidate;
