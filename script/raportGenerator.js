const { ipcRenderer } = require("electron");

ipcRenderer.on("raport", (event, raport) => {
  console.log(event);
  console.log(raport);
});
