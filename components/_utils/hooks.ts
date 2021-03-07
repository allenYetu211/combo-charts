/*
 * @Author: liuyin
 * @Date: 2021-03-07 10:58:14
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-07 16:31:25
 * @Description: file content
 */
import React, { useEffect } from 'react';
import * as d3Zoom from 'd3-zoom';
import * as d3Selection from 'd3-selection';

export function useZoom(
  ref: React.MutableRefObject<SVGSVGElement>,
  width: number,
  height: number,
  maxScale: number | undefined,
  zoomable: boolean | undefined
): void {
  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('viewBox', `0 0 ${width} ${height}`);
      if (zoomable) {
        const zoom = d3Zoom
          .zoom()
          .translateExtent([
            [0, 0],
            [width, height],
          ])
          .scaleExtent([1, maxScale || 3])
          .on('zoom', function () {
            const t = d3Zoom.zoomTransform(this);
            const w = width / t.k;
            const h = height / t.k;
            let x = t.x > 0 ? 0 : -t.x / t.k;
            x = t.x > -width * (t.k - 1) ? x : width - w;
            let y = t.y > 0 ? 0 : -t.y / t.k;
            y = t.y > -height * (t.k - 1) ? y : height - h;
            ref.current.setAttribute('viewBox', `${x} ${y} ${w} ${h}`);
          });
        d3Selection.select(ref.current).call(zoom);
      }
    }
  }, [width, height, ref, maxScale, zoomable]);
}
