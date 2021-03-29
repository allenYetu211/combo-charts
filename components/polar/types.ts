/*
 * @Description:
 * @version:
 * @Author: liuyin
 * @Date: 2021-03-29 15:07:57
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-29 15:08:37
 */
import * as d3Shape from 'd3-shape';

export type PolarProjectionType = d3Shape.Pie<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  | number
  | {
      valueOf(): number;
    }
>;
