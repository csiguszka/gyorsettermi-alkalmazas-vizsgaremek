export function ratioCalculator(current: number, prev: number): number {
  if (prev === 0) {
    return current === 0 ? 0 : 100; // Ha mindkettő nulla, nincs változás, egyébként 100%-os növekedés
  }

  return ((current - prev) / Math.abs(prev)) * 100;
}
