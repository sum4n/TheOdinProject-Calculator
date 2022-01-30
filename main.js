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

const buttons = document.querySelectorAll('button');
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

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.textContent == '.'){
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
         
        console.log("Num1: " + num1);
        console.log("Num2: " + num2);
        console.log(display1.textContent.length)
    });
});

operateButtons.forEach((button) => {
    button.addEventListener('click', () => {

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
        
    });
});

equalButton.addEventListener('click', () => {
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
});

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

delButton.addEventListener('click', () => {
    if (operator) {

        let numString = num2.toString();
        numString = numString.slice(0, -1);
        if (numString == '') {
            num2 = '';
        } else {
            num2 = numString;
        }

        if (!(num2.includes('.'))) {
            num2 = numString;
            dotButton.disabled = false;
        } 
        
        display1.textContent = display1.textContent.slice(0, -1);

    } else {
        let numString = num1.toString();
        numString = numString.slice(0, -1);
        if (numString == '') {
            num1 = '';
        } else {
            num1 = numString;
        }

        if (!(num1.includes('.'))) {
            num1 = numString;
            dotButton.disabled = false;
        } 
        
        display1.textContent = num1;
    }
    
});