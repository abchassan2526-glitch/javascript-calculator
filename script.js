// Numbers
const numbers = document.querySelectorAll(".number");

// Display Input
const displayInput = document.querySelector(".display-input");

// Display Result
const displayResult = document.querySelector(".display-result")

// All Cancel
const allCancel = document.querySelector("#action");

// BackSpace
const backSpace = document.querySelector(".backspace");

// DOT
const dot = document.querySelector("#dot");

// Operators
const operators = document.querySelectorAll(".operator:not(#equals)");

// Equal btn
const equalBtn = document.querySelector("#equals");

let calculationDone = false;
let openBracket = true;

let lastNumber;
let lastOperator;

// Number Click
numbers.forEach((number) => {

    number.addEventListener("click", () => {

        if (calculationDone === true) {

            displayInput.value = number.textContent;
            displayResult.value = "";
            calculationDone = false;

        } else {
            let displayValue = displayInput.value + number.textContent;
            displayInput.value = displayValue;
        }

    });

});

// AC Event
allCancel.addEventListener("click", () => {
    displayInput.value = "";
    displayResult.value = "";
});

// Backspace Event
backSpace.addEventListener("click", () => {
    let backSpaceValue = displayInput.value.slice(0, -1);

    displayInput.value = backSpaceValue;
});

// Dot Event
dot.addEventListener("click", () => {
    let decimal = displayInput.value.split(/[-+×÷]/).pop();

    if (decimal.includes(".")) {

    } else {
        let dotText = displayInput.value + dot.textContent;
        displayInput.value = dotText;
    }
});

// Operators
operators.forEach((operator) => {
    operator.addEventListener("click", () => {

        // Percentage If
        if (operator.textContent === "%") {
            let percentage = Number(displayInput.value);
            let result = percentage / 100;
            displayResult.value = result;
            return;
        }

        // Brackets If
        if (operator.textContent === "()") {
            // Empty Display
            if (displayInput.value === "") {
                displayInput.value = displayInput.value + "(";
                openBracket = false;

            } else {
                let lastChar = displayInput.value[displayInput.value.length - 1];
                // Last Character Check
                if (openBracket === true && Number.isInteger(Number(lastChar))) {
                    displayInput.value = displayInput.value + "×" + "(";
                    openBracket = false;
                    return;
                }

                // Existing open bracket logic
                if (openBracket === true) {
                    displayInput.value = displayInput.value + "(";
                    openBracket = false;
                } else {
                    displayInput.value = displayInput.value + ")";
                    openBracket = true;

                }
            }
            return;
        }

        if (calculationDone === true) {
            displayInput.value = displayResult.value + operator.textContent;
            calculationDone = false;
        }

        if (displayInput.value.endsWith("+") ||
            displayInput.value.endsWith("-") ||
            displayInput.value.endsWith("×") ||
            displayInput.value.endsWith("÷")
        ) {
            let oprAgainNone = displayInput.value.slice(0, -1) + operator.textContent;
            displayInput.value = oprAgainNone;
        } else {
            // Plus Condition
            if (displayInput.value !== "") {
                let allOpr = displayInput.value + operator.textContent;
                displayInput.value = allOpr
            }
        }


    });
});

// Equals
equalBtn.addEventListener("click", () => {
    
    let numbers = displayInput.value.split(/[-+×÷]/);

    lastNumber = numbers[numbers.length - 1];
    lastNumber = lastNumber.replace(")", "");

    lastOperator = displayInput.value.slice(
        0, displayInput.value.length - lastNumber.length
    )[
        displayInput.value.slice(0, displayInput.value.length - lastNumber.length).length - 1
    ];

        if(calculationDone === true) {
            displayInput.value = displayResult.value + lastOperator + lastNumber;
        }

    let equal = displayInput.value;
    if (equal !== "") {
        equal = equal.replace("×", "*");
        equal = equal.replace("÷", "/");

        let equalResult = eval(equal)
        displayResult.value = equalResult;
        calculationDone = true;

        if (!Number.isFinite(equalResult)) {
            displayResult.value = "Error"
        }
    }

    
});
