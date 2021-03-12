/*
 * @Description: 提示信息
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-12 14:36:47
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-12 14:39:18
 */

export function error(msg: string): void {
  throw new Error(msg);
}

export function warn(msg: string): void {
  console.warn(msg);
}
