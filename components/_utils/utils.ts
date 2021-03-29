/*
 * @Description: 工具函数
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-08 17:01:30
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-29 15:29:36
 */
export function hasNaN(arr: number[]): boolean {
  for (const v of arr) {
    if (Number.isNaN(v)) {
      return true;
    }
  }
  return false;
}

export function validNumber(v: string | number | undefined): number {
  if (!v) {
    return 0;
  }
  if (typeof v === 'number') {
    return v;
  }
  if (/^[0-9]+.?[0-9]*$/.test(v)) {
    return Number(v);
  }
  return 0;
}
