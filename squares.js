const pgTable = document.getElementById("playground");

let positionX = 0;
let positionY = 0;

let currentColumn = 0;
let currentRow = 0;

const updateBlocks = () => {
  const board = document.querySelector(".board");
  board.addEventListener("mouseleave", hideBlocks);

  const block = document.querySelectorAll(".main-block");
  block.forEach((element) => {
    element.addEventListener("mouseover", () => {
      let rect = element.getBoundingClientRect();

      positionX = rect.left;
      positionY = rect.top;

      currentColumn = element.cellIndex;
      currentRow = element.parentElement.rowIndex;

      displayDeleteBlocks();
    });
  });
};

const addRow = () => {
  let totalRowCount = pgTable.rows.length;
  let newRow = pgTable.insertRow();
  let totalColumnCount = pgTable.rows[0].cells.length;
  let newCell = null;
  for (let i = 0; i < totalColumnCount; i++) {
    newCell = newRow.insertCell(i);
    newCell.classList.add("main-block");
    newCell.cloneNode();
  }
  updateBlocks();
};

const deleteRow = () => {
  let totalRowCount = pgTable.rows.length;
  if (totalRowCount > 1) {
    let newRow = pgTable.deleteRow(currentRow);
  }
  updateBlocks();
  hideBlocks();
};

const addColumn = () => {
  let totalColumnCount = pgTable.rows[0].cells.length;
  let newCell = null;

  for (let i = 0; i < pgTable.rows.length; i++) {
    newCell = pgTable.rows[i].insertCell();
    newCell.classList.add("main-block");
    newCell.cloneNode();
  }

  updateBlocks();
};

const deleteColumn = () => {
  let totalColumnCount = pgTable.rows[0].cells.length;
  let newRow = null;

  for (let i = 0; i < pgTable.rows.length; i++) {
    if (totalColumnCount > 1) {
      newRow = pgTable.rows[i].deleteCell(currentColumn);
    }
  }
  updateBlocks();
  hideBlocks();
};

const displayDeleteBlocks = () => {
  const deleteBlocks = document.querySelectorAll(".delete-block");

  deleteBlocks.forEach((element) => {
    let actualDisplay = getComputedStyle(element).display;
    if (actualDisplay == "none") {
      element.style.display = "block";
    }
  });

  deleteBlocks[0].style.transform = `translateY(${positionY - 60}px)`;
  deleteBlocks[1].style.transform = `translateX(${positionX - 60}px)`;
};

const hideBlocks = () => {
  const deleteBlocks = document.querySelectorAll(".delete-block");

  deleteBlocks.forEach((element) => {
    let actualDisplay = getComputedStyle(element).display;
    if (actualDisplay !== "none") {
      element.style.display = "none";
    }
  });
};

hideBlocks();
updateBlocks();
