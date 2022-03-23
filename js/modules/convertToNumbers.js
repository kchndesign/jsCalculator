const convertToNumbers2 = (string) => {
    let operator = new RegExp(/[×÷\-\+]/);

    let numOpArr = [];
    let numOpIndex = 0;
    let lastCharType = 'new';

    // loop through the string.
    // put digits into the same index in numOp array
    // until you find an operator
    [...string].forEach((item) => {
        // if digit
        if (parseInt(item) >= 0 && lastCharType === 'new') {
            numOpArr[numOpIndex] = item;
            lastCharType = 'number';
        } else if (parseInt(item) >= 0 && lastCharType === 'number') {
            numOpArr[numOpIndex] += item;
            lastCharType = 'number';
        } else if (parseInt(item) >= 0 && lastCharType === 'operator') {
            numOpArr[++numOpIndex] = item;
            lastCharType = 'number';
        } else if (operator.test(item) && lastCharType === 'number') {
            switch (item) {
                case '×':
                    numOpArr[++numOpIndex] = 'times';
                    break;
                case '÷':
                    numOpArr[++numOpIndex] = 'divide';
                    break;
                case '-':
                    numOpArr[++numOpIndex] = 'minus';
                    break;
                case '+':
                    numOpArr[++numOpIndex] = 'plus';
                    break;
                default:
                    numOpArr[++numOpIndex] = 'unrecognised';
                    break;
            }
            lastCharType = 'operator';
        } else {
            throw 'invalid input';
        }
    });

    // take any operator off the back
    let lastItem = numOpArr.pop();
    if (parseFloat(lastItem)) {
        numOpArr.push(lastItem);
    }

    // throw if empty string
    if (numOpArr.length === 0) {
        throw 'empty string';
    }

    return numOpArr.map((item) => {
        if (parseFloat(item)) {
            return parseFloat(item);
        } else return item;
    });
};

//
//
//
//
//
// another way to do this
const convertToNumbers = (string) => {
    // test if there are any letters or invalid chars
    if (
        /[^0-9×÷\-\+]/.test(string) ||
        string == '' ||
        typeof string != 'string'
    ) {
        throw 'Invalid chars in input.';
    }

    let isOperator = new RegExp(
        /(?=×)|(?<=×)|(?=÷)|(?<=÷)|(?=-)|(?<=-)|(?=\+)|(?<=\+)/,
    );

    let arr = string.split(isOperator);

    // take any operator off the back
    let lastItem = arr.pop();
    if (parseFloat(lastItem)) {
        arr.push(lastItem);
    }

    // keep track of multiple operators in a row
    let prevItem = 'number';

    return arr.map((item) => {
        if (!parseFloat(item) && prevItem == 'number') {
            switch (item) {
                case '×':
                    prevItem = 'operator';
                    return 'times';
                case '÷':
                    prevItem = 'operator';
                    return 'divide';
                case '-':
                    prevItem = 'operator';
                    return 'minus';
                case '+':
                    prevItem = 'operator';
                    return 'plus';
            }
        } else if (parseFloat(item)) {
            prevItem = 'number';
            return parseFloat(item);
        } else throw 'invalid input';
    });
};

export { convertToNumbers };
