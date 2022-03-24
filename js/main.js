import { evaluateExpression } from './modules/evaluateExpression.js';

import { getCurrentExpr } from './modules/getCurrentExpr.js';

import { convertToNumbers } from './modules/convertToNumbers.js';

// get all of the reused elements
const keys = document.querySelector('.calc__keys');
const calc = document.querySelector('.calc');
const display = document.querySelector('.calc__display');

// write to screen
// get array of existing texts
// if newline = true: write string to the top and replace the bottom text with 0
// if replace = true, replace the last letter in the last line
// replace not designed to be used with newline
function writeToScreen(string, replace = false, newline = false) {
    const lineArr = document.querySelectorAll('.display__text');
    const lastLine = lineArr[lineArr.length - 1];

    if (newline) {
        display.innerHTML = `<p class="display__text display__text--subtext">${string}</p> <p class="display__text">0</p>`;
    } else if (lastLine.textContent === '') {
        lastLine.textContent = string;
    } else if (replace) {
        let stringArr = [...lastLine.textContent];
        stringArr.pop();
        stringArr.push(string);
        lastLine.textContent = stringArr.join('');
    } else {
        lastLine.textContent += string;
    }

    return lineArr;
}

// gets the key that is pressed and
// decides what to do.
//
// this uses the dataset functionality which is
// bound to the calc div. See readme for details.

function keyPress(event) {
    const key = event.target;
    const keyType = key.dataset.buttonType;
    const calcState = calc.dataset;

    switch (keyType) {
        case 'operator':
            // disallow operators if there is no previous result
            // or current inputs
            if (
                calcState.waitingForReplacement == 'true' &&
                calcState.hasResult == 'false'
            ) {
                break;
            }

            // if waiting for replacement or the last character is an operator, replace the last character
            else if (
                calcState.waitingForReplacement == 'true' ||
                calcState.currentOperator != 'none'
            ) {
                writeToScreen(key.textContent, true);
            }

            // if there is no reason to replace
            else {
                writeToScreen(key.textContent);
            }

            // set currentOperator to the pressed key
            calcState.currentOperator = key.textContent;
            calcState.decimal = 'false';
            break;
        case 'number':
            calcState.waitingForReplacement == 'true'
                ? writeToScreen(key.textContent, true)
                : writeToScreen(key.textContent);

            calcState.waitingForReplacement = 'false';
            calcState.currentOperator = 'none';
            break;
        case 'decimal':
            if (calcState.decimal == 'true') {
                break;
            }

            writeToScreen(key.textContent);
            calcState.waitingForReplacement = 'false';
            calcState.currentOperator = 'none';
            calcState.decimal = 'true';
            break;
        case 'equal':
            const lineArr =
                document.querySelectorAll('.display__text');
            const textArr = [];
            lineArr.forEach((elem) => {
                textArr.push(elem.textContent);
            });
            console.log(textArr);
            try {
                let currentExpr = getCurrentExpr(textArr);
                let operatorsArray = convertToNumbers(currentExpr);
                let result = evaluateExpression(operatorsArray);
                writeToScreen(result, false, true);
            } catch (error) {
                console.error(error);
            }
            calcState.currentOperator = 'none';
            calcState.decimal = 'false';
            calcState.hasResult = 'true';
            break;
        case 'clear':
            writeToScreen('', false, true);
            calcState.currentOperator = 'none';
            calcState.decimal = 'false';
            calcState.waitingForReplacement = 'true';
            calcState.hasResult = 'false';
    }
}

// adds event listener to the keys
function generateEventListeners() {
    keys.addEventListener('click', (e) => {
        keyPress(e);
    });
}

generateEventListeners();
