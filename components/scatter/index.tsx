/*
 * @Description: 散点
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-09 14:10:45
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-12 17:43:58
 */
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { Coordinate } from '../_utils/types';
import * as d3Selection from 'd3-selection';
import GeoContext from '../geo/context';

export interface ScatterStyle {
  color?: string;
  borderColor?: string;
  borderWidth?: number;
}

interface ScatterPropsType {
  data?: Coordinate[];
  size?: number | string;
  style?: ScatterStyle;
}

const Scatter: React.FC<ScatterPropsType> = (props: ScatterPropsType) => {
  const { data, style, size } = props;
  const ref = useRef<SVGGElement>(null);
  const { projection } = useContext(GeoContext);

  const redraw = useCallback(() => {
    if (ref.current && data && projection) {
      const res: { x: number; y: number }[] = [];
      data.forEach((v) => {
        const p = projection(v);
        if (p) {
          res.push({
            x: p[0] || 0,
            y: p[1] || 0,
          });
        }
      });
      d3Selection
        .select(ref.current)
        .selectAll('circle')
        .data(res)
        .join('circle')
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
        .attr('r', size || 0);
    }
  }, [data, projection, size]);

  const restyle = useCallback(() => {
    if (ref.current) {
      d3Selection
        .selectAll('circle')
        .attr('fill', () => style?.color || null)
        .attr('stroke', () => style?.borderColor || null)
        .attr('stroke-width', () => style?.borderWidth || null);
    }
  }, [style]);

  useEffect(() => {
    redraw();
    restyle();
  }, [restyle, redraw]);

  return <g ref={ref} />;
};

export default Scatter;
