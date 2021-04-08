import React from 'react';
import * as d3Geo from 'd3-geo';
import { GlobalContextType } from '../../types';

const GeoContext = React.createContext<GlobalContextType<d3Geo.GeoProjection>>(
  {}
);

export default GeoContext;
