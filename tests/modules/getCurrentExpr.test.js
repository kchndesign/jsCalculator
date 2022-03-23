const { describe, expect, beforeEach, it } = require('@jest/globals');

import { getCurrentExpr } from '../../js/modules/getCurrentExpr';

let validArrStrings = ['12348', '3245×587'];
let invalidArrStrings = 'this that';
let usesPrevResult = ['300', '×400'];

describe('getCurrentExpr() function.', () => {
    test('should return defined output', () => {
        expect(getCurrentExpr(validArrStrings)).toBeDefined;
    });

    test('should reject non-array inputs', () => {
        expect(() => {
            getCurrentExpr(invalidArrStrings);
        }).toThrow();
    });

    test('should return a string when given valid input', () => {
        expect(typeof getCurrentExpr(validArrStrings)).toBe('string');
    });

    test('should return the correct value', () => {
        expect(getCurrentExpr(validArrStrings)).toEqual(
            expect.stringMatching('3245×587'),
        );
    });

    test('should include previous result if first char of the current string is an operator', () => {
        expect(getCurrentExpr(usesPrevResult)).toEqual(
            expect.stringMatching('300×400'),
        );
    });
});
