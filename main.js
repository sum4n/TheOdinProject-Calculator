const add = function(...args) {
    let answer =  args.reduce((total, arg) => total + arg);
    return (Math.round(answer * 100) / 100);
}

const subtract = function(...args) {
    let answer = args.reduce((total, arg) => total - arg);
    return (Math.round(answer * 100) / 100);
}

const multiply = function(...args) {
    let answer = args.reduce((total, arg) => total * arg);
    return (Math.round(answer * 100) / 100);
}

const divide = function(...args) {
    let answer = args.reduce((total, arg) => total / arg);
    return (Math.round(answer * 100) / 100);
}

const operate = function(operator, num1, num2) {
    return operator(num1, num2);
}

// const buttons = document.querySelectorAll('button');
const display1 = document.querySelector("#display1>p");
const display2 = document.querySelector("#display2>p");

const numButtons = document.querySelectorAll('.btn-numbers>button');
const operateButtons = document.querySelectorAll('.btn-operators>button');
const equalButton = document.querySelector('.btn-equals');

const resetButton = document.querySelector("#btn-func>button");

const dotButton = document.querySelector("#dot");
const delButton = document.querySelector("#btn-del");

let num1 = '';
let num2 = '';
let operator;
let clearDisplay = false;
let newCalc = false;
let operatorSymbol;

const numButtonFunc = (button) => {
    if (button.textContent == '.') {
            dotButton.disabled = true;
        }
        display1.textContent += button.textContent;
        
        // After a operation if user clicks "=" button, it will
        // run the following code. It will take new num1 to operate.
        if (clearDisplay && newCalc) {
            display1.textContent = '';
            display2.textContent = '';
            num1 = '';
            // num2 also resets on new calculation.
            num2 = '';
            display1.textContent += button.textContent;
            clearDisplay = false;
            // On new calculation operator gets reset, so that below
            // if else statement runs correctly.
            operator = undefined;

            newCalc = false;
        }
        
        // Click operator after clicking "=" or chaining operators.
        // If there is an operator, next input will go to num2.
        if (operator) {
            num2 += button.textContent;
        } else {
            num1 += button.textContent;
        }
         
        // console.log("Num1: " + num1);
        // console.log("Num2: " + num2);
        // console.log(display1.textContent.length)
    };

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        numButtonFunc(button);
    });
});

const operateButtonFunc = (button) => {
    // If input is only '.', operate buttons wont work till
    // valid input.
    if (num1 == '.') {
        return;
    }
    dotButton.disabled = false;

    display1.textContent += " " + button.textContent + " ";

    // This check needs to be above the switch statement
    // because we will operate on previous operator.
    // Each operator presses will operate on previous numbers
    // with previous operator.

    // If operators are pressed after "=" newCalc will be false.
    if (operator && newCalc) {
        // num1 = operate(operator, Number(num1), Number(num2));
        display2.textContent = num1;
        newCalc = false;
    } else if (operator && !newCalc) {
        num1 = operate(operator, Number(num1), Number(num2));
        if (num1 == Infinity || num1 == -Infinity) {
            display2.textContent = "ERROR";
        } else {
            display2.textContent = num1;
        } 
    }
            
    switch (button.textContent) {
        case '+':
            operator = add;
            operatorSymbol = ' + ';
            break;
        case '-':
            operator = subtract;
            operatorSymbol = ' - ';
            break;
        case 'x':
            operator = multiply;
            operatorSymbol = ' x ';
            break;
        case '/':
            operator = divide;
            operatorSymbol = ' / ';
            break;
    }

    // num2 will be empty after each operator press.
    num2 = '';      
}

operateButtons.forEach((button) => {
    button.addEventListener('click', () => {
        operateButtonFunc(button);
    });
});

const equalBottonCalculate = () => {
    dotButton.disabled = false;
    // If = is used without entering operator return num1.
    if (!operator) {
        display2.textContent = num1;
        return;
    }

    // If = key repeat keep updating display1.
    if (newCalc) {
        display1.textContent += operatorSymbol + num2;
    }

    // num1 gets the operate value to continue chain operations. and 
    // repeated "=" presses.
    num1 = operate(operator, Number(num1), Number(num2));
    if (num1 == Infinity || num1 == -Infinity) {
        display2.textContent = "ERROR";
    } else {
        display2.textContent = num1;
    }
    // display2.textContent = num1;
    
    // this variables will effect how the numButtons' function run.
    newCalc = true;
    clearDisplay = true;
    
    // Below variables will reset on new calculation's number input above.
    // Because this enables repeated "=" presses and do calculations
    // on results.
    // operator = undefined;
    // num2 = "";
}

equalButton.addEventListener('click', equalBottonCalculate);

resetButton.addEventListener('click', () => {
    display1.textContent = "";
    display2.textContent = "";
    num1 = "";
    num2 = "";
    operator = undefined;
    clearDisplay = false;
    newCalc = false;
    dotButton.disabled = false;
});

delButton.addEventListener('click', delButtonFunc);

function delButtonFunc () {
    if (operator) {
        if (num2 != "") {
            display1.textContent = display1.textContent.slice(0, -1);
        } 

        num2 = delDigit(num2);
        // console.log(num2);
    } else {
        num1 = delDigit(num1);
        // console.log(num1);
        display1.textContent = num1;
    }
}

function delDigit(num) {
    let numString = num.toString();
        numString = numString.slice(0, -1);
        if (numString == '') {
            num = '';
        } else {
            num = numString;
        }

        if (!(num.includes('.'))) {
            num = numString;
            dotButton.disabled = false;
        } 
    return num;
}

// keyboard support

let operatorsObj = {
    107: operateButtons[0],
    109: operateButtons[1],
    106: operateButtons[2],
    111: operateButtons[3]
};


window.addEventListener('keydown', (e) => {
    // console.log(e);
    if (e.keyCode === 13) {
        // enter key throws tantum, so e.preventDefault is needed.
        e.preventDefault()
        equalBottonCalculate();
    } else if (e.keyCode === 8) {
        delButtonFunc();
    } else if (e.keyCode in operatorsObj) {
        // divide key '/' opens search by default.
        e.preventDefault();
        operateButtonFunc(operatorsObj[e.keyCode]);
    } else if (e.key in numButtons) {
        // console.log(e.key);
        // console.log(numButtons[e.key]);
        for (let i of numButtons.values()) {
            if (i.textContent == e.key) {
                numButtonFunc(i);
            }
        }
    } else if (e.key == "." ) {
        num1 = num1.toString();
        num2 = num2.toString();
        if (!num1.includes('.') && num2 == "") {
            numButtonFunc(numButtons[10]);
        } else if (operator && !num2.includes('.')) {
            numButtonFunc(numButtons[10]);
        }
    }
});