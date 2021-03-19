/*
 * @Description: 折线图
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-19 13:25:06
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-19 15:00:29
 */
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import applyCartesian, {
  CoordinateBox,
  InjectProps,
} from '../_utils/applyCartesian';
import * as d3Shape from 'd3-shape';
import * as d3Selection from 'd3-selection';
import CartesianContext from '../cartesian/context';

interface LineStyle {
  color?: string;
  width?: number;
}

interface LinePropsType extends InjectProps {
  style?: LineStyle;
}

const Line: React.FC<LinePropsType> = (props: LinePropsType) => {
  const { injectData, style } = props;
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
      d3Selection
        .select(ref.current)
        .selectAll('path')
        .data([injectData])
        .join('path')
        .attr('fill', 'none')
        .attr('stroke', () => style?.color || null)
        .attr('stroke-width', () => style?.width || null)
        .attr('d', line);
    }
  }, [injectData, line, style]);

  return <g ref={ref} />;
};

Line.defaultProps = {
  style: {
    width: 1,
    color: 'steelblue',
  },
};

export default applyCartesian(Line);
