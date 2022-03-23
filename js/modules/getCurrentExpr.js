// get an array of what is on the display
// discard the previous subtext value if
// there is no operator at the front.
const getCurrentExpr = (inputArr) => {
    if (/[0-9]/.test(inputArr[1].charAt(0))) {
        return inputArr[1];
    }
};

export { getCurrentExpr };
