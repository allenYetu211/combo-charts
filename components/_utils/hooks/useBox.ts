/*
 * @Description: box
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-31 11:18:12
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-31 13:07:19
 */

import { useEffect, useState } from 'react';
import { validNumber } from '../utils';

export interface BoxType {
  innerWidth: number;
  innerHeight: number;
}

export default function useBox(
  width: number | string | undefined,
  height: number | string | undefined,
  node: SVGSVGElement | null
): BoxType {
  const [innerWidth, setInnerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);

  useEffect(() => {
    if (node) {
      const { parentElement } = node;
      if (!parentElement) {
        return;
      }
      const { clientWidth, clientHeight } = parentElement;
      let w = validNumber(width);
      let h = validNumber(height);
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
      node.setAttribute('viewBox', `0 0 ${w} ${h}`);
    }
  }, [width, height, node]);

  return {
    innerHeight,
    innerWidth,
  };
}
