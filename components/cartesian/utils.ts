/*
 * @Description:
 * @version:
 * @Author: liuyin
 * @Date: 2021-03-10 09:26:23
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-10 15:47:17
 */
import * as d3Scale from 'd3-scale';
import { AxisMode, CartesianStyle, FullSpace } from './interface';

export function getAxisProjection(
  mode: 'value',
  min: number,
  max: number,
  range: [number, number]
): d3Scale.ScaleLinear<number, number, never>;

export function getAxisProjection(
  mode: 'enum',
  data: string[],
  range: [number, number]
): d3Scale.ScaleBand<string>;

export function getAxisProjection(
  arg0: AxisMode,
  arg1: number | string[],
  arg2: number | [number, number],
  arg3?: [number, number]
): d3Scale.ScaleLinear<number, number> | d3Scale.ScaleBand<string> | undefined {
  if (
    arg0 === 'value' &&
    typeof arg1 === 'number' &&
    typeof arg2 === 'number' &&
    Array.isArray(arg3)
  ) {
    return d3Scale.scaleLinear().domain([arg1, arg2]).nice().range(arg3);
  }
  if (arg0 === 'enum' && Array.isArray(arg1) && Array.isArray(arg2)) {
    return d3Scale.scaleBand().domain(arg1).range(arg2);
  }
  return undefined;
}

export function validPadding(style: CartesianStyle | undefined): FullSpace {
  let padding: FullSpace = [0, 0, 0, 0];
  if (
    style?.padding &&
    Array.isArray(style.padding) &&
    style.padding.length === 4
  ) {
    // full space
    padding = style.padding;
  } else if (style?.padding && typeof style.padding === 'number') {
    // single space
    padding = [style.padding, style.padding, style.padding, style.padding];
  }
  if (style?.paddingTop) {
    // top space
    padding[0] = style.paddingTop;
  }
  if (style?.paddingRight) {
    // right space
    padding[1] = style.paddingRight;
  }
  if (style?.paddingBottom) {
    // bottom space
    padding[2] = style.paddingBottom;
  }
  if (style?.paddingLeft) {
    // left space
    padding[3] = style.paddingLeft;
  }
  return padding;
}
