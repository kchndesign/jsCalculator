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
