/* eslint-disable no-underscore-dangle */
const LocalizerModule = require("electron-localizer");
const { parsed: config } = require("dotenv").config();

new LocalizerModule({
  locales_directory: `${process.cwd()}/locales`,
  locale: config.LANG
});
