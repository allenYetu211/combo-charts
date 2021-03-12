/*
 * @Description:
 * @version:
 * @Author: liuyin
 * @Date: 2021-03-08 16:12:12
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-09 16:54:55
 */
import React, { useRef, useContext, useEffect, useMemo } from 'react';
import { Coordinate } from '../_utils/types';
import * as d3Selection from 'd3-selection';
import * as d3Path from 'd3-path';
import GeoContext from '../geo/context';
import { hasNaN } from '../_utils/utils';
import { computeControllPoint } from './utils';
import Motion from './Motion';

export type CurvePoints = [Coordinate, Coordinate, Coordinate];

export interface LinesModel {
  paths?: string[];
  points?: CurvePoints[];
}

export interface LinesStyle {
  color?: string;
  width?: number;
}

export interface LinesData {
  start: Coordinate;
  end: Coordinate;
}

export interface LinesPropsType {
  data?: LinesData[];
  curve?: number | string;
  style?: LinesStyle;
  mark?: string;
  useAnimation?: boolean;
  animationStyle?: LinesStyle;
  animationTime?: number;
}

const Lines: React.FC<LinesPropsType> = (props: LinesPropsType) => {
  const {
    data,
    style,
    curve,
    mark,
    animationStyle,
    animationTime,
    useAnimation,
  } = props;
  const ref = useRef<SVGGElement>(null);
  const { projection } = useContext(GeoContext);
  const model = useMemo<LinesModel>(() => {
    if (data && projection) {
      const validData = data.filter(
        (v) => JSON.stringify(v.start) !== JSON.stringify(v.end)
      );
      const points: CurvePoints[] = [];
      const paths: string[] = validData.map((v) => {
        const { start, end } = v;
        const p0 = projection(start) || [0, 0]; // 起始点投影坐标
        const p1 = projection(end) || [0, 0]; // 终止点投影坐标
        if (hasNaN(p0) || hasNaN(p1)) {
          return '';
        }
        const ctlPnt = computeControllPoint(p0, p1, curve ? Number(curve) : 0);
        points.push([p0, ctlPnt, p1]);
        const path = d3Path.path();
        path.moveTo(p0[0], p0[1]);
        path.quadraticCurveTo(ctlPnt[0], ctlPnt[1], p1[0], p1[1]);
        return path.toString();
      });
      return {
        paths,
        points,
      };
    }
    return {};
  }, [data, projection, curve]);

  useEffect(() => {
    if (ref.current && model.paths) {
      d3Selection
        .select(ref.current)
        .selectAll('path')
        .data(model.paths)
        .join('path')
        .attr('d', function (data) {
          return data;
        })
        .attr('fill', 'none')
        .attr('stroke', function () {
          return style?.color || '#000';
        })
        .attr('stroke-width', function () {
          return style?.width || 1;
        });
    }
  }, [model, style]);

  return (
    <>
      <g ref={ref} />
      {useAnimation && (
        <Motion
          {...model}
          duration={animationTime}
          style={animationStyle}
          mark={mark}
        />
      )}
    </>
  );
};

export default Lines;
