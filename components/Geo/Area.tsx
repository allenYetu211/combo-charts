/*
 * @Author: liuyin
 * @Date: 2021-03-06 21:38:53
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-08 17:41:28
 * @Description: file content
 */
import React, { useContext, useEffect, useRef, useState } from 'react';
import GeoContext from './context';
import * as d3Selection from 'd3-selection';
import * as d3Geo from 'd3-geo';
import { useRefresh } from '../_utils/hooks';

export interface AreaStyle {
  color?: string;
  borderColor?: string;
  borderWidth?: number;
}

interface AreaPropsType {
  geoJson?: d3Geo.ExtendedFeatureCollection;
  style?: AreaStyle;
}

const Area: React.FC<AreaPropsType> = (props: AreaPropsType) => {
  const { geoJson, style } = props;
  const { width, height, projection } = useContext(GeoContext);
  const ref = useRef<SVGGElement>(null);

  useRefresh(
    () => {
      if (ref.current && projection && geoJson) {
        const bx = d3Selection.select(ref.current);
        bx.selectAll('path')
          .data(geoJson.features)
          .join('path')
          .attr('d', d3Geo.geoPath(projection));
      }
    },
    [width, height, projection, geoJson],
    () => {
      if (ref.current) {
        d3Selection
          .select(ref.current)
          .selectAll('path')
          .attr('fill', style.color)
          .attr('stroke', style.borderColor)
          .attr('stroke-width', style.borderWidth);
      }
    },
    [style]
  );

  return <g ref={ref} />;
};

export default Area;
