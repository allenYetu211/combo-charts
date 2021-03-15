/*
 * @Description: 类型声明
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-15 13:38:01
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-15 13:38:29
 */
import * as d3Zoom from 'd3-zoom';

export interface ZoomFunction {
  (
    this: SVGSVGElement,
    event: d3Zoom.D3ZoomEvent<SVGSVGElement, unknown>
  ): void;
}
