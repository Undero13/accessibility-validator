/* eslint-disable no-underscore-dangle */
const LocalizerModule = require("electron-localizer");
const { parsed: config } = require("dotenv").config({
  path: `${__dirname}/../.env`
});

new LocalizerModule({
  locales_directory: `${__dirname}/../locales`,
  locale: config.LANG
});
