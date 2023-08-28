class Calculator{
  constructor(previousOperandScreen, currentOperandScreen) {
    this.previousOperandScreen = previousOperandScreen;
    this.currentOperandScreen = currentOperandScreen;
    this.clear();
  }

  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operations = undefined;
    this.computeExecuted = false;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number==='.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOpreation(operations) {
    if (this.currentOperand === '') return;
    if (this.previousOperand != '') this.compute();
    this.operations = operations;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  isCompute() {
    if (this.previousOperand==='' && this.computeExecuted===true) {
        this.clear();
    }
  }

  compute() {
    let result = 0;
    let prev = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch(this.operations) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case 'x':
        result = prev * current;
        break;
      case '÷':
        result = prev / current;
        break;
      default: return;
    }
    this.currentOperand = result;
    this.operations = undefined;
    this.previousOperand = '';
    this.computeExecuted = true;
  }

  modifyNumbers(number) {
    const stringNumber = number.toString();
    const integerPart = stringNumber.split('.')[0];
    const fractionPart = stringNumber.split('.')[1];
    let numberDisplay;
    if (isNaN(parseFloat(integerPart))) {
        numberDisplay = ' ';
    } else {
        numberDisplay = parseFloat(integerPart).toLocaleString('en');
    }
    if (fractionPart != null) {
        return `${numberDisplay}.${fractionPart}`;
    } else {
        return numberDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandScreen.innerText = this.modifyNumbers(this.currentOperand);
    this.previousOperandScreen.innerText = this.modifyNumbers(this.previousOperand) + 
    (this.operations!==undefined ? ` ${this.operations} `: ' ');
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const previousOperandScreen = document.querySelector('[data-previous-operand]');
const currentOperandScreen = document.querySelector('[data-current-operand]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equal]');

const calculator = new Calculator(previousOperandScreen, currentOperandScreen);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.isCompute();
      calculator.appendNumber(button.innerHTML);
      calculator.updateDisplay();
    })
})

operations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOpreation(button.innerHTML);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})


/*
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand != "") this.compute();
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let result = 0;
        let prev = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch(this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case 'x':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            default: 
                return;
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplay(number) {
        const stringNumber = number.toString();
        const integerPart = parseFloat(stringNumber.split('.')[0]);
        const fractionalPart = stringNumber.split('.')[1];
        let numberDisplay
        if(isNaN(integerPart)) {
            numberDisplay = " ";
        } else {
            numberDisplay = integerPart.toLocaleString('en');
        }
        if (fractionalPart != null) {
            return `${numberDisplay}.${fractionalPart}`;
        } else {
            return numberDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplay(this.currentOperand);
        this.previousOperandTextElement.innerText = this.getDisplay(this.previousOperand) + 
        (this.operation===undefined?"":" " + this.operation + " ");
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach( button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach( button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})
*/
