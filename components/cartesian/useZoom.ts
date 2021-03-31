/*
 * @Description: zoom function
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-31 08:59:49
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-31 17:07:46
 */
import * as d3Zoom from 'd3-zoom';
import * as d3Selection from 'd3-selection';
import * as d3Array from 'd3-array';
import { useEffect, useRef } from 'react';

export type ZoomCallback = (
  previous: d3Zoom.ZoomTransform,
  current: d3Zoom.ZoomTransform,
  scale: number,
  point: [number, number]
) => void;

export const useZoom = (function () {
  let z = d3Zoom.zoomIdentity;
  return function (
    cb: ZoomCallback,
    width: number,
    height: number,
    node: SVGSVGElement | null
  ) {
    const ref = useRef<ZoomCallback | undefined>(undefined);

    useEffect(() => {
      ref.current = cb;
    }, [cb]);

    useEffect(() => {
      if (!width || !height || !node) {
        return;
      }
      const zoom = d3Zoom
        .zoom<SVGSVGElement, unknown>()
        .on('zoom', function (e: d3Zoom.D3ZoomEvent<SVGSVGElement, unknown>) {
          const t = e.transform;
          const k = t.k / z.k;
          const point = center(e, this, width, height);
          ref.current && ref.current(z, t, k, point);
          z = t;
        });
      d3Selection.select(node).call(zoom);
    }, [height, node, width]);
  };
})();

function center(
  event: d3Zoom.D3ZoomEvent<SVGSVGElement, unknown>,
  target: Element,
  width: number,
  height: number
): [number, number] {
  let x = width / 2;
  let y = height / 2;
  if (event.sourceEvent) {
    const p = d3Selection.pointers(event, target);
    x = d3Array.mean(p, (d) => d[0]) ?? x;
    y = d3Array.mean(p, (d) => d[1]) ?? y;
  }
  return [x, y];
}
