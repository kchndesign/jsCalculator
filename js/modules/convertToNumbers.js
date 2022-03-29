const convertToNumbers = (string) => {
    // test if there are any letters or invalid chars
    if (
        /[^0-9×÷\-\+.]/.test(string) ||
        string == '' ||
        typeof string != 'string'
    ) {
        throw 'Invalid chars in input.';
    }

    let isOperator = new RegExp(
        /(?=×)|(?<=×)|(?=÷)|(?<=÷)|(?=-)|(?<=-)|(?=\+)|(?<=\+)/,
    );

    let arr = string.split(isOperator);

    // keep track of multiple operators in a row
    let prevItem = 'number';

    let mappedArray = arr.map((item, index, arr) => {
        if (Number.isNaN(parseFloat(item)) && prevItem == 'number') {
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
        } else if (typeof parseFloat(item) == 'number') {
            prevItem = 'number';
            if (index == 1 && arr[0] == '-') {
                return parseFloat(-item);
            } else {
                return parseFloat(item);
            }
        } else throw 'invalid input';
    });

    // take any operator off the front
    let firstItem = mappedArray.shift();
    switch (typeof firstItem) {
        case 'number':
            mappedArray.unshift(firstItem);
            break;
        case 'string':
            break;
    }

    // take any operator off the back
    let lastItem = mappedArray.pop();
    switch (typeof lastItem) {
        case 'number':
            mappedArray.push(lastItem);
            break;
        case 'string':
            break;
    }

    return mappedArray;
};

export { convertToNumbers };
