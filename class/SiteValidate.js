const { parsed: config } = require("dotenv").config();
const Nightmare = require("nightmare");
const AbstractValidator = require("./AbstractValidator");
const electron = require("../node_modules/electron");
const Parser = require("./Parser");

class SiteValidate extends AbstractValidator {
  constructor(url) {
    super();
    this.url = url;
    this.finish = false;
    this.raport = [];

    this.getDOM();
  }

  getDOM() {
    const nightmare = Nightmare({
      electronPath: electron,
      show: config.DEV_ENV
    });

    nightmare
      .goto(this.url)
      .wait(5000)
      .evaluate(() => {
        const { body } = document;
        body.scrollIntoView({ behavior: "smooth", block: "end" });
      })
      .wait(3000)
      .evaluate(() => document.querySelector("html").outerHTML)
      .end()
      .then(res => this.processDOM(res))
      .catch(error => {
        throw Error(error);
      });
  }

  processDOM(html) {
    const parser = new Parser(html, this.url);

    // category:general,semantic,image,contrast,letter,keybord,aria

    // UWAGI OGÓLNE elementy intereakywne są trudne do okodowania rozwiązaniem może być ponowne uzycie biblioteki nightmare - w ostateczności

    // trzeba by było dodać jakoś do wysywanych okien znaczniki aria
    // skip linki
    // pauza anumacji
    // mechanizm validacji błędów powinien mieć odpowiednie tagi aria
    // sprawdzenie czy atrybuty role nie są nakładane na semantycznyczny html
    // title
    /*  
    this.checkInputs(parser.getElements("input")); // sprawdzenie czy KAŻDY input mam label,focus,hover
    this.checkLabel(parser.getElements("label")); // sprawdzenie czy kazdy label ma inputa */

    this.checkContrast(
      parser.getCSSInterface(),
      parser.getElements("p"),
      parser.getElements("span"),
      parser.getElements("h1"),
      parser.getElements("h2"),
      parser.getElements("h3"),
      parser.getElements("h4"),
      parser.getElements("h5"),
      parser.getElements("h6")
    );
    this.checkLang(parser.getElements("html"));
    this.checkTitle(parser.getHeadTitle());
    this.checkNav(parser.getElements("nav"));
    this.checkFooter(parser.getElements("footer"));
    this.checkSection(parser.getElements("section"));
    this.checkFigure(parser.getElements("figure"));
    this.checkIcon(parser.getElements("i"));
    this.checkMain(parser.getElements("main"));
    this.checkImages(parser.getElements("img"));
    this.checkHeaders(
      parser.getElements("h1"),
      parser.getElements("h2"),
      parser.getElements("h3"),
      parser.getElements("h4"),
      parser.getElements("h5"),
      parser.getElements("h6")
    );

    this.checkLinksAndButtons([
      parser.getElements("a"),
      parser.getElements("button")
    ]);

    this.finish = true;
  }

  /*
   * Check element/backgroung contrast. Good contrast is greater than 8. Also check font-size
   */
  checkContrast(css, paragraphs, spans, ...headers) {
    paragraphs.forEach(p => this.elementContrast(css, p));
    spans.forEach(span => this.elementContrast(css, span));
    const headersArray = headers.flat(2);

    if (headersArray.length > 0) {
      headersArray.forEach(header => this.elementContrast(css, header));
    }
  }

  elementContrast(css, element) {
    return; // tymczasowo dopoki nie skończę funkcji
    // eslint-disable-next-line no-unreachable
    const style = element.getAttribute("style");
    let pseudoClass = style ? css.textToObject(style) : "";

    if (!pseudoClass || (!pseudoClass.color && pseudoClass["font-size"])) {
      const classData = element.getAttribute("class");

      if (classData) {
        // jesli są jakieś klasy trzeba ponownie rozbić je na pojedyncze lementy i wyciągnąć z nich właściwość color
      } else {
        // domyslny kolor przegladarek
        pseudoClass = { color: "black" };
      }

      // na tym etapie mamy kolor elementu ale potrzeba jeszcze koloru tła żeby je porównać. Jak go uzyskać?
      // do tego chyba będzie trzeba ponownie wykorzystać nightmara dom-parser sobie z tym nie poradzi
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
  checkTitle(title) {
    if (!title.textContent) {
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
    if (!nav.length > 0) {
      this.setRaport({
        what: "nawigacja",
        category: "semantic",
        type: "warning",
        message: "Brak semantycznego tagu <navbar> na stronie!"
      });
    } else {
      const list = nav[0].getElementsByTagName("ul");

      if (!list) {
        this.setRaport({
          what: "nawigacja lista",
          category: "semantic",
          type: "warning",
          message: "Elementy w navbarze powinny być listą"
        });
      }
    }
  }

  /*
   * Check semantic footer
   */
  checkFooter(footer) {
    if (!footer.length > 0) {
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
          } else if (!header < 1 && i === 5) {
            this.setRaport({
              what: `sekcja class:${item.getAttribute(
                "class"
              )}, id: ${item.getAttribute("id")}`,
              category: "semantic",
              type: "error",
              message: "Każda sekcja musi mieć header."
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
            what: "figcaption",
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
    const headersArr = headers.flat(2);
    let h1 = 0;
    let h2 = 0;
    let h3 = 0;
    let h4 = 0;
    let h5 = 0;
    let h6 = 0;

    headersArr.forEach(header => {
      if (header.outerHTML.includes("<h1")) h1++;
      if (header.outerHTML.includes("<h2")) h2++;
      if (header.outerHTML.includes("<h3")) h3++;
      if (header.outerHTML.includes("<h4")) h4++;
      if (header.outerHTML.includes("<h5")) h5++;
      if (header.outerHTML.includes("<h6")) h6++;
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
      (h6 > 0 || h5 < 1)
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
   * Check links hrefs,aria-label, label, tabindex, focus,hover
   */
  checkLinksAndButtons(elementsArr) {
    if (elementsArr.length > 0) {
      // links href
      if (elementsArr[0]) {
        elementsArr[0].forEach(link => {
          if (!link.getAttribute("href")) {
            this.setRaport({
              what: "uszkodzony href",
              category: "keybord",
              type: "error",
              message: `Element <a> ma uszkodzony atrybut href! Element: ${link.outerHTML}`
            });
          }
        });
      }

      // links and buttons
      const flatArr = elementsArr.flat();
      flatArr.forEach(element => {
        if (element.getAttribute("aria-label") === "") {
          this.setRaport({
            what: "pusty aria-label",
            category: "aria",
            type: "warning",
            message: `Element ma pusty atrybut aria-label! Element: ${element.outerHTML}`
          });
        }

        // to trzeba poprawić bo są sytuacje kiedy tabindex może być zmieniany
        if (element.getAttribute("tabindex") * 1 === 0) {
          this.setRaport({
            what: "tabindex",
            category: "semantic",
            type: "warning",
            message: `Element ma zmienioną wartość tabindex! Element: ${element.outerHTML}`
          });
        }
      });

      // problem będzie też z labelami
      // do hovera i focusa chyba będzie trzeba ponownie wykorzystać nightmara dom-parser sobie z tym nie poradzi
    }
  }
}

module.exports = SiteValidate;
