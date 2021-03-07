/*
 * @Author: liuyin
 * @Date: 2021-03-04 22:01:20
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-07 16:30:44
 * @Description: file content
 */
import React, { useMemo, useRef } from 'react';
import * as d3Geo from 'd3-geo';
import GeoContext from './context';
import Area, { AreaStyle } from './Area';
import { useZoom } from '../_utils/hooks';

interface GeoPropsType {
  width?: number;
  height?: number;
  zoomable?: boolean;
  maximumScale?: number;
  geoJson?: d3Geo.ExtendedFeatureCollection;
  areaStyle?: AreaStyle;
  children: React.ReactNode;
}

const Geo: React.FC<GeoPropsType> = (props: GeoPropsType) => {
  const {
    children,
    width,
    height,
    geoJson,
    areaStyle,
    maximumScale,
    zoomable,
  } = props;
  const ref = useRef<SVGSVGElement>(null);
  const projection = useMemo(
    () =>
      d3Geo.geoMercator().fitExtent(
        [
          [0, 0],
          [width, height],
        ],
        geoJson
      ),
    [width, height, geoJson]
  );

  useZoom(ref, width, height, maximumScale, zoomable);

  return (
    <svg width={width} height={height} ref={ref}>
      <GeoContext.Provider value={{ width, height, projection }}>
        <Area geoJson={geoJson} style={areaStyle} />
        {children}
      </GeoContext.Provider>
    </svg>
  );
};

export default Geo;
