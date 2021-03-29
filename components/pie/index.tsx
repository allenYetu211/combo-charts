/*
 * @Description: pie component
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-29 15:13:21
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-29 16:54:23
 */
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { validNumber } from '../_utils/utils';
import { PieData } from './types';
import * as d3Shape from 'd3-shape';
import * as d3Selection from 'd3-selection';
import PolarContext from '../polar/context';
import ComboContext from '../combo/context';

interface PiePropsType {
  data?: PieData[];
  innerRadius?: number | string;
  outerRadius?: number | string;
}

const Pie: React.FC<PiePropsType> = (props: PiePropsType) => {
  const { data, innerRadius, outerRadius } = props;
  const ref = useRef<SVGGElement>(null);
  const { projection } = useContext(PolarContext);
  const { width, height } = useContext(ComboContext);
  const radius = useMemo<[number, number]>(
    () => [validNumber(innerRadius), validNumber(outerRadius)],
    [innerRadius, outerRadius]
  );
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
      const arcs = projection(data.map((v) => v.value));
      d3Selection
        .select(ref.current)
        .selectAll('path')
        .data(arcs)
        .join('path')
        .attr('d', arc)
        .attr('fill', function (_, i) {
          return data[i]?.style?.color || null;
        });
    }
  }, [data, projection, arc]);

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
