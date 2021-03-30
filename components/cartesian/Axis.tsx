/*
 * @Description: axis
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-30 17:14:39
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-30 22:37:33
 */
import React, { useContext, useEffect, useRef } from 'react';
import CartesianContext from './context';
import { AxisMode, FullSpace } from './types';
import * as d3Selection from 'd3-selection';
import * as d3Axis from 'd3-axis';
import ComboContext from '../combo/context';

interface AxisPropsType {
  type: 'x' | 'y';
  padding: FullSpace;
  mode?: AxisMode;
}

const Axis: React.FC<AxisPropsType> = (props: AxisPropsType) => {
  const { type, mode, padding } = props;
  const ref = useRef<SVGGElement>(null);
  const { height } = useContext(ComboContext);
  const { setXMode, setYMode, projection } = useContext(CartesianContext);

  useEffect(() => {
    if (type === 'x' && setXMode) {
      setXMode(mode || 'category');
    } else if (type === 'y' && setYMode) {
      setYMode(mode || 'value');
    }
  }, [mode, setXMode, setYMode, type]);

  useEffect(() => {
    if (ref.current && projection && height) {
      const { x, y } = projection;
      const el = d3Selection.select(ref.current);
      if (x && type === 'x') {
        el.attr('transform', `translate(0, ${height - padding[2]})`).call(
          d3Axis.axisBottom(x)
        );
      }
      if (y && type === 'y') {
        el.attr('transform', `translate(${padding[3]}, 0)`).call(
          d3Axis.axisLeft(y)
        );
      }
    }
  }, [height, padding, projection, type]);

  return <g ref={ref} />;
};

export default Axis;
