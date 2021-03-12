/*
 * @Description: Combo
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-09 09:13:54
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-12 15:41:03
 */
import React, { useEffect, useRef, useState } from 'react';
import ComboContext from './context';
import * as d3Zoom from 'd3-zoom';
import * as d3Selection from 'd3-selection';

interface ComboPropsType {
  width?: number | string;
  height?: number | string;
  zoomable?: boolean;
  maximumScale?: number | string;
  children: React.ReactNode;
}

const Combo: React.FC<ComboPropsType> = (props: ComboPropsType) => {
  const { children, width, height, maximumScale, zoomable } = props;
  const ref = useRef<SVGSVGElement>(null);
  const [innerWidth, setInnerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const parentElement = ref.current.parentElement;
      const { clientWidth, clientHeight } = parentElement || {
        clientWidth: 0,
        clientHeight: 0,
      };
      if (width !== undefined) {
        setInnerWidth(Number(width));
      } else {
        setInnerWidth(clientWidth);
      }
      if (height !== undefined) {
        setInnerHeight(Number(height));
      } else {
        setInnerHeight(clientHeight);
      }
    }
  }, [width, height]);

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('viewBox', `0 0 ${innerWidth} ${innerHeight}`);
      if (zoomable) {
        const zoom = d3Zoom
          .zoom<SVGSVGElement, unknown>()
          .translateExtent([
            [0, 0],
            [innerWidth, innerHeight],
          ])
          .scaleExtent([1, maximumScale ? Number(maximumScale) : 1])
          .on('zoom', function () {
            if (ref.current) {
              const t = d3Zoom.zoomTransform(this);
              const w = innerWidth / t.k;
              const h = innerHeight / t.k;
              let x = t.x > 0 ? 0 : -t.x / t.k;
              x = t.x > -innerWidth * (t.k - 1) ? x : innerWidth - w;
              let y = t.y > 0 ? 0 : -t.y / t.k;
              y = t.y > -innerHeight * (t.k - 1) ? y : innerHeight - h;
              ref.current.setAttribute('viewBox', `${x} ${y} ${w} ${h}`);
            }
          });
        d3Selection.select(ref.current).call(zoom);
      }
    }
  }, [ref, zoomable, maximumScale, innerWidth, innerHeight]);

  return (
    <svg width={innerWidth} height={innerHeight} ref={ref}>
      <ComboContext.Provider value={{ width: innerWidth, height: innerHeight }}>
        {children}
      </ComboContext.Provider>
    </svg>
  );
};

Combo.defaultProps = {
  maximumScale: 3,
};

export default Combo;
