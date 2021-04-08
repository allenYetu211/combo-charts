/*
 * @Description: 笛卡尔坐标系类型声明
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-10 15:33:51
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-31 15:02:27
 */
import * as d3Axis from 'd3-axis';
import * as d3Zoom from 'd3-zoom';
import { Coordinate, Scale } from '../../types';

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

export type AxisType = ValueAxis | CategoryAxis;

export type Space = [number, number, number, number] | number;

/**
 * [top, right, bottom, left]
 */
export type FullSpace = [number, number, number, number];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AxisProjection = d3Axis.AxisScale<any>;

export type ProjectionSetter = (
  type: 'x' | 'y',
  minValue: number,
  maxValue: number
) => void;

export interface ZoomType {
  previous: d3Zoom.ZoomTransform;
  current: d3Zoom.ZoomTransform;
  scale: number;
  point: [number, number];
}

export interface CartesianChildrenProps {
  data?: number[] | Coordinate[];
}

export interface MultiAxisScale {
  x: Required<Scale>;
  y: Required<Scale>;
}

export type CartesianScale = Scale & {
  x?: Scale;
  y?: Scale;
};
