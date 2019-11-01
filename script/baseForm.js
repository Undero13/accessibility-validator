const { ipcRenderer } = require("electron");
// eslint-disable-next-line import/no-dynamic-require
const serializeForm = require(`${process.cwd()}/script/serialize`);

const form = document.querySelector("#form_url");
const alert = document.querySelector("#alert");
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
  info.classList.add("has-text-white");
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

  if (!/(http(s?)):\/\//gi.test(data.url)) {
    data.url = `http://${data.url}`;
  }

  const validURL = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g.test(
    data.url
  );

  if (validURL) {
    ipcRenderer.send("url", data.url);
    appendSpinner();
  } else {
    alert.classList.remove("is-invisible");
  }
};

form.addEventListener("submit", getUrl);
