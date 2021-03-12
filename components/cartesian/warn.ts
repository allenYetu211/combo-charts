/*
 * @Description: 警告提示
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-12 14:47:44
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-12 14:53:46
 */

import { warn } from '../_utils/logger';
import { Axis } from './types';

export function axisWarn(
  name: 'yAxis' | 'xAxis',
  axis: Axis | undefined
): void {
  if (!axis) {
    warn(`unexpect ${name}: ${axis}`);
    return;
  }
  if (!axis.mode) {
    warn(`unexpect ${name}.mode: ${axis.mode}`);
    return;
  }
  return;
}
