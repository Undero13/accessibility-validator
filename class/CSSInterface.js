// TODO napisać obsługę css klass
class CSSInterface {
  constructor({ rules }) {
    this.css = rules;
  }

  /*
   * change inline style to js object
   */
  textToObject(style) {
    const propertiesArr = style.split(";");
    const object = {};

    propertiesArr.forEach(property => {
      if (property !== "") {
        const part = property.split(":");
        const key = part[0].replace(" ", "");
        const value = part[1].replace(" ", "");
        object[key] = value;
      }
    });

    return object || null;
  }
}

module.exports = CSSInterface;
