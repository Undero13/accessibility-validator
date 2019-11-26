/**
 * @author Patryk Undero Loter <patryk.loter@gmail.com>
 * @version 2.0.0
 * class for dynamic main window(create,close,menu,event)
 */

import { app, IpcMainEvent, BrowserWindow, Menu, MenuItem, ipcMain, dialog } from "electron";
import SiteValidate from "./controllers/SiteValidate";

import UrlEventModel from "./model/urlEvent.model"
const { parsed: config } = require("dotenv").config(); //TODO: poszukać zamiennika

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

  setWinListeners(): void {
    // electron start event
    app.on("ready", () => this.createMainWindow());

    // electron close all event
    app.on("window-all-closed", () =>process.platform !== "darwin" ? app.quit() : null);

    // electron active event
    app.on("activate", () => this.window === null ? this.createMainWindow() : null);
  }

  setOutsiteListeners(): void {
    // make raport event
    ipcMain.on("url", (event: IpcMainEvent, arg: UrlEventModel) => {
        const validator = new SiteValidate(arg);

        const id = setInterval(() => {
            if (validator.finish && !validator.error) {
                this.window.loadFile("view/template/raport.html");

                setTimeout(() => {
                this.window.webContents.send("raport", validator.getRaport());
                }, 500);

                clearInterval(id);
            } else if (validator.error) {
                this.window.loadFile("view/template/index.html");

                const response = dialog.showMessageBox({
                message: `Podałeś błedny URL: ${arg.url}`,
                buttons: ["OK"]
                });

                console.log(response);
                clearInterval(id);
            }
        }, 5000);
    });

    // next site analize event
    ipcMain.on("return", () =>
        this.window.loadFile("./View/template/index.html")
    );
  }

  setMenu(): void {
    const menu = new Menu();

    menu.append(
      new MenuItem({
        label: "Debug",
        accelerator: "F12",
        click: () => this.window.webContents.openDevTools()
      })
    );
    menu.append(
      new MenuItem({
        label: "Reload",
        accelerator: "F5",
        click: () => this.window.reload()
      })
    );

    if (config.DEV_ENV) {
      Menu.setApplicationMenu(menu);
    } else {
      Menu.setApplicationMenu(null);
    }
  }

  /**
   * Create main electron window and set close app event
   * @returns {void}
   */
  createMainWindow() {
    this.window = new BrowserWindow({
      width: config.WINDOW_WIDTH,
      height: config.WINDOW_HEIGHT,
      webPreferences: {
        nodeIntegration: true,
      }
    });

    this.window.loadFile("view/template/index.html");
    this.window.on("close", () => {
      this.window = null;
      return process.platform !== "darwin" ? app.quit() : null;
    });
  }

  /**
   * Create info electron window and set close this window event
   * @returns {void}
   */
  createInfoWindow() {
    this.windowInfo = new BrowserWindow({
      width: config.WINDOW_WIDTH,
      height: config.WINDOW_HEIGHT,
      webPreferences: {
        nodeIntegration: true,
      }
    });

    this.windowInfo.loadFile("view/info.html");
    this.windowInfo.on("close", () => {
      this.windowInfo = null;
    });
  }
}

new MainWindow();
