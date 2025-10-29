import { describe, it, expect } from "vitest";
import { add, CalculatorError } from "./stringCalculator";

describe("String Calculator", () => {
  describe("Basic functionality", () => {
    it("should return 0 for empty string", () => {
      expect(add("")).toBe(0);
    });

    it("should return the number for single number", () => {
      expect(add("5")).toBe(5);
    });

    it("should return sum of comma-separated numbers", () => {
      expect(add("1,2,3")).toBe(6);
    });

    it("should handle decimals", () => {
      expect(add("1.5,2.5,3")).toBe(7);
    });
  });

  describe("Edge cases", () => {
    it("should handle spaces around numbers", () => {
      expect(add("1 , 2 , 3")).toBe(6);
    });

    it("should handle empty values between commas", () => {
      expect(add("1,,2")).toBe(3);
    });

    it("should handle large numbers", () => {
      expect(add("1000,2000")).toBe(3000);
    });
  });

  describe("Error handling", () => {
    it("should throw error for invalid input with letters", () => {
      expect(() => add("1,a,3")).toThrow(CalculatorError);
      expect(() => add("1,a,3")).toThrow("Invalid input detected");
    });

    it("should throw error for numbers with trailing letters", () => {
      expect(() => add("1a,2,3")).toThrow(CalculatorError);
      expect(() => add("1a,2,3")).toThrow('"1a" at position 1');
    });

    it("should throw error for mixed alphanumeric", () => {
      expect(() => add("12abc,5")).toThrow(CalculatorError);
    });

    it("should throw error when no valid numbers", () => {
      expect(() => add(",,,")).toThrow(CalculatorError);
      expect(() => add(",,,")).toThrow("No valid numbers found");
    });
  });
});
