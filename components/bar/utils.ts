/*
 * @Description: 柱状图工具函数
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-11 10:52:48
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-12 16:05:34
 */

import { AxisMode } from '../cartesian/interface';
import { error } from '../_utils/logger';
import { BarDataType } from './interface';

export function validData(data: BarDataType): void {
  data.forEach((v) => {
    if (typeof v !== 'number') {
      error(`unexpect data type: ${typeof v}`);
    }
  });
}

export function matchWithAxisMode(
  data: BarDataType[number],
  xMode: AxisMode,
  yMode: AxisMode
): void {
  if (xMode === 'value' && yMode === 'value' && typeof data !== 'number') {
    throw new Error(`类型为 ${typeof data} 的数据不能应用于当前坐标系`);
  } else if (
    xMode === 'value' &&
    yMode === 'enum' &&
    typeof data !== 'number' &&
    (typeof data[0] !== 'number' || typeof data[1] !== 'string')
  ) {
    throw new Error(`类型为 ${typeof data} 的数据不能应用于当前坐标系`);
  } else if (
    xMode === 'enum' &&
    yMode === 'value' &&
    typeof data !== 'number' &&
    (typeof data[0] !== 'string' || typeof data[1] !== 'number')
  ) {
    throw new Error(`类型为 ${typeof data} 的数据不能应用于当前坐标系`);
  } else if (
    xMode === 'enum' &&
    yMode === 'enum' &&
    typeof data !== 'number' &&
    (typeof data[0] !== 'string' || typeof data[1] !== 'string')
  ) {
    throw new Error(`类型为 ${typeof data} 的数据不能应用于当前坐标系`);
  }
}
