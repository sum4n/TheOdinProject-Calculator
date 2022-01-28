const add = function(...args) {
    return args.reduce((total, arg) => total + arg);
}

const subtract = function(...args) {
    return args.reduce((total, arg) => total - arg);
}

const multiply = function(...args) {
    return args.reduce((total, arg) => total * arg);
}

const divide = function(...args) {
    return args.reduce((total, arg) => total / arg);
}

const operate = function(operator, num1, num2) {
    return operator(num1, num2);
}

const buttons = document.querySelectorAll('button');
const display1 = document.querySelector("#display1>p");
const display2 = document.querySelector("#display2>p");

const numButtons = document.querySelectorAll('.btn-numbers>button');
const operateButtons = document.querySelectorAll('.btn-operators>button');
const equalButton = document.querySelector('.btn-equals');

const resetButton = document.querySelector("#btn-func>button");

let num1 = '';
let num2 = '';
let operator;
let clearDisplay = false;

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        display1.textContent += button.textContent;
        
        // click numbers after clicking "="
        // if going for new calculation after clicking "="
        if (clearDisplay && !(operator)) {
            display1.textContent = '';
            display2.textContent = '';
            num1 = '';
            display1.textContent += button.textContent;
            clearDisplay = false;
        }
        
        // click operator after clicking "="
        // or chaining operators.
        if (operator) {
            num2 += button.textContent;
            num1 = operate(operator, Number(num1), Number(num2));
        } else {
            num1 += button.textContent;
        }
        
        
        console.log("Num1: " + num1);
        console.log("Num2: " + num2);
    });
});

operateButtons.forEach((button) => {
    button.addEventListener('click', () => {
        display1.textContent += " " + button.textContent + " ";

        switch (button.textContent) {
            case '+':
                operator = add;
                break;
            case '-':
                operator = subtract;
                break;
            case '*':
                operator = multiply;
                break;
            case '/':
                operator = divide;
                break;
        }

        num2 = '';
        
    });
});

equalButton.addEventListener('click', () => {
    display2.textContent = num1;
    
    operator = undefined;
    clearDisplay = true;
    // num1 = "";
    num2 = "";
});

resetButton.addEventListener('click', () => {
    display1.textContent = "";
    display2.textContent = "";
    num1 = "";
    num2 = "";
    operator = undefined;
    clearDisplay = false;
});
