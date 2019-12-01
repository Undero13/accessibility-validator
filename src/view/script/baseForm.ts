import { ipcRenderer } from 'electron';
import serializeForm from '../script/serialize'

const form: HTMLFormElement = document.querySelector('#form_url');
const alert1 = document.querySelector('#alert');
const { body } = document;

/*
 * If url correct turn on loading screen
 */
const appendSpinner = (): void => {
  body.innerHTML = '';
  const spinner = document.createElement('div');
  const info = document.createElement('p');
  const wrapper = document.createDocumentFragment();

  spinner.classList.add('spinner');
  info.classList.add('has-text-white');
  info.innerHTML = '<localized-text>Proszę czekać...</localized-text>';

  wrapper.append(spinner);
  wrapper.append(info);

  body.append(wrapper);
};

/*
 * Validate data from form and send to electron class
 */
const getURL = (e: Event): void => {
  e.preventDefault();
  const data = serializeForm(form);

  if (!data) {
    alert1.classList.remove('is-invisible');
    return;
  }

  if (!/(http(s?)):\/\//gi.test(data.url)) {
    data.url = `http://${data.url}`;
  }

  if (data.url[data.url.length - 1] !== '/') {
    data.url = `${data.url}/`;
  }

  const validURL = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g.test(
    data.url,
  );

  if (validURL) {
    ipcRenderer.send('url', {
      url: data.url,
      device: data.device.toUpperCase(),
    });
    appendSpinner();
  } else {
    alert1.classList.remove('is-invisible');
  }
};

form.addEventListener('submit', getURL);
