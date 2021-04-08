import * as d3Selection from 'd3-selection';
import * as d3Ease from 'd3-ease';
import { BarDirection } from '../charts/bar/types';

export function progressPath(
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

export function progressBar(
  selection: d3Selection.Selection<
    SVGRectElement,
    { x: number; y: number; width: number; height: number },
    SVGGElement,
    unknown
  >,
  time: number,
  direction: BarDirection
): void {
  if (!selection.node()) {
    return;
  }
  let attr = 'height';
  let axis = 'y';
  if (direction === 'horizontal') {
    attr = 'width';
    axis = 'x';
  }
  selection
    .attr(axis, (d: Record<string, number>) => (d[axis] || 0) + (d[attr] || 0))
    .attr(attr, 0)
    .transition()
    .duration(time)
    .ease(d3Ease.easeBackOut.overshoot(1.5))
    .attr(axis, (d: Record<string, number>) => d[axis] || 0)
    .attr(attr, (d: Record<string, number>) => d[attr] || 0);
}
