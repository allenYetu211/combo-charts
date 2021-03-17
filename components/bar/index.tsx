/*
 * @Description: 柱状图
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-11 10:43:07
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-17 22:13:56
 */
import React, { useEffect, useRef } from 'react';
import * as d3Selection from 'd3-selection';
import applyCartesian, { InjectProps } from '../_utils/applyCartesian';

interface BarStyle {
  color?: string;
}

interface BarPropsType extends InjectProps {
  style?: BarStyle;
}

const Bar: React.FC<BarPropsType> = (props: BarPropsType) => {
  const { injectData } = props;
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      d3Selection
        .select(ref.current)
        .selectAll('rect')
        .data(injectData)
        .join('rect')
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y)
        .attr('height', (d) => d.height)
        .attr('width', (d) => d.width)
        .attr('fill', 'steelblue');
    }
  }, [injectData]);

  return <g ref={ref} />;
};

export default applyCartesian(Bar);
