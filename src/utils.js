// Get a random number within the specified range.
export function random(min, max) {
  return Math.random() * (max - min) + min;
}
