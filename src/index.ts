/**
 * @author Patryk Undero Loter <patryk.loter@gmail.com>
 * @version 2.0.0
 * class for dynamic main window(create,close,menu,event)
 */

import {
  app, IpcMainEvent, BrowserWindow, Menu, MenuItem, ipcMain, dialog,
} from 'electron';
import SiteValidate from './controllers/SiteValidate';

import dotenv = require('dotenv')
dotenv.config({ path: `${__dirname}/../.env` });


class MainWindow {
  private window: BrowserWindow;
  private windowInfo: BrowserWindow;

  constructor() {
    this.window = null;
    this.windowInfo = null;

    this.setWinListeners();
    this.setOutsiteListeners();
    this.setMenu();
  }

  /**
   * Wait for validator finish
   */
  observable(validator: SiteValidate): void {
    const id = setInterval(() => {
      if (validator.getFinish()) {
        if (validator.getError()) {
          this.window.loadFile(`${__dirname}/view/template/index.html`);

          const response = dialog.showMessageBox({
            message: `Podałeś błedny URL: ${validator.getURL()}`,
            buttons: ['OK'],
          });

          console.log(response);
        } else {
          this.window.loadFile(`${__dirname}/view/template/raport.html`);
        }
        clearInterval(id);
      }
    }, 500)
  }

  setWinListeners(): void {
    // electron start event
    app.on('ready', () => this.createMainWindow());

    // electron close all event
    app.on('window-all-closed', () => (process.platform !== 'darwin' ? app.quit() : null));

    // electron active event
    app.on('activate', () => (this.window === null ? this.createMainWindow() : null));
  }

  setOutsiteListeners(): void {
    // Start validate site
    ipcMain.on('url', (event: IpcMainEvent, arg: UrlEventModel) => this.observable(new SiteValidate(arg)));

    // next site analize event
    ipcMain.on('return', () => this.window.loadFile(`${__dirname}/view/template/index.html`));
  }

  /**
   * Only for developers
   */
  setMenu(): void {
    const menu = new Menu();

    menu.append(
      new MenuItem({
        label: 'Debug',
        accelerator: 'F12',
        click: (): void => this.window.webContents.openDevTools(),
      }),
    );
    menu.append(
      new MenuItem({
        label: 'Reload',
        accelerator: 'F5',
        click: (): void => this.window.reload(),
      }),
    );

    if (process.env.DEV_ENV) {
      Menu.setApplicationMenu(menu);
    } else {
      Menu.setApplicationMenu(null);
    }
  }

  createMainWindow(): void {
    this.window = new BrowserWindow({
      width: parseInt(process.env.WINDOW_WIDTH, 10),
      height: parseInt(process.env.WINDOW_HEIGHT, 10),
      webPreferences: {
        nodeIntegration: true,
      },
    });

    this.window.loadFile(`${__dirname}/view/template/index.html`);

    this.window.on('close', () => {
      this.window = null;
      return process.platform !== 'darwin' ? app.quit() : null;
    });
  }

  createInfoWindow(): void {
    this.windowInfo = new BrowserWindow({
      width: parseInt(process.env.WINDOW_WIDTH, 10),
      height: parseInt(process.env.WINDOW_HEIGHT, 10),
      webPreferences: {
        nodeIntegration: true,
        preload: './preload.js',
      },
    });

    this.windowInfo.loadFile(`${__dirname}/view/info.html`);
    this.windowInfo.on('close', () => {
      this.windowInfo = null;
    });
  }
}

new MainWindow();
