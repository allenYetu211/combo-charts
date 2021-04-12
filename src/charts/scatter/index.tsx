import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { Coordinate } from '../../types';
import * as d3Selection from 'd3-selection';
import { GeoContext } from '../../container/geo';
import { AnimationProps } from '../../animation/types';
import { circleLoading } from '../../animation/loading';
import { validNumber } from '../../utils/utils';
import defaultAnimationProps from '../../animation';

export interface ScatterStyle {
  color?: string;
  borderColor?: string;
  borderWidth?: number;
}

interface ScatterProps extends AnimationProps {
  data?: Coordinate[];
  radius?: number | string;
  style?: ScatterStyle;
}

const Scatter: React.FC<ScatterProps> = (props: ScatterProps) => {
  const { data, style, radius, ...rest } = props;
  const { animation, animationTime } = { ...defaultAnimationProps, ...rest };
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
      const el = d3Selection
        .select(ref.current)
        .selectAll<SVGCircleElement, unknown>('circle')
        .data(res)
        .join('circle')
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
        .attr('r', validNumber(radius));
      animation &&
        circleLoading(el, validNumber(animationTime), validNumber(radius));
    }
  }, [data, projection, radius, animationTime, animation]);

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
