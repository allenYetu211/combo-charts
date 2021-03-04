/*
 * @Author: liuyin
 * @Date: 2021-03-04 22:54:57
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-04 23:18:06
 * @Description: file content
 */
import React from 'react';
import * as d3Geo from 'd3-geo';

export interface GeoContextType {
  width: number;
  height: number;
  projection?: d3Geo.GeoProjection;
}

const GeoContext = React.createContext<GeoContextType>({
  width: 0,
  height: 0,
});

export default GeoContext;
