import { ipcRenderer } from 'electron';
import RaportStore from '../../controllers/Raport'

const generalTable: HTMLTableElement = document.querySelector('#general');
const semanticTable: HTMLTableElement = document.querySelector('#semantic');
const ariaTable: HTMLTableElement = document.querySelector('#aria');
const imageTable: HTMLTableElement = document.querySelector('#image');
const contrastTable: HTMLTableElement = document.querySelector('#contrast');
const animationTable: HTMLTableElement = document.querySelector('#animation');
const devicesTable: HTMLTableElement = document.querySelector('#devices');
const returnButton = document.querySelector('#return-btn');

class RaportGenerator {
  private raport: Array<RaportModel>

  constructor() {
    const raportStore = new RaportStore();
    this.raport = raportStore.getRaport();
  }

  filterRaportByCategory(filter: string): Array<RaportModel> {
    const filteredRaport = this.raport.filter((obj) => obj.category === filter);
    return filteredRaport;
  }

  onClick(table: HTMLTableElement): void {
    const trArr = table.querySelectorAll('.d-none');
    trArr.forEach((tr) => tr.classList.remove('d-none'));
  }

  escape(text: string): string {
    return text.replace(/</g, '&lt;');
  }

  shorten(text: string, limit = 160): string {
    if (text.length > limit) {
      return `${text.substring(0, limit - 3)}...`;
    }

    return text;
  }

  putDataOnTable(table: HTMLTableElement, filter: string): void {
    const data = this.filterRaportByCategory(filter);
    const tbody = document.createElement('tbody');

    if (data.length > 0) {
      data.forEach((row, index) => {
        const tr = document.createElement('tr');

        if (index > 5) {
          tr.classList.add('d-none');
          table.querySelector('button').classList.remove('d-none');
        }

        tr.innerHTML = `
        <td>
            <localized-text>${row.what}</localized-text>
        </td>
        <td>
           ${row.type === 'error'
    ? `<p class="has-text-weight-bold has-text-danger">${row.type}</p>`
    : `<p class="has-text-weight-bold has-text-warning">${row.type}</p>`
}
        </td>
        <td>
            <localized-text>${row.code}</localized-text> 
            <localized-text>${this.shorten(this.escape(row.message))}</localized-text> 
        </td>`;
        tbody.append(tr);
      });
    } else {
      const tr = document.createElement('tr');
      tr.classList.add('has-background-success');
      tr.innerHTML = '<td colspan="3"><localized-text>Wszystkie testy przeszły pomyślnie!</localized-text></td>';
      tbody.append(tr);
    }
    table.append(tbody);
  }
}

const raport = new RaportGenerator();

generalTable
  .querySelector('button')
  .addEventListener('click', () => raport.onClick(generalTable));
semanticTable
  .querySelector('button')
  .addEventListener('click', () => raport.onClick(semanticTable));
ariaTable
  .querySelector('button')
  .addEventListener('click', () => raport.onClick(ariaTable));
imageTable
  .querySelector('button')
  .addEventListener('click', () => raport.onClick(imageTable));
contrastTable
  .querySelector('button')
  .addEventListener('click', () => raport.onClick(contrastTable));
animationTable
  .querySelector('button')
  .addEventListener('click', () => raport.onClick(animationTable));
devicesTable
  .querySelector('button')
  .addEventListener('click', () => raport.onClick(devicesTable));

setTimeout(() => {
  const categories = [
    {
      table: generalTable,
      filter: 'general',
    },
    {
      table: semanticTable,
      filter: 'semantic',
    },
    {
      table: ariaTable,
      filter: 'aria',
    },
    {
      table: imageTable,
      filter: 'image',
    },
    {
      table: contrastTable,
      filter: 'contrast',
    },
    {
      table: animationTable,
      filter: 'animation',
    },
    {
      table: devicesTable,
      filter: 'devices',
    },
  ];

  categories.forEach((category) => raport.putDataOnTable(category.table, category.filter));
}, 1000);

returnButton.addEventListener('click', () => {
  ipcRenderer.send('return', null);
});
