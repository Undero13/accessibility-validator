/* eslint-disable @typescript-eslint/camelcase */
const LocalizerModule = require('electron-localizer');
const config = require('dotenv').config({ path: `${__dirname}/../../../.env` });

new LocalizerModule({
  locales_directory: `${__dirname}/../../../locales`,
  locale: process.env.APPLANG,
});
