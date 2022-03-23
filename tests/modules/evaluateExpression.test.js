const { describe, expect, beforeEach, it } = require('@jest/globals');

import { evaluateExpression } from '../../js/modules/evaluateExpression';

let validArray = [123, 'times', 456, 'plus', 32];
let operatorFirst = ['times', 123, 'plus', 456];
let operatorLast = [123, 'times', 456, 'plus'];

describe('evaluateExpression() function', () => {
    test('should return defined output', () => {
        expect(evaluateExpression(validArray)).toBeDefined;
    });

    test('should return a string from a valid input', () => {
        expect(typeof evaluateExpression(validArray)).toEqual('string');
    });

    test('should throw upon empty array', () => {
        expect(() => {
            evaluateExpression([]);
        }).toThrow();
    });

    test('should throw upon receiving non-array', () => {
        expect(() => {
            evaluateExpression('string');
        }).toThrow();
    });

    test('should throw if there is an operator first or last', () => {
        expect(() => {
            evaluateExpression(operatorFirst);
        });
        expect(() => {
            evaluateExpression(operatorLast);
        });
    });

    test('should return the correct result', () => {
        expect(evaluateExpression(validArray)).toEqual('56120');
    });
});
