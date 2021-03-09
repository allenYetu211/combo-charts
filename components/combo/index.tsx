/*
 * @Description: Combo
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-09 09:13:54
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-09 13:52:19
 */
import React, { useEffect, useRef, useState } from 'react';
import ComboContext from './context';
import { useZoom } from '../_utils/hooks';

interface ComboPropsType {
  width?: number | string;
  height?: number | string;
  zoomable?: boolean;
  maximumScale?: number;
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

  useZoom(ref, innerWidth, innerHeight, maximumScale, zoomable);

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
