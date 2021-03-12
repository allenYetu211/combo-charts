/*
 * @Description:
 * @version:
 * @Author: liuyin
 * @Date: 2021-03-10 09:26:23
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-12 17:44:29
 */
import * as d3Scale from 'd3-scale';
import {
  Axis,
  AxisMode,
  AxisProjection,
  CartesianStyle,
  // EnumAxisProjection,
  FullSpace,
  // ValueAxisProjection,
} from './types';

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
  let res: AxisProjection | undefined;
  switch (axis.mode) {
    case 'value': {
      if (axis.min === undefined || axis.max === undefined) {
        // min 或 max 不存在的时候返回 undefined
        res = undefined;
        break;
      }
      res = {
        value: d3Scale
          .scaleLinear()
          .domain([axis.min, axis.max])
          .nice()
          .range(range)
          .unknown(0),
      };
      break;
    }
    case 'enum':
      res = {
        enum: d3Scale
          .scaleBand()
          .domain(axis.domain || [])
          .range(range),
      };
      break;
    default:
      res = undefined;
  }
  return res;
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

/**
 * 检查 x 轴类型与 y 轴类型是否满足组件需求
 * @param xMode x 轴类型
 * @param yMode y 轴类型
 */
export function checkMode(xMode: AxisMode, yMode: AxisMode): void {
  if (
    (xMode !== 'enum' && xMode !== 'value') ||
    (yMode !== 'enum' && yMode !== 'value')
  ) {
    throw new Error('x 轴与 y 轴的类型必须是 AxisMode 枚举中的其中一个');
  }
  if (
    (xMode === 'value' && yMode === 'value') ||
    (xMode === 'enum' && yMode === 'enum')
  ) {
    throw new Error('x 轴与 y 轴的类型不能相同');
  }
}

/**
 * 检查轴线配置项是否符合轴类型
 * @param x x 轴配置项
 * @param y y 轴配置项
 */
export function checkAxisData(x: Axis, y: Axis): void {
  if (x.mode === 'enum') {
    (x.domain || []).forEach((v) => {
      if (typeof v !== 'string') {
        throw new Error(
          `x 轴值域与 x 轴类型不匹配，x 轴类型为 ${
            x.mode
          }，值域类型为 ${typeof v}，需要的值域类型为 string`
        );
      }
    });
  }
  if (y.mode === 'enum') {
    (y.domain || []).forEach((v) => {
      if (typeof v !== 'string') {
        throw new Error(
          `y 轴值域与 y 轴类型不匹配，y 轴类型为 ${
            y.mode
          }，值域类型为 ${typeof v}，需要的值域类型为 string`
        );
      }
    });
  }
}
