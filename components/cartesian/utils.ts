/*
 * @Description:
 * @version:
 * @Author: liuyin
 * @Date: 2021-03-10 09:26:23
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-17 21:00:36
 */
import * as d3Scale from 'd3-scale';
import { Axis, AxisProjection, CartesianStyle, FullSpace } from './types';

/**
 * 获取轴线映射函数
 * @param axis 轴线配置项
 * @param range 渲染范围
 * @returns 轴线映射函数
 */
export function getAxisProjection(
  axis: Axis,
  range: [number, number]
): AxisProjection | undefined {
  switch (axis.mode) {
    case 'value': {
      if (axis.min === undefined || axis.max === undefined) {
        // min 或 max 不存在的时候返回 undefined
        return undefined;
      }
      return d3Scale
        .scaleLinear()
        .domain([axis.min, axis.max])
        .nice()
        .range(range)
        .unknown(0);
    }
    default:
      return d3Scale
        .scaleBand()
        .domain(axis.domain || [])
        .range(range)
        .padding(0.1);
  }
}

/**
 * 根据组件样式计算出完整的组件 padding
 * @param style 组件样式
 * @returns padding
 */
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
