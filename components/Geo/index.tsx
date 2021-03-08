/*
 * @Author: liuyin
 * @Date: 2021-03-04 22:01:20
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-08 21:10:33
 * @Description: file content
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as d3Geo from 'd3-geo';
import GeoContext from './context';
import Area, { AreaStyle } from './Area';
import { useZoom } from '../_utils/hooks';

export interface SimpleGeoJSON {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  features: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any;
}

export type GeoJSONFunction = () => Promise<SimpleGeoJSON>;

interface GeoPropsType {
  width?: number | string;
  height?: number | string;
  zoomable?: boolean;
  maximumScale?: number;
  geoJson?: GeoJSONFunction | SimpleGeoJSON;
  areaStyle?: AreaStyle;
  children?: React.ReactNode;
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
  const [geoData, setGeoData] = useState<d3Geo.ExtendedFeatureCollection>(
    undefined
  );
  const [innerWidth, setInnerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);

  const projection = useMemo(
    () =>
      !innerHeight || !innerWidth
        ? undefined
        : d3Geo.geoMercator().fitExtent(
            [
              [0, 0],
              [innerWidth, innerHeight],
            ],
            geoData
          ),
    [innerWidth, innerHeight, geoData]
  );

  async function waitGeoData(fn: GeoJSONFunction) {
    const res = await fn();
    if (res) {
      setGeoData(res);
    }
  }

  useEffect(() => {
    if (typeof geoJson === 'function') {
      waitGeoData(geoJson as GeoJSONFunction);
    } else {
      setGeoData(geoJson);
    }
  }, [geoJson]);

  useEffect(() => {
    if (ref.current) {
      const parentElement = ref.current.parentElement;
      const { clientWidth, clientHeight } = parentElement || {
        clientWidth: 0,
        clientHeight: 0,
      };
      if (width !== undefined) {
        setInnerWidth(Number(width));
      } else {
        setInnerWidth(clientWidth);
      }
      if (height !== undefined) {
        setInnerHeight(Number(height));
      } else {
        setInnerHeight(clientHeight);
      }
    }
  }, [width, height]);

  useZoom(ref, innerWidth, innerHeight, maximumScale, zoomable);

  return (
    <svg width={innerWidth} height={innerHeight} ref={ref}>
      <GeoContext.Provider value={{ projection }}>
        <Area data={geoData} style={areaStyle} />
        {children}
      </GeoContext.Provider>
    </svg>
  );
};

export default Geo;
