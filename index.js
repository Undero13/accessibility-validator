/*
 * @author Patryk Loter <patryk.loter@gmail.com>
 * @version 1.0.0
 * class for dynamic main window(create,close,menu,event)
 */

const { parsed: config } = require("dotenv").config();
const {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  ipcMain,
  dialog
} = require("electron");
const SiteValidate = require("./class/SiteValidate");

class Window {
  constructor() {
    this.window = null;
    this.windowInfo = null;

    this.setListeners();
    this.setMenu();
  }

  setListeners() {
    app.on("ready", () => this.createMainWindow());

    app.on("window-all-closed", () =>
      process.platform !== "darwin" ? app.quit() : null
    );

    app.on("activate", () =>
      this.window === null ? this.createMainWindow() : null
    );

    // make raport
    ipcMain.on("url", (event, arg) => {
      const validator = new SiteValidate(arg);

      const id = setInterval(() => {
        if (validator.finish && !validator.error) {
          this.window.loadFile("view/raport.html");

          setTimeout(() => {
            this.window.webContents.send("raport", validator.getRaport());
          }, 500);

          clearInterval(id);
        } else if (validator.error) {
          this.window.loadFile("view/index.html");

          const response = dialog.showMessageBox({
            message: `Podałeś błedny URL: ${arg}`,
            buttons: ["OK"]
          });

          console.log(response);
          clearInterval(id);
        }
      }, 5000);
    });

    // next analize
    ipcMain.on("return", () => this.window.loadFile("view/index.html"));
    ipcMain.on("info", () => this.createInfoWindow());
  }

  /*
   * Menu for developers.
   */
  setMenu() {
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

  createMainWindow() {
    this.window = new BrowserWindow({
      width: config.WINDOW_WIDTH,
      height: config.WINDOW_HEIGHT,
      webPreferences: {
        nodeIntegration: true
      }
    });

    this.window.loadFile("view/index.html");
    this.window.on("close", () => {
      this.window = null;
      app.quit();
    });
  }

  createInfoWindow() {
    this.windowInfo = new BrowserWindow({
      width: config.WINDOW_WIDTH,
      height: config.WINDOW_HEIGHT,
      webPreferences: {
        nodeIntegration: true
      }
    });

    this.windowInfo.loadFile("view/info.html");
    this.windowInfo.on("close", () => {
      this.windowInfo = null;
    });
  }
}

new Window();
