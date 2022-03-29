const maxPrecision = (number, precision = 10) => {
    if (typeof number != 'number' || typeof precision != 'number') {
        throw 'Export Precision: input is not number';
    }

    if (number.toString().length > precision) {
        return number.toPrecision(precision).toString();
    } else {
        return number.toString();
    }
};

export { maxPrecision };
