const { ipcRenderer } = require("electron");
// eslint-disable-next-line import/no-dynamic-require
const serializeForm = require(`${process.cwd()}/script/serialize`);

const form = document.querySelector("#form_url");
const { body } = document;

/*
 * If url correct turn on loading screen
 */
const appendSpinner = () => {
  body.innerHTML = "";
  const spinner = document.createElement("div");
  const info = document.createElement("p");
  const wrapper = document.createDocumentFragment();

  spinner.classList.add("spinner");
  info.textContent = "Proszę czekać...";

  wrapper.append(spinner);
  wrapper.append(info);

  body.append(wrapper);
};

/*
 * Validate data from form and send to electron class
 */
const getUrl = e => {
  e.preventDefault();
  const data = serializeForm(form);
  const validURL = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/.test(
    data.url
  );

  if (validURL) {
    ipcRenderer.send("url", data.url);
    appendSpinner();
  }
};

form.addEventListener("submit", getUrl);
