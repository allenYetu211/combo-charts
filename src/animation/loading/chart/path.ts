import * as d3Selection from 'd3-selection';
import * as d3Ease from 'd3-ease';

export default function pathLoading(
  selection: d3Selection.Selection<
    SVGPathElement,
    string,
    SVGGElement,
    unknown
  >,
  time: number
): void {
  const node = selection.node();
  if (node) {
    const total = node.getTotalLength();
    selection
      .attr('stroke-dasharray', total + ' ' + total)
      .attr('stroke-dashoffset', total)
      .transition()
      .duration(time)
      .ease(d3Ease.easeLinear)
      .attr('stroke-dashoffset', 0);
  }
}
