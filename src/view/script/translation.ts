/* eslint-disable @typescript-eslint/camelcase */
const LocalizerModule = require('electron-localizer');
const { parsed: config } = require('dotenv').config();

new LocalizerModule({
  locales_directory: `${__dirname}/../../../locales`,
  locale: config.LANG,
});
