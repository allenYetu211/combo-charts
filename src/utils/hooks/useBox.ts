import { useEffect, useRef, useState } from 'react';
import { validNumber } from '../utils';

export interface BoxProps {
  width?: number | string;
  height?: number | string;
}

export interface BoxType {
  innerWidth: number;
  innerHeight: number;
  ref: React.RefObject<SVGSVGElement>;
}

export default function useBox(
  width: number | string | undefined,
  height: number | string | undefined
): BoxType {
  const ref = useRef<SVGSVGElement>(null);
  const [innerWidth, setInnerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);

  useEffect(() => {
    let w = validNumber(width);
    let h = validNumber(height);
    if (ref.current) {
      const { parentElement } = ref.current;
      if (!parentElement) {
        setInnerHeight(h);
        setInnerWidth(w);
        return;
      }
      const { clientWidth, clientHeight } = parentElement;
      // width
      if (width === undefined) {
        w = clientWidth;
      }
      // height
      if (height === undefined) {
        h = clientHeight;
      }
      setInnerHeight(h);
      setInnerWidth(w);
      ref.current.setAttribute('viewBox', `0 0 ${w} ${h}`);
    }
  }, [width, height]);

  return {
    innerHeight,
    innerWidth,
    ref,
  };
}
