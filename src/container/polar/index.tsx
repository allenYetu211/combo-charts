import React, { useMemo, useRef } from 'react';
import PolarContext from './context';
import * as d3Shape from 'd3-shape';
import { PolarProjectionType } from './types';
import useBox, { BoxProps } from '../../utils/hooks/useBox';

interface PolarProps extends BoxProps {
  /**
   * padding angle: [0, 2 * Math.PI]
   */
  padAngle?: number;
  children?: React.ReactNode;
}

const Polar: React.FC<PolarProps> = (props: PolarProps) => {
  const { padAngle, children, width, height } = props;
  const ref = useRef<SVGGElement>(null);
  const { innerHeight, innerWidth, ref: svgRef } = useBox(width, height);
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
      <PolarContext.Provider
        value={{ projection, width: innerWidth, height: innerHeight }}
      >
        {children}
      </PolarContext.Provider>
    </svg>
  );
};

export default Polar;

export { PolarContext };
