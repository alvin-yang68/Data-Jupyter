/**
 * Create a range of numbers.
 *
 * @param min The first number in the range.
 * @param max The last number in the range.
 * @returns The range.
 */
export function range(min: number, max?: number): number[] {
  // If only one number is provided, start at zero
  if (max === undefined) {
    max = min;
    min = 0;
  }

  // Create a ranged array
  return Array.from(new Array(max - min).keys()).map((num) => num + min);
}
