const { describe, expect, beforeEach, it } = require('@jest/globals');
// const { getCurrentExpr } = import('../../js/modules/getCurrentExpr');

import { getCurrentExpr } from '../../js/modules/getCurrentExpr';

// const { getCurrentExpr } = thisThing;

// const { getCurrentExpr } = ('../../js/modules/getCurrentExpr');

let validArrStrings = ['12348', '3245×587'];
let invalidArrStrings = ['hello', 123];
let usesPrevResult = ['300', '×400'];

describe('Testing getCurrentExpr() function.', () => {
    test('should return defined input', () => {
        expect(getCurrentExpr(validArrStrings)).toBeDefined;
    });

    test('should reject bad inputs', () => {
        expect(getCurrentExpr(invalidArrStrings)).toThrow();
    });

    test('should return a string', () => {
        expect(typeof getCurrentExpr(validArrStrings)).toBe('string');
    });

    test('should return the correct value', () => {
        expect(getCurrentExpr(validArrStrings)).stringMatching('3245×587');
    });

    test('should include previous result if first char of the current string is an operator', () => {
        expect(getCurrentExpr(usesPrevResult)).stringMatching('300×400');
    });
});
