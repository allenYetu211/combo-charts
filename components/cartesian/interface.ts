/*
 * @Description: 笛卡尔坐标系类型声明
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-10 15:33:51
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-12 17:17:41
 */
import * as d3Scale from 'd3-scale';

export interface CartesianStyle {
  padding?: Space;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
}

export type AxisMode = 'value' | 'enum';

export interface AxisValue {
  mode?: 'value';
  min?: number;
  max?: number;
}

export interface AxisEnum {
  mode?: 'enum';
  domain?: string[];
}

export type Axis = AxisValue | AxisEnum;

export type Space = [number, number, number, number] | number;

/**
 * [top, right, bottom, left]
 */
export type FullSpace = [number, number, number, number];

export type AxisProjection = {
  value?: d3Scale.ScaleLinear<number, number, number>;
  enum?: d3Scale.ScaleBand<string>;
};

export type ProjectionSetter = (minValue: number, maxValue: number) => void;
