import * as d3Selection from 'd3-selection';
import * as d3Ease from 'd3-ease';
import * as d3Interpolate from 'd3-interpolate';

export default function circleLoading(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selection: d3Selection.Selection<SVGCircleElement, any, SVGGElement, unknown>,
  time: number,
  size: number
): void {
  selection
    .transition()
    .duration(time)
    .ease(d3Ease.easeBackOut.overshoot(1.5))
    .attrTween('r', () => (t) => {
      const i = d3Interpolate.interpolate(0, size);
      return i(t).toString();
    });
}
