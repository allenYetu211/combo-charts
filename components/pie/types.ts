/*
 * @Description: pie types
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-29 15:20:24
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-29 15:22:55
 */

export interface PieDataStyle {
  color?: string;
}

export interface PieData {
  value: number;
  style?: PieDataStyle;
}
