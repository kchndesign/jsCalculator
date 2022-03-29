// this is a highly strict evaluation function
// that takes an array of alteranting numbers and operators
// it does not respect order of operations

const evaluateExpression = (inputArr) => {
    let currentOperation = 'none';
    let operand = 0;
    let accumulator = inputArr[0];

    if (!Array.isArray(inputArr) || inputArr.length == 0) {
        throw 'evaluateExpression: invalid input type or length';
    }

    if (
        typeof inputArr[0] != 'number' ||
        typeof inputArr[inputArr.length - 1] != 'number'
    ) {
        throw 'evaluateExpression: operator first or last in array';
    }

    // loop through the array.
    // when an operator is encountered,
    // set the current operation variable to current operator,
    // when the next number is encountered an evaluation is made
    // and saved in the accumulator.

    inputArr.forEach((item, index) => {
        if (index == 0) {
            return;
        }

        switch (item) {
            case 'times':
            case 'divide':
            case 'plus':
            case 'minus':
                if (currentOperation != 'none') {
                    throw 'evaluateExpression: multiple operators in a row';
                }
                currentOperation = item;
                break;
            default:
                switch (currentOperation) {
                    case 'times':
                        accumulator = accumulator * item;
                        currentOperation = 'none';
                        break;
                    case 'divide':
                        accumulator = accumulator / item;
                        currentOperation = 'none';
                        break;
                    case 'plus':
                        accumulator = accumulator + item;
                        currentOperation = 'none';
                        break;
                    case 'minus':
                        accumulator = accumulator - item;
                        currentOperation = 'none';
                        break;
                }
        }
    });

    return accumulator;
};

export { evaluateExpression };
