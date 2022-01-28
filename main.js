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

const numButtons = document.querySelectorAll('.btn-numbers>button');
const operateButtons = document.querySelectorAll('.btn-operators>button');
const equalButton = document.querySelector('.btn-equals');

let temp;
let num1 = 0;
let num2 = 0;
let operator;

const display = function(btn) {
    console.log(btn.textContent);
    display1.textContent += btn.textContent;
}

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        display(button);
    });
});

operateButtons.forEach((button) => {
    button.addEventListener('click', () => {
        console.log(button.textContent);
        num1 += Number(display1.textContent);

        if (button.textContent == '+') {
            operator = add;
        } else if (button.textContent == '-') {
            operator = subtract;
        } else if (button.textContent == '*') {
            operator = multiply;
        } else if (button.textContent == '/') {
            operator = divide;
        }

        display1.textContent = "";
    });
});


equalButton.addEventListener('click', () => {
    num2 += Number(display1.textContent);

    let result = operate(operator, num1, num2);
    display1.textContent = result;
    console.log(result);
})