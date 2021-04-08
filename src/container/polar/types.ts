import * as d3Shape from 'd3-shape';

export type PolarProjectionType = d3Shape.Pie<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  | number
  | {
      valueOf(): number;
    }
>;
