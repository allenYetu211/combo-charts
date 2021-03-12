/*
 * @Author: liuyin
 * @Date: 2021-03-04 22:54:57
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-10 16:19:31
 * @Description: file content
 */
import React from 'react';
import * as d3Geo from 'd3-geo';
import { GlobalContextType } from '../_utils/types';

const GeoContext = React.createContext<GlobalContextType<d3Geo.GeoProjection>>(
  {}
);

export default GeoContext;
