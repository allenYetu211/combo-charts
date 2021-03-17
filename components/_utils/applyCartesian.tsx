/*
 * @Author: liuyin
 * @Date: 2021-03-17 18:42:10
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-17 23:07:39
 * @Description: file content
 */
import React, { useContext, useEffect, useState } from 'react';
import CartesianContext from '../cartesian/context';
import { CartesianChildrenProps, Coordinate } from './types';
import * as d3Axis from 'd3-axis';
import { AxisMode } from '../cartesian/types';

export interface CoordinateBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type InjectProps = {
  injectData: CoordinateBox[];
};

function projectResult(
  type: 'x' | 'y',
  mode: AxisMode,
  data: number,
  index: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  projection: d3Axis.AxisScale<any>
): Coordinate {
  switch (mode) {
    case 'value': {
      const dom = projection.domain()[0];
      let xy = dom !== undefined ? projection(dom) || 0 : 0;
      let wh = projection(data) || 0;
      if (type === 'y') {
        xy = projection(data) || 0;
        wh = projection(dom) || 0;
      }
      const arg0 = Math.max(xy, 0);
      const arg1 = Math.max(wh - arg0, 0);
      return [arg0, arg1];
    }
    default: {
      const dom = projection.domain()[index];
      const arg0 = Math.max(
        dom ? projection(projection.domain()[index]) || 0 : 0,
        0
      );
      const arg1 = Math.max(
        projection.bandwidth ? projection.bandwidth() : 0,
        0
      );
      return [arg0, arg1];
    }
  }
}

const applyCartesian = <P extends CartesianChildrenProps>(
  Component: React.ComponentType<P & InjectProps>
): React.ComponentType<P> => {
  const ApplyComponent: React.FC<P> = (props: P) => {
    const { data } = props;
    const { projection, updateProjection, xMode, yMode } = useContext(
      CartesianContext
    );
    const [inject, setInject] = useState<CoordinateBox[]>([]);

    useEffect(() => {
      if (data && projection) {
        const { x, y } = projection;
        let minValue: Coordinate = [Infinity, Infinity];
        let maxValue: Coordinate = [-Infinity, -Infinity];
        const res: CoordinateBox[] = data.map(
          (v: number | Coordinate, i: number) => {
            let tmp: Coordinate = [0, 0];
            if (Array.isArray(v)) {
              // Coordinate
              tmp = v;
              minValue = [
                Math.min(v[0], minValue[0]),
                Math.min(v[1], minValue[1]),
              ];
              maxValue = [
                Math.max(v[0], maxValue[0]),
                Math.max(v[1], maxValue[1]),
              ];
            } else {
              // number
              tmp = xMode === 'value' ? [v, i] : [i, v];
              minValue = [
                Math.min(tmp[0], minValue[0]),
                Math.min(tmp[1], minValue[1]),
              ];
              maxValue = [
                Math.max(tmp[0], maxValue[0]),
                Math.max(tmp[1], maxValue[1]),
              ];
            }
            if (!x || !y) {
              // 映射规则不存在
              return {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
              };
            }
            const [retX, retWidth] = projectResult('x', xMode, tmp[0], i, x);
            const [retY, retHeight] = projectResult('y', yMode, tmp[1], i, y);
            return {
              x: retX,
              y: retY,
              width: retWidth,
              height: retHeight,
            };
          }
        );
        if (!x) {
          updateProjection('x', minValue[0], maxValue[0]);
          return;
        }
        if (!y) {
          updateProjection('y', minValue[1], maxValue[1]);
          return;
        }
        setInject(res);
      }
    }, [data, projection, updateProjection, xMode, yMode]);

    return <Component injectData={inject} {...props} />;
  };
  return ApplyComponent;
};

export default applyCartesian;
