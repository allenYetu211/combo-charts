/*
 * @Author: liuyin
 * @Date: 2021-03-06 21:38:53
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-08 21:03:26
 * @Description: file content
 */
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import GeoContext from './context';
import * as d3Selection from 'd3-selection';
import * as d3Geo from 'd3-geo';

export interface AreaStyle {
  color?: string;
  borderColor?: string;
  borderWidth?: number;
}

interface AreaPropsType {
  data?: d3Geo.ExtendedFeatureCollection;
  style?: AreaStyle;
}

const Area: React.FC<AreaPropsType> = (props: AreaPropsType) => {
  const { data, style } = props;
  const { projection } = useContext(GeoContext);
  const ref = useRef<SVGGElement>(null);

  const redraw = useCallback(() => {
    if (ref.current && projection && data) {
      const bx = d3Selection.select(ref.current);
      bx.selectAll('path')
        .data(data.features)
        .join('path')
        .attr('d', d3Geo.geoPath(projection));
    }
  }, [data, projection]);

  const restyle = useCallback(() => {
    if (ref.current) {
      d3Selection
        .select(ref.current)
        .selectAll('path')
        .attr('fill', style.color)
        .attr('stroke', style.borderColor)
        .attr('stroke-width', style.borderWidth);
    }
  }, [style]);

  useEffect(() => {
    redraw();
    restyle();
  }, [redraw, restyle]);

  return <g ref={ref} />;
};

export default Area;
