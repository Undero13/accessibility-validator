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
    const parser = new Parser(html);

    // trzeba by było dodać jakoś do wysywanych okien znaczniki aria
    // skip linki
    // pauza anumacji
    // mechanizm validacji błędów powinien mieć odpowiednie tagi aria
    // sprawdzenie czy atrybuty role nie są nakładane na semantycznyczny html
    // title
    this.checkLang(parser.getElement("html")); // sprawdzanie języka

    // powyzej 8
    this.checkContrast(
      parser.getElement("p"),
      parser.getElement("span"),
      parser.getElement("h1"),
      parser.getElement("h2"),
      parser.getElement("h3"),
      parser.getElement("h4"),
      parser.getElement("h5"),
      parser.getElement("h6")
    );

    /* this.checkImages(parser.getElement("img")); // sprawdzenie altów jeśli w figure to nie musi ich być
    this.checkHeaders(parser.getElement("h1"), parser.getElement("h2"), parser.getElement("h3"), parser.getElement("h4"), parser.getElement("h5"), parser.getElement("h6")); // sprawdzenie hierarchi i powtarzalności, wielkości liter
    this.checkLinks(parser.getElement("a")); // sprawdzenie hrefów,aria label i czy znacznik ma etykietę, tabindex, focus,hover
    this.checkButtons(parser.getElement("button")); // sprawdzenie hrefów,aria label i czy znacznik ma etykietę, tabindex, focus,hover
    this.checkMain(parser.getElement("main")); // sprawdzenie czy występuje 1 main
    this.checkInputs(parser.getElement("input")); // sprawdzenie czy KAŻDY input mam label,focus,hover
    this.checkLabel(parser.getElement("label")); // sprawdzenie czy kazdy label ma inputa
    this.checkLetters(parser.getElement("p"), parser.getElement("span")); // sprawdzenie wielkości liter
    this.checkIcon(parser.getElement("i")); // sprawdzenie czy ktoś nie osadza ikon jako znacznik i
    this.checkTitle("title"); // sprawdzenie tytułu strony
    this.checkSection(parser.getElement("section")); // każda sekcja powinna mieć nagłówek
    this.checkFooter(parser.getElement("footer")); // sprawdzenie czy strona ma footer i czy jest semantyczny
    this.checkFooter(parser.getElement("nav")); // sprawdzenie czy strona ma nav i czy jest semantyczny */
  }

  /*
   * Check element/backgroung contrast
   */
  checkContrast(p, span, ...headers) {}

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
}

module.exports = SiteValidate;
