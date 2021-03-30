/*
 * @Description: Combo
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-09 09:13:54
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-30 22:28:32
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ComboContext from './context';
import * as d3Zoom from 'd3-zoom';
import * as d3Selection from 'd3-selection';
import { useFunctionState } from '../_utils/hooks/useFunctionState';
import { ZoomFunction } from './types';
import { validNumber } from '../_utils/utils';

interface ComboPropsType {
  width?: number | string;
  height?: number | string;
  zoomable?: boolean;
  maximumScale?: number | string;
  children: React.ReactNode;
}

const Combo: React.FC<ComboPropsType> = (props: ComboPropsType) => {
  const { children, width, height, maximumScale = 3, zoomable = false } = props;
  const ref = useRef<SVGSVGElement>(null);
  const [innerWidth, setInnerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);
  const [zoomFn, setZoomFn] = useFunctionState<ZoomFunction | undefined>();
  const maxScale = useMemo(() => validNumber(maximumScale), [maximumScale]);

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
    if (zoomable) {
      const zoom = d3Zoom
        .zoom<SVGSVGElement, unknown>()
        .translateExtent([
          [0, 0],
          [innerWidth, innerHeight],
        ])
        .scaleExtent([1, maxScale])
        .on('zoom', function (this, event) {
          if (this) {
            const t = event.transform;
            const w = innerWidth / t.k;
            const h = innerHeight / t.k;
            let x = t.x > 0 ? 0 : -t.x / t.k;
            x = t.x > -innerWidth * (t.k - 1) ? x : innerWidth - w;
            let y = t.y > 0 ? 0 : -t.y / t.k;
            y = t.y > -innerHeight * (t.k - 1) ? y : innerHeight - h;
            this.setAttribute('viewBox', `${x} ${y} ${w} ${h}`);
          }
        });
      setZoomFn(zoom);
    }
  }, [innerHeight, innerWidth, maxScale, setZoomFn, zoomable]);

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('viewBox', `0 0 ${innerWidth} ${innerHeight}`);
      if (zoomFn) {
        d3Selection.select(ref.current).call(zoomFn);
      }
    }
  }, [innerHeight, innerWidth, zoomFn]);

  return (
    <svg width={innerWidth} height={innerHeight} ref={ref}>
      <ComboContext.Provider
        value={{
          width: innerWidth,
          height: innerHeight,
          maximumScale: maxScale,
          setZoomFunction: setZoomFn,
        }}
      >
        {children}
      </ComboContext.Provider>
    </svg>
  );
};

export default Combo;
