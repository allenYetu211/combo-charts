import * as d3Selection from 'd3-selection';
import * as d3Interpolate from 'd3-interpolate';
import * as d3Shape from 'd3-shape';

export default function pieLoading(
  selection: d3Selection.Selection<
    SVGPathElement,
    d3Shape.PieArcDatum<
      | number
      | {
          valueOf(): number;
        }
    >,
    SVGGElement,
    unknown
  >,
  time: number,
  arcFn: d3Shape.Arc<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    d3Shape.PieArcDatum<
      | number
      | {
          valueOf(): number;
        }
    >
  >
): void {
  if (!selection.node()) {
    return;
  }
  selection
    .transition()
    .duration(time)
    .tween('data', (d) => {
      const i = d3Interpolate.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return (t) => {
        const temp = i(t);
        d.startAngle = temp.startAngle;
        d.endAngle = temp.endAngle;
        return d;
      };
    })
    .attrTween('d', (d) => () => arcFn(d) || '');
}
