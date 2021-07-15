/**
 * Create a range of numbers. If only one parameter is provided, then it
 * became the `max` number and the `min` defaults to 0.
 *
 * @param min The first number in the range (inclusive).
 * @param max The last number in the range (exclusive).
 * @returns A range of number.
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
