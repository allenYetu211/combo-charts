/*
 * @Description: 柱状图
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-11 10:43:07
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-15 17:33:52
 */
import React, { useContext, useEffect, useRef } from 'react';
import * as d3Selection from 'd3-selection';
import CartesianContext from '../cartesian/context';
import { BarDataType, RectBox } from './types';
import { validData } from './utils';
import { max, min } from 'd3-array';

interface BarPropsType {
  data?: BarDataType;
}

const Bar: React.FC<BarPropsType> = (props: BarPropsType) => {
  const { data } = props;
  const ref = useRef<SVGGElement>(null);
  const {
    projection,
    setXProjection,
    setYProjection,
    xMode,
    yMode,
  } = useContext(CartesianContext);

  useEffect(() => {
    if (ref.current && data && projection) {
      validData(data);
      const { x, y } = projection;
      if (!x) {
        const xMin = min(data);
        const xMax = max(data);
        if (xMax !== undefined && xMin !== undefined) {
          setXProjection(xMin, xMax);
        }
        return;
      }
      if (!y) {
        const yMin = min(data);
        const yMax = max(data);
        if (yMin !== undefined && yMax !== undefined) {
          setYProjection(yMin, yMax);
        }
        return;
      }
      const rects: RectBox[] = data.map((d: number, i: number) => {
        const res: RectBox = {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
        };
        switch (xMode) {
          case 'category': {
            const fnx = x['category'];
            const it = fnx && fnx.domain()[i];
            const xt = fnx && it ? fnx(it) : 0;
            res.x = xt || 0;
            res.width = fnx ? fnx.bandwidth() : 0;
            break;
          }
          default: {
            const fnx = x['value'];
            const min = fnx ? fnx.domain()[0] : 0;
            res.x = fnx ? fnx(min || 0) : 0;
            res.width = fnx ? fnx(d) - res.x : 0;
          }
        }
        switch (yMode) {
          case 'category': {
            const fny = y['category'];
            const it = fny && fny.domain()[i];
            const yt = fny && it ? fny(it) : 0;
            res.y = yt || 0;
            res.height = fny ? fny.bandwidth() : 0;
            break;
          }
          default: {
            const fny = y['value'];
            const min = fny ? fny.domain()[0] : 0;
            res.y = fny ? fny(d) : 0;
            res.height = fny ? fny(min || 0) - fny(d) : 0;
          }
        }
        return res;
      });

      d3Selection
        .select(ref.current)
        .selectAll('rect')
        .data(rects)
        .join('rect')
        .attr('x', (d) => d.x)
        .attr('y', (d) => d.y)
        .attr('height', (d) => d.height)
        .attr('width', (d) => d.width)
        .attr('fill', 'steelblue');
    }
  }, [data, projection, setXProjection, setYProjection, xMode, yMode]);

  return <g ref={ref} />;
};

export default Bar;
