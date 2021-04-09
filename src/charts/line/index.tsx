import React, { useContext, useEffect, useMemo, useRef } from 'react';
import * as d3Shape from 'd3-shape';
import * as d3Selection from 'd3-selection';
import {
  CartesianContext,
  applyCartesian,
  CoordinateBox,
  InjectProps,
} from '../../container/cartesian';
import { AnimationProps } from '../../animation/types';
import { pathLoading } from '../../animation/loading';
import { validNumber } from '../../utils/utils';
import defaultAnimationProps from '../../animation';

interface LineStyle {
  color?: string;
  width?: number;
}

interface LineProps extends InjectProps, AnimationProps {
  style?: LineStyle;
}

const Line: React.FC<LineProps> = (props: LineProps) => {
  const { injectData, style, ...rest } = props;
  const { animation, animationTime } = { ...defaultAnimationProps, ...rest };
  const ref = useRef<SVGGElement>(null);
  const { xMode, yMode } = useContext(CartesianContext);
  const line = useMemo(() => {
    if (xMode === 'value' && yMode === 'category') {
      return d3Shape
        .line<CoordinateBox>()
        .defined((d) => !!d)
        .x((d) => d.x + d.width / 2)
        .y((d) => d.y + d.height / 2);
    }
    return d3Shape
      .line<CoordinateBox>()
      .defined((d) => !!d)
      .x((d) => d.x + d.width / 2)
      .y((d) => d.y);
  }, [xMode, yMode]);

  useEffect(() => {
    if (ref.current) {
      const el = d3Selection
        .select(ref.current)
        .selectAll<SVGPathElement, unknown>('path')
        .data([injectData])
        .join('path')
        .attr('fill', 'none')
        .attr('stroke', () => style?.color || null)
        .attr('stroke-width', () => style?.width || null)
        .attr('d', line);
      animation && pathLoading(el, validNumber(animationTime));
    }
  }, [injectData, line, style, animation, animationTime]);

  return <g ref={ref} />;
};

export default applyCartesian(Line);
