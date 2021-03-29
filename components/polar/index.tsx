/*
 * @Description: polar
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-29 14:53:10
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-29 15:12:31
 */
import React, { useMemo, useRef } from 'react';
import PolarContext from './context';
import * as d3Shape from 'd3-shape';
import { PolarProjectionType } from './types';

interface PolarPropsType {
  /**
   * padding angle: [0, 2 * Math.PI]
   */
  padAngle?: number;
  children?: React.ReactNode;
}

const Polar: React.FC<PolarPropsType> = (props: PolarPropsType) => {
  const { padAngle, children } = props;
  const ref = useRef<SVGGElement>(null);
  const validPadAngle = useMemo(() => {
    if (padAngle && padAngle > 0 && padAngle < 2 * Math.PI) {
      return padAngle;
    }
    return 0;
  }, [padAngle]);
  const projection = useMemo<PolarProjectionType>(() => {
    return d3Shape.pie().padAngle(validPadAngle);
  }, [validPadAngle]);

  return (
    <>
      <g ref={ref} />
      <PolarContext.Provider value={{ projection }}>
        {children}
      </PolarContext.Provider>
    </>
  );
};

export default Polar;
