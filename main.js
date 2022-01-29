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
        
        // After a operation if user clicks "=" button, it will
        // run the following code. It will take new num1 to operate.
        if (clearDisplay && !(operator)) {
            display1.textContent = '';
            display2.textContent = '';
            num1 = '';
            display1.textContent += button.textContent;
            clearDisplay = false;
        }
        
        // Click operator after clicking "=" or chaining operators.
        // If there is an operator, next input will go to num2.
        if (operator) {
            num2 += button.textContent;
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

        // This check needs to be above the switch statement
        // because we will operate on previous operator.
        // Each operator presses will operate on previous numbers
        // with previous operator.
        if (operator) {
            num1 = operate(operator, Number(num1), Number(num2));
            display2.textContent = num1;
        }

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

        // num2 will be empty after each operator press.
        num2 = '';
        
    });
});

equalButton.addEventListener('click', () => {
    // num1 gets the operate value to continue chain operations.
    num1 = operate(operator, Number(num1), Number(num2));
    display2.textContent = num1;
    
    operator = undefined;
    clearDisplay = true;
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
