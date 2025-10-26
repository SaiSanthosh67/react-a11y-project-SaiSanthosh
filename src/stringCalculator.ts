export class StringCalculator {
    add(numbers: string): number {
        if (!numbers.trim()) {
            throw new Error('Please enter numbers before calculating');
        }

        const tokens = numbers
            .split(',')
            .map(t => t.trim())
            .filter(t => t !== '');

        const numberArray: number[] = [];
        const invalidNumbers: string[] = [];
        
        for (const token of tokens) {
            const parsed = parseInt(token, 10);
            if (Number.isNaN(parsed)) {
                invalidNumbers.push(token);
            } else {
                numberArray.push(parsed);
            }
        }

        if (invalidNumbers.length > 0) {
            const invalidList = invalidNumbers.map(n => `"${n}"`).join(', ');
            const errorMessage = invalidNumbers.length === 1
                ? `Invalid character: ${invalidList}`
                : `Invalid characters: ${invalidList}`;
            throw new Error(errorMessage);
        }

        return numberArray.reduce((sum, num) => sum + num, 0);
    }
}
