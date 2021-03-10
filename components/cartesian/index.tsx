/*
 * @Description:
 * @version:
 * @Author: liuyin
 * @Date: 2021-03-10 09:14:18
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-10 15:57:35
 */
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import ComboContext from '../combo/context';
import CartesianContext, { CartesianProjection } from './context';
import { getAxisProjection, validPadding } from './utils';
import * as d3Selection from 'd3-selection';
import * as d3Axis from 'd3-axis';
import { Axis, CartesianStyle } from './interface';

interface CartesianPropsType {
  xAxis: Axis;
  yAxis: Axis;
  style?: CartesianStyle;
  children?: React.ReactNode;
}

const Cartesian: React.FC<CartesianPropsType> = (props: CartesianPropsType) => {
  const { children, xAxis, yAxis, style } = props;
  const context = useContext(ComboContext);
  const ref = useRef<SVGGElement>(null);
  const projection = useMemo<CartesianProjection>(() => {
    let xProjection;
    let yProjection;
    const padding = validPadding(style);
    if (xAxis.mode !== 'value' && xAxis.mode !== 'enum') {
      throw new Error('the mode of xAxis must be "value" or "enum"');
    }
    if (yAxis.mode !== 'value' && yAxis.mode !== 'enum') {
      throw new Error('the mode of yAxis must be "value" or "enum"');
    }
    switch (xAxis.mode) {
      case 'value':
        xProjection = getAxisProjection(xAxis.mode, xAxis.min, xAxis.max, [
          padding[3],
          context.width - padding[1],
        ]);
        break;
      default:
        xProjection = getAxisProjection(xAxis.mode, xAxis.domain, [
          padding[3],
          context.width - padding[1],
        ]);
        break;
    }
    switch (yAxis.mode) {
      case 'value':
        yProjection = getAxisProjection(yAxis.mode, yAxis.min, yAxis.max, [
          context.height - padding[2],
          padding[0],
        ]);
        break;
      default:
        yProjection = getAxisProjection(yAxis.mode, yAxis.domain, [
          context.height - padding[2],
          padding[0],
        ]);
    }
    return {
      x: xProjection,
      y: yProjection,
    };
  }, [context, xAxis, yAxis, style]);

  useEffect(() => {
    if (ref.current) {
      const axis = d3Selection.select(ref.current);
      const padding = validPadding(style);
      axis
        .selectChildren('g')
        .data(['xAxis', 'yAxis'])
        .join('g')
        .attr('class', function (data) {
          return data;
        });
      axis
        .select('g.xAxis')
        .attr('transform', `translate(0, ${context.height - padding[2]})`)
        .call(d3Axis.axisBottom<d3Axis.AxisDomain>(projection.x));
      axis
        .select('g.yAxis')
        .attr('transform', `translate(${padding[3]}, 0)`)
        .call(d3Axis.axisLeft<d3Axis.AxisDomain>(projection.y));
    }
  }, [projection, context, style]);

  return (
    <>
      <g ref={ref} />
      <CartesianContext.Provider value={{ projection }}>
        {children}
      </CartesianContext.Provider>
    </>
  );
};

export default Cartesian;
