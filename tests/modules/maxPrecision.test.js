const { describe, expect, beforeEach, it } = require('@jest/globals');

import { maxPrecision } from '../../js/modules/maxPrecision';

let validNumber = 12345;
let longNumber = 123456789;

describe('maxPrecision() function', () => {
    test('should return a string', () => {
        expect(typeof maxPrecision(validNumber)).toBe('string');
    });

    test('should throw if either parameter is not a number', () => {
        expect(() => {
            maxPrecision('asdf');
        }).toThrow();

        expect(() => {
            maxPrecision(validNumber, 'asdf');
        }).toThrow();
    });

    test('should return a valid string with just a number as input', () => {
        expect(maxPrecision(validNumber)).toBe('12345');
    });

    test('should return the the same number for numbers with less digits than the specified precision', () => {
        expect(maxPrecision(validNumber, 5)).toBe('12345');
    });

    test('should return a shortened number for numbers with more digits than the specified precision', () => {
        expect(maxPrecision(longNumber, 5)).toBe('1.2346e+8');
    });
});
