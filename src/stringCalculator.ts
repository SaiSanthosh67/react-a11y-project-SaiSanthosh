export class CalculatorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CalculatorError";
  }
}

export function add(numbers: string): number {
  if (!numbers || numbers.trim() === "") {
    return 0;
  }

  const trimmedInput = numbers.trim();
  const parts = trimmedInput.split(",");

  if (parts.length === 0) {
    return 0;
  }

  const numArray: number[] = [];
  const invalidInputs: string[] = [];

  parts.forEach((part, index) => {
    const trimmedPart = part.trim();

    if (trimmedPart === "") {
      return;
    }

    const numberRegex = /^-?\d+(\.\d+)?$/;

    if (!numberRegex.test(trimmedPart)) {
      invalidInputs.push(`"${trimmedPart}" at position ${index + 1}`);
      return;
    }

    const parsed = parseFloat(trimmedPart);
    numArray.push(parsed);
  });

  if (invalidInputs.length > 0) {
    throw new CalculatorError(
      `Invalid input detected: ${invalidInputs.join(
        ", "
      )}. Please enter only numbers separated by commas.`
    );
  }

  if (numArray.length === 0) {
    throw new CalculatorError("No valid numbers found in input.");
  }

  const sum = numArray.reduce((total, num) => total + num, 0);

  if (!isFinite(sum)) {
    throw new CalculatorError("Calculation resulted in an invalid number.");
  }

  return sum;
}
