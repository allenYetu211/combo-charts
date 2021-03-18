/*
 * @Description: 柱状图
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-11 10:43:07
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-18 22:38:22
 */
import React, { useContext, useEffect, useRef } from 'react';
import * as d3Selection from 'd3-selection';
import applyCartesian, { InjectProps } from '../_utils/applyCartesian';
import CartesianContext from '../cartesian/context';

interface BarStyle {
  color?: string;
  width?: number;
}

interface BarPropsType extends InjectProps {
  style?: BarStyle;
}

const Bar: React.FC<BarPropsType> = (props: BarPropsType) => {
  const { injectData, style } = props;
  const ref = useRef<SVGGElement>(null);
  const { xMode, yMode } = useContext(CartesianContext);

  useEffect(() => {
    if (ref.current) {
      const finalData = injectData.map((v) => {
        const { x, y, width, height } = v;
        const w =
          style?.width === undefined || style.width > width
            ? width
            : style.width;
        if (xMode === 'category' && yMode === 'value') {
          return {
            x: x + (width - w) / 2,
            y,
            width: w,
            height,
          };
        } else if (xMode === 'value' && yMode === 'category') {
          return {
            x,
            y: y + (height - w) / 2,
            width,
            height: w,
          };
        }
        return v;
      });
      d3Selection
        .select(ref.current)
        .selectAll('rect')
        .data(finalData)
        .join('rect')
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y)
        .attr('height', (d) => d.height)
        .attr('width', (d) => d.width)
        .attr('fill', () => style?.color || null);
    }
  }, [injectData, style, xMode, yMode]);

  return <g ref={ref} />;
};

Bar.defaultProps = {
  style: {
    width: 26,
    color: 'steelblue',
  },
};

export default applyCartesian(Bar);
