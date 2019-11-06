const { ipcRenderer } = require("electron");

const generalTable = document.querySelector("#general");
const semanticTable = document.querySelector("#semantic");
const ariaTable = document.querySelector("#aria");
const imageTable = document.querySelector("#image");
const contrastTable = document.querySelector("#contrast");
const letterTable = document.querySelector("#letter");
const devicesTable = document.querySelector("#devices");
const returnButton = document.querySelector("#return-btn");

class Raport {
  constructor() {
    this.raport = [];

    this.setListeners();
  }

  setListeners() {
    ipcRenderer.on("raport", (event, raport) => {
      this.raport = raport;
    });
  }

  filterRaportByCategory(filter) {
    const filteredRaport = this.raport.filter(obj => obj.category === filter);
    return filteredRaport;
  }

  onClick(table) {
    const trArr = table.querySelectorAll(".d-none");
    trArr.forEach(tr => tr.classList.remove("d-none"));
  }

  escape(text) {
    return text.replace(/</g, "&lt;");
  }

  shorten(text, limit = 160) {
    if (text.length > limit) {
      return `${text.substring(0, limit - 3)}...`;
    }

    return text;
  }

  putDataOnTable(table, filter) {
    const data = this.filterRaportByCategory(filter);
    const tbody = document.createElement("tbody");

    if (data.length > 0) {
      data.forEach((row, index) => {
        const tr = document.createElement("tr");

        if (index > 5) {
          tr.classList.add("d-none");
          table.querySelector("button").classList.remove("d-none");
        }

        tr.innerHTML = `<td>${row.what}</td><td>${
          row.type === "error"
            ? `<p class="has-text-weight-bold has-text-danger">${row.type}</p>`
            : `<p class="has-text-weight-bold has-text-warning">${row.type}</p>`
        }</td><td>${this.shorten(this.escape(row.message))}</td>`;
        tbody.append(tr);
      });
    } else {
      const tr = document.createElement("tr");
      tr.classList.add("has-background-success");
      tr.innerHTML = `<td colspan="3">Wszystkie testy przeszły pomyślnie!</td>`;
      tbody.append(tr);
    }
    table.append(tbody);
  }
}

const raport = new Raport();

generalTable
  .querySelector("button")
  .addEventListener("click", () => raport.onClick(generalTable));
semanticTable
  .querySelector("button")
  .addEventListener("click", () => raport.onClick(semanticTable));
ariaTable
  .querySelector("button")
  .addEventListener("click", () => raport.onClick(ariaTable));
imageTable
  .querySelector("button")
  .addEventListener("click", () => raport.onClick(imageTable));
contrastTable
  .querySelector("button")
  .addEventListener("click", () => raport.onClick(contrastTable));
letterTable
  .querySelector("button")
  .addEventListener("click", () => raport.onClick(letterTable));
devicesTable
  .querySelector("button")
  .addEventListener("click", () => raport.onClick(devicesTable));

setTimeout(() => {
  const categories = [
    {
      table: generalTable,
      filter: "general"
    },
    {
      table: semanticTable,
      filter: "semantic"
    },
    {
      table: ariaTable,
      filter: "aria"
    },
    {
      table: imageTable,
      filter: "image"
    },
    {
      table: contrastTable,
      filter: "contrast"
    },
    {
      table: letterTable,
      filter: "letter"
    },
    {
      table: devicesTable,
      filter: "devices"
    }
  ];

  categories.forEach(category =>
    raport.putDataOnTable(category.table, category.filter)
  );
}, 1000);

returnButton.addEventListener("click", function() {
  ipcRenderer.send("return", null);
});
