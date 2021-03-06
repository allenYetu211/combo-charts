/*
 * @Author: liuyin
 * @Date: 2021-03-04 22:01:20
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-06 22:37:26
 * @Description: file content
 */
import React, { useMemo } from 'react';
import * as d3Geo from 'd3-geo';
import GeoContext from './context';
import Area, { AreaStyle } from './Area';

interface GeoPropsType {
  width?: number;
  height?: number;
  geoJson?: d3Geo.ExtendedFeatureCollection;
  areaStyle?: AreaStyle;
  children: React.ReactNode;
}

const Geo: React.FC<GeoPropsType> = (props: GeoPropsType) => {
  const { children, width, height, geoJson, areaStyle } = props;
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
  return (
    <svg width={width} height={height}>
      <GeoContext.Provider value={{ width, height, projection }}>
        <Area geoJson={geoJson} style={areaStyle} />
        {children}
      </GeoContext.Provider>
    </svg>
  );
};

export default Geo;
