const { parsed: config } = require("dotenv").config();
const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require("electron");
const SiteValidate = require("./class/SiteValidate");

/*
 * @author Patryk Loter <patryk.loter@gmail.com>
 * @version 1.0.0
 * class for dynamic main window(create,close,menu,event)
 */
class Window {
  constructor() {
    this.window = null;

    this.setListeners();
    this.setMenu();
  }

  setListeners() {
    app.on("ready", () => this.createMainWindow());

    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("activate", () => {
      if (this.window === null) {
        this.createMainWindow();
      }
    });

    ipcMain.on("url", (event, arg) => {
      const validator = new SiteValidate(arg);
    });
  }

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
      width: config.width,
      height: config.height,
      webPreferences: {
        nodeIntegration: true
      }
    });

    this.window.loadFile("view/index.html");
    this.window.on("close", () => {
      this.window = null;
    });
  }
}

new Window();
