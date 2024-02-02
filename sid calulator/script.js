class Calculator {
  constructor(historyElement, currentInputElement) {
    this.historyElement = historyElement;
    this.currentInputElement = currentInputElement;
    this.clear();
  }

  clear() {
    this.currentInput = '';
    this.history = '';
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    this.currentInput = this.currentInput.toString().slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === '.' && this.currentInput.includes('.')) return;
    this.currentInput = this.currentInput.toString() + number.toString();
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentInput === '') return;
    if (this.history !== '') {
      this.compute();
    }
    this.operation = operation;
    this.history = this.currentInput;
    this.currentInput = '';
    this.updateDisplay();
  }

  compute() {
    let computation;
    const prev = parseFloat(this.history);
    const current = parseFloat(this.currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      case '%':
        computation = prev % current;
        break;
      default:
        return;
    }
    this.currentInput = computation.toString();
    this.operation = undefined;
    this.history = '';
    this.updateDisplay();
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentInputElement.innerText = this.getDisplayNumber(this.currentInput);
    this.historyElement.innerText = this.history ? `${this.getDisplayNumber(this.history)} ${this.operation}` : '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const historyElement = document.getElementById('history');
  const currentInputElement = document.getElementById('current-input');
  const calculator = new Calculator(historyElement, currentInputElement);
  const keys = document.querySelector('.keys');

  keys.addEventListener('click', event => {
    if (!event.target.matches('button')) return;
    const key = event.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = calculator.currentInput;

    if (!action) {
      calculator.appendNumber(keyContent);
    }

    if (action === 'operator') {
      calculator.chooseOperation(key.dataset.value);
    }

    if (action === 'clear') {
      calculator.clear();
    }

    if (action === 'delete') {
      calculator.delete();
    }

    if (action === 'evaluate') {
      calculator.compute();
    }
  });
});
