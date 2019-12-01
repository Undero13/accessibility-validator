/* eslint-disable @typescript-eslint/camelcase */
const LocalizerModule = require('electron-localizer');

const { remote } = window.require('electron');

new LocalizerModule({
  locales_directory: `${__dirname}/../../../locales`,
  locale: remote.process.env.APPLANG,
});
