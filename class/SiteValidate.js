const { parsed: config } = require("dotenv").config();
const Nightmare = require("nightmare");
const AbstractValidator = require("./AbstractValidator");
const electron = require("../node_modules/electron");
const Parser = require("./Parser");

class SiteValidate extends AbstractValidator {
  constructor(url) {
    super();
    this.url = url;
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
      .evaluate(() => document.querySelector("html").outerHTML)
      .end()
      .then(res => this.processDOM(res))
      .catch(error => {
        throw Error(error);
      });
  }

  processDOM(html) {
    const parser = new Parser(html, this.url);

    // trzeba by było dodać jakoś do wysywanych okien znaczniki aria
    // skip linki
    // pauza anumacji
    // mechanizm validacji błędów powinien mieć odpowiednie tagi aria
    // sprawdzenie czy atrybuty role nie są nakładane na semantycznyczny html
    // title

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
    this.checkImages(parser.getElements("img"));
    this.checkIcon(parser.getElements("i"));

    /*  
     this.checkHeaders(parser.getElements("h1"), parser.getElements("h2"), parser.getElements("h3"), parser.getElements("h4"), parser.getElements("h5"), parser.getElements("h6")); // sprawdzenie hierarchi i powtarzalności, wielkości liter
    this.checkLinks(parser.getElements("a")); // sprawdzenie hrefów,aria label i czy znacznik ma etykietę, tabindex, focus,hover
    this.checkButtons(parser.getElements("button")); // sprawdzenie hrefów,aria label i czy znacznik ma etykietę, tabindex, focus,hover
    this.checkMain(parser.getElements("main")); // sprawdzenie czy występuje 1 main
    this.checkInputs(parser.getElements("input")); // sprawdzenie czy KAŻDY input mam label,focus,hover
    this.checkLabel(parser.getElements("label")); // sprawdzenie czy kazdy label ma inputa
    this.checkLetters(parser.getElements("p"), parser.getElements("span")); // sprawdzenie wielkości liter */
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
        what: "lang",
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
        what: "title",
        type: "error",
        message: "Pusty tag title"
      });
    }
  }

  /*
   * Check semantic navbar and list in navbar
   */
  checkNav(nav) {
    if (!nav.length > 0) {
      this.setRaport({
        what: "navbar",
        type: "warning",
        message: "Brak semantycznego navbaru na stronie!"
      });
    } else {
      const list = nav[0].getElementsByTagName("ul");

      if (!list) {
        this.setRaport({
          what: "navbar",
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
        what: "footer",
        type: "warning",
        message: "Brak semantycznej stopki strony"
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
              what: "section",
              type: "error",
              message: `Każda sekcja musi mieć header. Element class: ${item.getAttribute(
                "class"
              )}, element id: ${item.getAttribute("id")}`
            });
          }
        }
      });
    }
  }

  /*
   * Check image alt, if img is in figure and figcaption is declared image should not have alt
   */
  checkImages(images) {}

  /*
   *Icon should not be in i tag
   */
  checkIcon(icons) {}
}

module.exports = SiteValidate;
