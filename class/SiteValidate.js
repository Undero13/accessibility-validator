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
      parser.getCSS(),
      parser.getElement("p"),
      parser.getElement("span"),
      parser.getElement("h1"),
      parser.getElement("h2"),
      parser.getElement("h3"),
      parser.getElement("h4"),
      parser.getElement("h5"),
      parser.getElement("h6")
    );
    this.checkLang(parser.getElement("html"));
    this.checkTitle(parser.getHeadTitle());
    this.checkNav(parser.getElement("nav"));
    this.checkFooter(parser.getElement("footer"));
    this.checkSection(parser.getElement("section"));
    this.checkImages(parser.getElement("img"));
    this.checkIcon(parser.getElement("i"));

    /*  
     this.checkHeaders(parser.getElement("h1"), parser.getElement("h2"), parser.getElement("h3"), parser.getElement("h4"), parser.getElement("h5"), parser.getElement("h6")); // sprawdzenie hierarchi i powtarzalności, wielkości liter
    this.checkLinks(parser.getElement("a")); // sprawdzenie hrefów,aria label i czy znacznik ma etykietę, tabindex, focus,hover
    this.checkButtons(parser.getElement("button")); // sprawdzenie hrefów,aria label i czy znacznik ma etykietę, tabindex, focus,hover
    this.checkMain(parser.getElement("main")); // sprawdzenie czy występuje 1 main
    this.checkInputs(parser.getElement("input")); // sprawdzenie czy KAŻDY input mam label,focus,hover
    this.checkLabel(parser.getElement("label")); // sprawdzenie czy kazdy label ma inputa
    this.checkLetters(parser.getElement("p"), parser.getElement("span")); // sprawdzenie wielkości liter */
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
  checkLang(html) {
    const lang = html.getAttribute("lang");

    if (!lang) {
      this.raport.push({
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
      this.raport.push({
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
    if (!nav) {
      this.raport.push({
        what: "navbar",
        type: "warning",
        message: "Brak semantycznego navbaru na stronie!"
      });
    } else {
      const list = nav.getElementsByTagName("ul");

      if (!list) {
        this.raport.push({
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
    if (!footer) {
      this.raport.push({
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
    if (section.length > 1) {
      section.forEach(item => {
        for (let i = 0; i < 6; i++) {
          const header = item.getElementsByTagName(`h${i + 1}`);

          if (header) {
            break;
          } else if (!header && i === 5) {
            this.raport.push({
              what: "section",
              type: "error",
              message: `Każda sekcja musi mieć header. Element class: ${item.getAttribute(
                "class"
              )}, element id: ${item.getAttribute("id")}`
            });
          }
        }
      });
    } else if (section.length === 1) {
      for (let i = 0; i < 6; i++) {
        const header = section.getElementsByTagName(`h${i + 1}`);

        if (header) {
          break;
        } else if (!header && i === 5) {
          this.raport.push({
            what: "section",
            type: "error",
            message: `Każda sekcja musi mieć header. Element class: ${section.getAttribute(
              "class"
            )}, element id: ${section.getAttribute("id")}`
          });
        }
      }
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
