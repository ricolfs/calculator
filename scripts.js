//current issues:
// not able to chain together operations
// display pushes previous operand to the left
// too many decimals
// unable to display anything as soon as you press the operator function
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = null;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computation;
    let current = parseFloat(this.currentOperand);
    let previous = parseFloat(this.previousOperand);
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "÷":
        computation = previous / current;
        break;
      case "x":
        computation = previous * current;
        break;
      case "-":
        computation = previous - current;
        break;
      case "+":
        computation = previous + current;
        break;
      default:
        return;
    }
    this.currentOperand = computation.toString();
    this.operation = null;
    this.previousOperand = "";
    this.updateDisplay;
  }

  getDisplayNumber(number) {
    //is to split the number if there is a decimal point
    let stringNumber = number.toString();
    let integerDigits = parseFloat(stringNumber.split(".")[0]);
    let decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    integerDisplay = integerDigits.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    console.log(this.currentOperandTextElement);
    console.log(this.previousOperandTextElement);
    if (this.operation !== null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else this.previousOperandTextElement.innerText = "";
  }
}

const numberButtons = document.querySelectorAll(".number");
const deleteButton = document.querySelector(".del");
const clearButton = document.querySelector(".clear");
const operationButton = document.querySelectorAll(".operation");
const previousOperandTextElement = document.getElementById("previousOperand");
const currentOperandTextElement = document.getElementById("nextOperand");
const equalsButton = document.querySelector(".equal");

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

clearButton.addEventListener("click", () => {
  calculator.clear(); //setting the property
  //update what we see
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
