// get an array of what is on the display
// discard the previous subtext value if
// there is no operator at the front.

// get last item in the array, check if it starts with an operator
// if starts with operator then return both in one string
// else return only one
const getCurrentExpr = (inputArr) => {
    if (!Array.isArray(inputArr)) {
        throw 'getCurrentExpr takes an array';
    }

    let lastItem = inputArr[inputArr.length - 1];

    if (/[0-9]/.test(lastItem.charAt(0))) {
        return lastItem;
    } else {
        return inputArr.join('');
    }
};

export { getCurrentExpr };
