/*
 * @Description: 工具函数
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-08 17:01:30
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-08 17:01:42
 */
export function hasNaN(arr: number[]): boolean {
  for (const v of arr) {
    if (Number.isNaN(v)) {
      return true;
    }
  }
  return false;
}
