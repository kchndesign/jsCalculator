import { evaluateExpression } from './modules/evaluateExpression';

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
        lastLine.classList.add('display__text--subtext');
        lineArr[1].remove();
        display.innerHTML += `<p class="display__text">${string}</p>`;
    } else if (lastLine.textContent === '0') {
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
// bound to the calc div
//
// data-current-operator:
//      none: no operator has been pressed
//      plus, minus, times, divide:
//          this one has been pressed

function keyPress(event) {
    const key = event.target;
    const keyType = key.dataset.buttonType;
    const calcState = calc.dataset;

    switch (keyType) {
        case 'operator':
            // clean state meaning no inputs yet
            if (calcState.clean == 'true') {
                break;
            }

            calcState.currentOperator == 'none'
                ? writeToScreen(key.textContent)
                : writeToScreen(key.textContent, true);

            // set currentOperator to the pressed key
            calcState.currentOperator = key.textContent;
            break;
        case 'number':
            calcState.clean == 'true'
                ? writeToScreen(key.textContent, true)
                : writeToScreen(key.textContent);

            calcState.clean = 'false';
            calcState.currentOperator = 'none';

            break;
        case 'decimal':
            if (calcState.decimal == 'true') {
                break;
            }

            writeToScreen(key.textContent);
            calcState.clean = 'false';
            calcState.currentOperator = 'none';
            calcState.decimal = 'true';
            break;
        case 'equal':
            const lineArr = document.querySelectorAll('.display__text');
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
            } catch {}
            break;
        // let currentExpr = getCurrentExpr(textArr);
        // let finalExpr = convertToNumbers();
        // let result = evaluateNumbers();
        // writeToScreen(result);
    }
}

// adds event listener to the keys
function generateEventListeners() {
    keys.addEventListener('click', (e) => {
        keyPress(e);
    });
}

generateEventListeners();
