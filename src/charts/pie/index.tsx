/*
 * @Description: pie component
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-29 15:13:21
 * @LastEditors: liuyin
 * @LastEditTime: 2021-04-01 14:19:53
 */
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { validNumber } from '../../utils/utils';
import * as d3Shape from 'd3-shape';
import * as d3Selection from 'd3-selection';
import { PolarContext } from '../../container/polar';
import { PieStyle } from './types';

interface PieProps {
  data?: number[];
  innerRadius?: number | string;
  outerRadius?: number | string;
  style: PieStyle;
}

const Pie: React.FC<PieProps> = (props: PieProps) => {
  const { data, innerRadius, outerRadius, style } = props;
  const ref = useRef<SVGGElement>(null);
  const { projection, width, height } = useContext(PolarContext);
  const radius = useMemo<[number, number]>(() => {
    const res: [number, number] = [
      validNumber(innerRadius),
      validNumber(outerRadius) || 1,
    ];
    const minRadius = Math.min(width || 0, height || 0) / 2;
    if (res[0] < 0) {
      res[0] = 0;
    } else if (res[0] > 1) {
      res[0] = 1;
    }
    if (res[1] < 0) {
      res[1] = 0;
    } else if (res[1] > 1) {
      res[1] = 1;
    }
    return [res[0] * minRadius, res[1] * minRadius];
  }, [innerRadius, outerRadius, width, height]);
  const arc = useMemo(
    () =>
      d3Shape
        .arc<d3Shape.PieArcDatum<number | { valueOf(): number }>>()
        .innerRadius(radius[0])
        .outerRadius(radius[1]),
    [radius]
  );

  useEffect(() => {
    if (ref.current && data && projection) {
      const arcs = projection(data);
      d3Selection
        .select(ref.current)
        .selectAll('path')
        .data(arcs)
        .join('path')
        .attr('d', arc)
        .attr('fill', function (_, i) {
          const l = style?.colors?.length || 0;
          const idx = i >= l ? i % l : i;
          return style?.colors?.[idx] || null;
        });
    }
  }, [data, projection, arc, style]);

  useEffect(() => {
    if (ref.current && width && height) {
      d3Selection
        .select(ref.current)
        .attr('transform', `translate(${[width / 2, height / 2].join(' ')})`);
    }
  }, [width, height]);

  return <g ref={ref} />;
};

export default Pie;
