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

    // trzeba by było dodać jakoś do wysywanych okien znaczniki aria
    // skip linki
    // pauza anumacji
    // mechanizm validacji błędów powinien mieć odpowiednie tagi aria
    // sprawdzenie czy atrybuty role nie są nakładane na semantycznyczny html
    // title
    /*  
    this.checkLinks(parser.getElements("a")); // sprawdzenie hrefów,aria label i czy znacznik ma etykietę, tabindex, focus,hover
    this.checkButtons(parser.getElements("button")); // aria label i czy znacznik ma etykietę, tabindex, focus,hover
    this.checkInputs(parser.getElements("input")); // sprawdzenie czy KAŻDY input mam label,focus,hover
    this.checkLabel(parser.getElements("label")); // sprawdzenie czy kazdy label ma inputa
    this.checkLetters(parser.getElements("p"), parser.getElements("span")); // sprawdzenie wielkości liter */

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

    this.finish = true;
  }

  /*
   * Check element/backgroung contrast. Good contrast is greater than 8
   */
  checkContrast(css, p, span, ...headers) {
    // dużo logiki do napisania
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
   * Check title tag.
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
            message: `Element <figure> o klasie ${figure.getAttribute(
              "class"
            )} nie ma tagu <figcaption>`
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
            what: "ikony",
            category: "semantic",
            type: "error",
            message: `Znacznik <i> nie służy do osadzania ikon! Element o klasie ${classIcon}`
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
   * Check headers hierarchy,repeatability       TODO WIELKOŚĆ LITER
   */
  checkHeaders(...headers) {}
}

module.exports = SiteValidate;
