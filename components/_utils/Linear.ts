/*
 * @Description:
 * @version:
 * @Author: liuyin
 * @Date: 2021-02-28 10:57:24
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-12 17:43:50
 */

import { Coordinate } from './types';

/**
 * 线性方程
 */
export default class Linear {
  /**
   * 斜率
   */
  private _k: number;
  /**
   * y 轴偏移
   */
  private _c: number;
  /**
   * 两点式
   * 通过直线上的两点，初始化一条直线
   * @param p0 第一个点坐标
   * @param p1 第二个点坐标
   */
  constructor(p0: Coordinate, p1: Coordinate);
  /**
   * 点斜式
   * 通过直线上一点与直线的斜率，初始化一条直线
   * @param p 直线经过点坐标
   * @param k 斜率
   */
  constructor(p: Coordinate, k: number);
  /**
   * 斜截式
   * 通过直线的斜率与直线与 y 轴交点的纵坐标，初始化一条直线
   * @param k 斜率
   * @param b y 轴偏移
   */
  constructor(k: number, b: number);
  /**
   * 构造函数的实现
   * @param arg0 参数1
   * @param arg1 参数2
   */
  constructor(arg0: Coordinate | number, arg1: Coordinate | number) {
    if (typeof arg0 === 'number' && typeof arg1 === 'number') {
      // 两个参数都为 number，说明是斜截式
      this._k = arg0;
      this._c = arg1;
    } else if (typeof arg0 !== 'number' && typeof arg1 === 'number') {
      // 第一个参数是 Coordinate，第二个参数是 number，说明是点斜式
      this._k = arg1;
      this._c = arg0[1] - arg1 * arg0[0];
    } else if (typeof arg0 !== 'number' && typeof arg1 !== 'number') {
      // 两个都是 Coordinate，说明是两点式
      this._k = (arg0[1] - arg1[1]) / (arg0[0] - arg1[0]);
      this._c = arg0[1] - this._k * arg0[0];
    } else {
      this._k = 0;
      this._c = 0;
    }
  }
  /**
   * 获取这条线的垂直线
   * 返回的对象斜率为 `-1 / k`（`k` 为当前直线的斜率），在 y 轴的偏移为 `0`
   * @returns 线性方程对象
   */
  perpendicular(): Linear {
    return new Linear(-1 / this._k, 0);
  }
  /**
   * 计算距离为 `d` 的两条平行线
   * @param d 距离
   */
  parallel(d: number): [Linear, Linear] {
    const c1 = this._c - d * Math.sqrt(this._k * this._k + 1);
    const c2 = this._c + d * Math.sqrt(this._k * this._k + 1);
    return [new Linear(this._k, c1), new Linear(this._k, c2)];
  }
  /**
   * 计算本直线与直线 `line` 的交点，如果没有交点则返回 `undefined`
   * @param line 线
   * @returns 交点或 `undefined`
   */
  intersection(line: Linear): Coordinate | undefined {
    if (this._k === line.k) {
      // 斜率相等说明平行，不会有交点
      return undefined;
    }
    const x = (line._c - this._c) / (this._k - line._k);
    const y = (this._k * line._c - line._k * this._c) / (this._k - line._k);
    return [x, y];
  }
  /**
   * 获取这条线与 x 轴的夹角，`mode` 默认为 `rad`
   * @param mode 返回的角度单位，枚举类型
   * @returns 与 x 轴的夹角，值域[-`Math.PI` / 2, `Math.PI` / 2]
   */
  getAngle(mode: 'rad' | 'deg' = 'rad'): number {
    const rad = Math.atan(this._k);
    if (mode === 'deg') {
      return (rad * 180) / Math.PI;
    }
    return rad;
  }
  /**
   * 获取斜率
   */
  get k(): number {
    return this._k;
  }
  /**
   * 设置斜率
   */
  set k(v: number) {
    this._k = v;
  }
  /**
   * 获取 y 轴偏移
   */
  get c(): number {
    return this._c;
  }
  /**
   * 设置 y 轴偏移
   */
  set c(v: number) {
    this._c = v;
  }
}
