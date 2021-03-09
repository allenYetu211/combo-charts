/*
 * @Description:
 * @version:
 * @Author: liuyin
 * @Date: 2021-03-08 16:12:12
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-09 13:56:59
 */
import React, { useRef, useContext, useCallback, useEffect } from 'react';
import { Coordinate } from '../_utils/interface';
import * as d3Selection from 'd3-selection';
import * as d3Path from 'd3-path';
import GeoContext from '../geo/context';
import { hasNaN } from '../_utils/utils';
import { computeControllPoint } from './utils';

export interface LinesStyle {
  color?: string;
  width?: number;
}

export interface LinesData {
  start: Coordinate;
  end: Coordinate;
}

interface LinesPropsType {
  data?: LinesData[];
  curve?: number | string;
  style?: LinesStyle;
}

const Lines: React.FC<LinesPropsType> = (props: LinesPropsType) => {
  const { data, style, curve } = props;
  const ref = useRef<SVGGElement>(null);
  const { projection } = useContext(GeoContext);

  const redraw = useCallback(() => {
    if (data && ref.current && projection) {
      const validData = data.filter(
        (v) => JSON.stringify(v.start) !== JSON.stringify(v.end)
      );
      const b = d3Selection.select(ref.current);
      b.selectAll('path')
        .data(validData)
        .join('path')
        .attr('d', function (data) {
          const { start, end } = data;
          const p0 = projection(start) || [0, 0]; // 起始点投影坐标
          const p1 = projection(end) || [0, 0]; // 终止点投影坐标
          if (hasNaN(p0) || hasNaN(p1)) {
            return '';
          }
          const ctlPnt = computeControllPoint(
            p0,
            p1,
            curve ? Number(curve) : 0
          );
          const path = d3Path.path();
          path.moveTo(p0[0], p0[1]);
          path.quadraticCurveTo(ctlPnt[0], ctlPnt[1], p1[0], p1[1]);
          return path.toString();
        });
    }
  }, [data, projection, curve]);

  const restyle = useCallback(() => {
    if (ref.current) {
      d3Selection
        .select(ref.current)
        .selectAll('path')
        .attr('fill', 'none')
        .attr('stroke', function () {
          return style?.color || '#000';
        })
        .attr('stroke-width', function () {
          return style?.width || 1;
        });
    }
  }, [style]);

  useEffect(() => {
    redraw();
    restyle();
  }, [redraw, restyle]);

  return <g ref={ref} />;
};

export default Lines;
