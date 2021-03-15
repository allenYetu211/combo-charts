/*
 * @Description: 笛卡尔坐标系类型声明
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-10 15:33:51
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-15 17:05:32
 */
import * as d3Scale from 'd3-scale';

export interface CartesianStyle {
  padding?: Space;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
}

export type AxisMode = 'value' | 'category';

export interface ValueAxis {
  mode?: 'value';
  min?: number;
  max?: number;
}

export interface CategoryAxis {
  mode?: 'category';
  domain?: string[];
}

export type Axis = ValueAxis | CategoryAxis;

export type Space = [number, number, number, number] | number;

/**
 * [top, right, bottom, left]
 */
export type FullSpace = [number, number, number, number];

export type AxisProjection = {
  value?: d3Scale.ScaleLinear<number, number, number>;
  category?: d3Scale.ScaleBand<string>;
};

export type ProjectionSetter = (minValue: number, maxValue: number) => void;
