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


const operate = function(operate, num1, num2) {
    return operate(num1, num2);
}

