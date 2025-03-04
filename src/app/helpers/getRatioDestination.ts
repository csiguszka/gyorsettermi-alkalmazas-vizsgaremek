export function getRatioDestination(num: number) {
  if (num === 0) {
    return "same";
  }
  if (num < 0) {
    return "down";
  }
  if (num > 0) {
    return "up";
  }
  return "same";
}
