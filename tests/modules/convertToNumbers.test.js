const { describe, expect, beforeEach, it } = require('@jest/globals');

import { convertToNumbers } from '../../js/modules/convertToNumbers';

let validString = '320×200';
let longValidString = '1+2-3×5÷6';
let hangingOperator = '320×200÷';
let numberOnly = '320';
let numbersAndLetters = '2h23×9f0';
let emptyString = '';
let multipleOperators = '320-÷200';
let negativeAtFront = '-320+200';

describe('convertToNumbers() function', () => {
    test('should return defined output', () => {
        expect(convertToNumbers(validString)).toBeDefined;
    });

    test('should reject non string inputs', () => {
        expect(() => {
            convertToNumbers(123);
        }).toThrow();
    });

    test('should throw upon receiving rogue characters', () => {
        expect(() => {
            convertToNumbers(numbersAndLetters);
        }).toThrow();
    });

    test('should throw upon receiving empty string', () => {
        expect(() => {
            convertToNumbers(emptyString);
        }).toThrow();
    });

    test('should throw upon receiving multiple operators in a row', () => {
        expect(() => {
            convertToNumbers(multipleOperators);
        }).toThrow();
    });

    test('should return an array with valid input', () => {
        expect(Array.isArray(convertToNumbers(validString))).toBe(
            true,
        );
    });

    test('should return the correct value with valid input', () => {
        expect(convertToNumbers(validString)).toStrictEqual([
            320,
            'times',
            200,
        ]);
    });

    test('should handle multiple operators', () => {
        expect(convertToNumbers(longValidString)).toStrictEqual([
            1,
            'plus',
            2,
            'minus',
            3,
            'times',
            5,
            'divide',
            6,
        ]);
    });

    test('should handle single numbers and return an array with a single number', () => {
        expect(convertToNumbers(numberOnly)).toStrictEqual([320]);
    });

    test('should trim operators off the end and give valid output', () => {
        expect(convertToNumbers(hangingOperator)).toStrictEqual([
            320,
            'times',
            200,
        ]);
    });

    test('should return negative number when negative operator at the front', () => {
        expect(convertToNumbers(negativeAtFront)).toStrictEqual([
            -320,
            'plus',
            200,
        ]);
    });
});
