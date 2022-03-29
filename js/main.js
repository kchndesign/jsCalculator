import { evaluateExpression } from './modules/evaluateExpression.js';

import { getCurrentExpr } from './modules/getCurrentExpr.js';

import { convertToNumbers } from './modules/convertToNumbers.js';

import { maxPrecision } from './modules/maxPrecision.js';

// get all of the reused elements
const keys = document.querySelector('.calc__keys');
const calc = document.querySelector('.calc');
const display = document.querySelector('.calc__display');

// write to screen
// get array of existing texts
// if newline = false overrite bottom text
// if newline = true move everything up and new bottom text
// if replace = true, replace the last letter in the last line
// replace not designed to be used with newline
function writeToScreen(string, replace = false, newline = false) {
    const lineArr = document.querySelectorAll('.display__text');
    const lastLine = lineArr[lineArr.length - 1];

    if (newline) {
        display.innerHTML = `<p class="display__text display__text--subtext">${string}</p> <p class="display__text display__text--main-text">0</p>`;
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

// This is the state object for the calculator.
// the getCalcState() function polls the html
// document to determine the current state of the
// calculator.

let calcState = {
    // get the last character in the last line of the display
    // see if its an operator or not
    lastKeyIsOperator: false,
    hasPreviousResult: false,
    isOnly0: true,
    hasDecimal: false,

    getCalcState: function () {
        const lineArr = document.querySelectorAll('.display__text');
        const firstLineContent = lineArr[0].textContent;
        const lastLineContent =
            lineArr[lineArr.length - 1].textContent;
        let lastLineCharacterArray = [...lastLineContent];
        // lastKeyisOperator
        let lastChar = lastLineCharacterArray.pop();
        this.lastKeyIsOperator = !/[0-9]/.test(lastChar);
        lastLineCharacterArray.push(lastChar);
        // hasPreviousResult
        this.hasPreviousResult = firstLineContent ? true : false;
        // is only0
        this.isOnly0 = lastLineContent === '0' ? true : false;
        // hasDecimal
        for (let i = lastLineCharacterArray.length - 1; i >= 0; i--) {
            let character = lastLineCharacterArray[i];
            if (/[0-9]/.test(character)) {
            } else if (/[×÷\-\+]/.test(character)) {
                this.hasDecimal = false;
                break;
            } else if (/\./.test(character)) {
                this.hasDecimal = true;
                break;
            }
        }
    },

    [Symbol.iterator]: function* () {
        yield this.lastKeyIsOperator;
        yield this.hasPreviousResult;
        yield this.isOnly0;
        yield this.hasDecimal;
    },
};

// this new implementation uses an object
// called calcState to control interaction logic.
// The calcState object holds a set of bools that
// the event handler needs to figure out what to do.
// AFTER a key is pressed, it calls getCalcState()
// which resets the object booleans.
// this avoids the brain-breaking task of
// manually managing the state of the calculator.

function keyPress(event) {
    const keyText = event.target.textContent;
    const keyType = event.target.dataset.buttonType;

    switch (keyType) {
        case 'operator':
            // if calculator is in clean state: no previous result and no previous input dont allow input
            if (!calcState.hasPreviousResult && calcState.isOnly0) {
                break;
            }
            // if the last character is an operator, replace it
            // or if its just zero, you can replace it too
            else if (
                calcState.lastKeyIsOperator ||
                calcState.isOnly0
            ) {
                writeToScreen(keyText, true);
            }
            // all other cases:
            else {
                writeToScreen(keyText);
            }
            calcState.getCalcState();
            break;
        case 'number':
            // if theres just a zero in the input <p> tag
            if (calcState.isOnly0) {
                writeToScreen(keyText, true);
            } else {
                writeToScreen(keyText);
            }
            calcState.getCalcState();
            break;
        case 'decimal':
            // dont allow decimals if there is already a decimal in the
            // current number
            if (calcState.hasDecimal) {
                break;
            } else {
                writeToScreen(keyText);
            }
            calcState.getCalcState();
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
                console.log(currentExpr);
                let operatorsArray = convertToNumbers(currentExpr);
                console.log(operatorsArray);
                let result = evaluateExpression(operatorsArray);
                console.log(result);
                let finalString = maxPrecision(result, 15);
                console.log(finalString);
                writeToScreen(finalString, false, true);
            } catch (error) {
                console.error(error);
            }
            calcState.getCalcState();
            break;
        case 'clear':
            writeToScreen('', false, true);
            calcState.getCalcState();
            break;
    }
}

// adds event listener to the keys
function generateEventListeners() {
    keys.addEventListener('click', (e) => {
        keyPress(e);
    });
}

generateEventListeners();
