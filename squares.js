class Table {
  constructor(x = 4, y = 4, root = document.body) {
    if (x > 0 && y > 0) {
      this.wrapper = document.createElement("div");
      this.wrapper.className = "wrapper";
      root.appendChild(this.wrapper);

      let partOne = document.createElement("div");
      partOne.className = "part-one";
      this.wrapper.appendChild(partOne);

      let partTwo = document.createElement("div");
      partTwo.className = "part-two";
      this.wrapper.appendChild(partTwo);

      this.board = document.createElement("div");
      this.board.className = "board";
      partOne.append(this.board);

      this.playground = document.createElement("div");
      this.playground.className = "playground";
      this.board.append(this.playground);
      this.playground.addEventListener("mouseover", this.getPosition);

      this.target = null;

      for (let i = 0; i < 2; i++) {
        let addButton = document.createElement("button");
        let newContent = document.createTextNode("+");
        addButton.appendChild(newContent);
        addButton.classList.add("block", "add-block");

        if (i === 0) {
          partOne.append(addButton);
          addButton.addEventListener("click", this.addColumn);
        } else if (i === 1) {
          partTwo.append(addButton);
          addButton.addEventListener("click", this.addRow);
        }
      }

      this.delButton = [];

      for (let i = 0; i < 2; i++) {
        this.delButton[i] = document.createElement("button");
        let newContent = document.createTextNode("-");
        this.delButton[i].appendChild(newContent);
        this.delButton[i].classList.add("block", "delete-block");
        this.board.append(this.delButton[i]);
        if (i === 0) {
          this.delButton[i].addEventListener("click", this.delColumn);
          this.delButton[i].addEventListener("click", this.hideBlocks);
        } else if (i === 1) {
          this.delButton[i].addEventListener("click", this.delRow);
          this.delButton[i].addEventListener("click", this.hideBlocks);
        }
      }

      this.row = document.createElement("div");
      this.row.className = "row";
      this.playground.append(this.row);

      this.block = document.createElement("div");
      this.block.className = "main-block";
      this.row.append(this.block);

      for (let i = 0; i < x - 1; i++) {
        this.addColumn();
      }
      for (let j = 0; j < y - 1; j++) {
        this.addRow();
      }
    }
  }

  addColumn = () => {
    let row = this.playground.children;
    console.log(row.length);
    for (let i = 0; i < row.length; i++) {
      row[i].appendChild(this.block.cloneNode());
    }
  };

  addRow = () => {
    this.playground.append(this.row.cloneNode(true));
  };

  getIndex = (e) => {
    let i = 0;
    while (e.previousSibling != null) {
      e = e.previousSibling;
      i++;
    }
    return i;
  };

  delColumn = () => {
    let row = this.playground.children;
    let index = this.getIndex(this.target);
    if (this.target.parentElement)
      if (this.target.parentElement.childElementCount > 1) {
        for (let i = 0; i < this.playground.childElementCount; i++) {
          row[i].childNodes[index].remove();
        }
      } else return;
  };

  delRow = () => {
    if (this.target.parentElement)
      if (this.target.parentElement.className === "row") {
        if (this.playground.childElementCount > 1)
          this.target.parentElement.remove();
      }
  };

  hideBlocks = () => {
    console.log("done");
    this.delButton.forEach((element) => {
      let actualDisplay = getComputedStyle(element).display;
      if (actualDisplay !== "none") {
        element.style.display = "none";
      }
    });
  };

  getPosition = () => {
    let element = event.target;
    if (element.className == "main-block") {
      let rect = element.getBoundingClientRect();

      this.delButton[0].style.transform = `translateX(${rect.left - 60}px)`;
      this.delButton[1].style.transform = `translateY(${rect.top - 10}px)`;
      this.target = element;

      this.delButton.forEach((element) => {
        let actualDisplay = getComputedStyle(element).display;
        if (actualDisplay == "none") {
          element.style.display = "block";
        }
      });
    } else return;
  };
}

new Table();
new Table(15, 3);
new Table(8, 8);
new Table(-8, -8);
