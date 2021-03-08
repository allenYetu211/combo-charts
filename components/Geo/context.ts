/*
 * @Author: liuyin
 * @Date: 2021-03-04 22:54:57
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-08 20:53:09
 * @Description: file content
 */
import React from 'react';
import * as d3Geo from 'd3-geo';

export interface GeoContextType {
  projection?: d3Geo.GeoProjection;
}

const GeoContext = React.createContext<GeoContextType>({});

export default GeoContext;
