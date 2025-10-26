import { describe, it, expect, beforeEach } from 'vitest';
import { StringCalculator } from './stringCalculator';

describe('StringCalculator', () => {
    let calculator: StringCalculator;

    beforeEach(() => {
        calculator = new StringCalculator();
    });

    describe('add method', () => {
        it('should throw error for empty string', () => {
            expect(() => calculator.add('')).toThrow('Please enter numbers before calculating');
        });

        it('should throw error for whitespace only', () => {
            expect(() => calculator.add('   ')).toThrow('Please enter numbers before calculating');
        });

        it('should return the number for a single number', () => {
            expect(calculator.add('1')).toBe(1);
        });

        it('should handle whitespace around numbers', () => {
            expect(calculator.add(' 1 ')).toBe(1);
        });

        it('should add two numbers separated by a comma', () => {
            expect(calculator.add('1,2')).toBe(3);
        });

        it('should add multiple numbers', () => {
            expect(calculator.add('1,2,3,4,5')).toBe(15);
        });

        it('should handle whitespace between numbers', () => {
            expect(calculator.add('1, 2, 3')).toBe(6);
        });

        it('should throw error for invalid character', () => {
            expect(() => calculator.add('1,a')).toThrow('Invalid character: "a"');
        });

        it('should throw error for multiple invalid characters', () => {
            expect(() => calculator.add('1,a,b')).toThrow('Invalid characters: "a", "b"');
        });

        it('should handle consecutive commas by ignoring empty entries', () => {
            expect(calculator.add('1,,2')).toBe(3);
        });

        it('should handle numbers with leading zeros', () => {
            expect(calculator.add('01,02,03')).toBe(6);
        });

        // Edge cases
        it('should handle single digit numbers', () => {
            expect(calculator.add('1,2,3')).toBe(6);
        });

        it('should handle multi-digit numbers', () => {
            expect(calculator.add('10,20,30')).toBe(60);
        });

        it('should handle zero values', () => {
            expect(calculator.add('0,0,0')).toBe(0);
        });

        it('should handle mixed single and multi-digit numbers', () => {
            expect(calculator.add('1,20,300')).toBe(321);
        });
    });
});
