/*
 * @Description: polar
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-29 14:53:10
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-31 17:31:25
 */
import React, { useMemo, useRef } from 'react';
import PolarContext from './context';
import * as d3Shape from 'd3-shape';
import { PolarProjectionType } from './types';
import useBox from '../_utils/hooks/useBox';
import { BoxProps } from '../_utils/types';

interface PolarPropsType extends BoxProps {
  /**
   * padding angle: [0, 2 * Math.PI]
   */
  padAngle?: number;
  children?: React.ReactNode;
}

const Polar: React.FC<PolarPropsType> = (props: PolarPropsType) => {
  const { padAngle, children, width, height } = props;
  const ref = useRef<SVGGElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { innerHeight, innerWidth } = useBox(width, height, svgRef.current);
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
    <svg ref={svgRef} width={innerWidth} height={innerHeight}>
      <g ref={ref} />
      <PolarContext.Provider value={{ projection }}>
        {children}
      </PolarContext.Provider>
    </svg>
  );
};

export default Polar;
