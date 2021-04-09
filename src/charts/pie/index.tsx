import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { validNumber } from '../../utils/utils';
import * as d3Shape from 'd3-shape';
import * as d3Selection from 'd3-selection';
import { PolarContext } from '../../container/polar';
import { PieStyle } from './types';
import { AnimationProps } from '../../animation/types';
import defaultAnimationProps from '../../animation';
import { pieLoading } from '../../animation/loading/chart';

interface PieProps extends AnimationProps {
  data?: number[];
  innerRadius?: number | string;
  outerRadius?: number | string;
  style: PieStyle;
}

const Pie: React.FC<PieProps> = (props: PieProps) => {
  const { data, innerRadius, outerRadius, style, ...rest } = props;
  const { animation, animationTime } = { ...defaultAnimationProps, ...rest };
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
      const el = d3Selection
        .select(ref.current)
        .selectAll<SVGPathElement, unknown>('path')
        .data(arcs)
        .join('path')
        .attr('d', arc)
        .attr('fill', function (_, i) {
          const l = style?.colors?.length || 0;
          const idx = i >= l ? i % l : i;
          return style?.colors?.[idx] || null;
        });
      animation && pieLoading(el, validNumber(animationTime), arc);
    }
  }, [data, projection, arc, style, animation, animationTime]);

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
