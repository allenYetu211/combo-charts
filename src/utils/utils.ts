export function hasNaN(arr: number[]): boolean {
  for (const v of arr) {
    if (Number.isNaN(v)) {
      return true;
    }
  }
  return false;
}

export function validNumber(
  v: string | number | undefined | { valueOf(): number }
): number {
  if (!v) {
    return 0;
  }
  if (typeof v === 'object') {
    return v.valueOf();
  }
  if (typeof v === 'number') {
    return v;
  }
  if (/^[+-]?(0|([1-9]\d*))(\.\d+)?$/.test(v)) {
    return Number(v);
  }
  return 0;
}
