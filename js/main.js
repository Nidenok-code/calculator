document.querySelectorAll(".btn").forEach((btn) => {
  btn.style.gridArea = btn.name;
});

const output = document.querySelector(".output"),
  numbers = document.querySelectorAll(".number"),
  theamsButton = document.querySelectorAll(".circle"),
  operators = document.querySelectorAll(".operator"),
  del = document.querySelector(".del"),
  reset = document.querySelector(".reset"),
  equal = document.querySelector(".equal");

let holdNumber,
  whichOperator,
  isNext = false;

numbers.forEach((e) => {
  e.addEventListener("click", () => {
    if (isNext) {
      output.innerText = "";
      isNext = false;
    }
    if (output.innerText.length > 14) {
      return null;
    }
    if (e.name === "point" && output.innerText.includes(".")) {
      return null;
    }
    if (output.innerText === "0") {
      if (e.name !== "point") output.innerText = "";
    }
    output.innerText += e.innerText;
  });
});

del.addEventListener("click", () => {
  if (output.innerText.length === 1) {
    output.innerText = "0";
  } else {
    output.innerText = output.innerText.slice(0, -1);
  }
});

reset.addEventListener("click", () => {
  output.innerText = "0";
  holdNumber = null;
  whichOperator = null;
});

operators.forEach((e) => {
  e.addEventListener("click", () => {
    holdNumber = output.innerText;
    whichOperator = e.name;
    isNext = true;
  });
});

equal.addEventListener("click", () => {
  if (whichOperator && !isNext) {
    output.innerText = new Calc()[whichOperator](
      parseFloat(holdNumber),
      parseFloat(output.innerText)
    );
    whichOperator = null;
    holdNumber = null;
  } else {
    return null;
  }
});

function Calc() {
  this.plus = (fNum, sNum) => {
    return fNum + sNum;
  };
  this.minus = (fNum, sNum) => {
    return fNum - sNum;
  };
  this.multi = (fNum, sNum) => {
    return fNum * sNum;
  };
  this.division = (fNum, sNum) => {
    return fNum == 0 ? "Error" : fNum / sNum;
  };
}

theamsButton.forEach((e, i, a) => {
  e.addEventListener("click", () => {
    a.forEach((el) => {
      el.classList.remove("isActive");
    });
    e.classList.add("isActive");
    document.body.classList = [];
    if (i !== 0) {
      document.body.classList.add(`theme${i + 1}`);
    }
  });
});
