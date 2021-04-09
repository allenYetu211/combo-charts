import React, { useContext, useEffect, useMemo, useRef } from 'react';
import * as d3Selection from 'd3-selection';
import {
  CartesianContext,
  applyCartesian,
  InjectProps,
} from '../../container/cartesian';
import { BarDirection, BarStyle } from './types';
import { AnimationProps } from '../../animation/types';
import defaultAnimationProps from '../../animation';
import { rectLoading } from '../../animation/loading';
import { validNumber } from '../../utils/utils';

interface BarProps extends InjectProps, AnimationProps {
  style?: BarStyle;
}

const Bar: React.FC<BarProps> = (props: BarProps) => {
  const {
    injectData,
    style,
    animation = defaultAnimationProps.animation,
    animationTime = defaultAnimationProps.animationTime,
  } = props;
  const ref = useRef<SVGGElement>(null);
  const { xMode, yMode } = useContext(CartesianContext);
  const direction: BarDirection = useMemo<BarDirection>(() => {
    if (xMode === 'value' && yMode === 'category') {
      return 'horizontal';
    }
    return 'vertical';
  }, [xMode, yMode]);

  useEffect(() => {
    if (ref.current) {
      const finalData = injectData.map((v) => {
        const { x, y, width, height } = v;
        const w =
          style?.width === undefined || style.width > width
            ? width
            : style.width;
        if (direction === 'vertical') {
          return {
            x: x + (width - w) / 2,
            y,
            width: w,
            height,
          };
        }
        return {
          x,
          y: y + (height - w) / 2,
          width,
          height: w,
        };
      });
      const el = d3Selection
        .select(ref.current)
        .selectAll<SVGRectElement, unknown>('rect')
        .data(finalData)
        .join('rect')
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y)
        .attr('height', (d) => d.height)
        .attr('width', (d) => d.width)
        .attr('fill', () => style?.color || null);
      animation && rectLoading(el, validNumber(animationTime), direction);
    }
  }, [injectData, style, direction, animation, animationTime]);

  return <g ref={ref} />;
};

export default applyCartesian(Bar);
