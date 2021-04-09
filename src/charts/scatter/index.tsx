import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { Coordinate } from '../../types';
import * as d3Selection from 'd3-selection';
import { GeoContext } from '../../container/geo';

export interface ScatterStyle {
  color?: string;
  borderColor?: string;
  borderWidth?: number;
}

interface ScatterProps {
  data?: Coordinate[];
  size?: number | string;
  style?: ScatterStyle;
}

const Scatter: React.FC<ScatterProps> = (props: ScatterProps) => {
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
