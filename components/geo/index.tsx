/*
 * @Author: liuyin
 * @Date: 2021-03-04 22:01:20
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-12 12:39:35
 * @Description: file content
 */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as d3Geo from 'd3-geo';
import * as d3Selection from 'd3-selection';
import GeoContext from './context';
import ComboContext from '../combo/context';

export interface SimpleGeoJSON {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  features: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any;
}

export type GeoJSONFunction = () => Promise<SimpleGeoJSON>;

export interface GeoStyle {
  color?: string;
  borderColor?: string;
  borderWidth?: number;
}

interface GeoPropsType {
  geoJson?: GeoJSONFunction | SimpleGeoJSON;
  style?: GeoStyle;
  children?: React.ReactNode;
}

const Geo: React.FC<GeoPropsType> = (props: GeoPropsType) => {
  const { children, geoJson, style } = props;
  const ref = useRef<SVGGElement>(null);
  const [geoData, setGeoData] = useState<
    d3Geo.ExtendedFeatureCollection | undefined
  >(undefined);
  const { width, height } = useContext(ComboContext);

  const projection = useMemo(
    () =>
      geoData
        ? d3Geo.geoMercator().fitExtent(
            [
              [0, 0],
              [width, height],
            ],
            geoData
          )
        : undefined,
    [width, height, geoData]
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

  const redraw = useCallback(() => {
    if (ref.current && projection && geoData) {
      const bx = d3Selection.select(ref.current);
      bx.selectAll('path')
        .data(geoData.features)
        .join('path')
        .attr('d', d3Geo.geoPath(projection));
    }
  }, [geoData, projection]);

  const restyle = useCallback(() => {
    if (ref.current) {
      d3Selection
        .select(ref.current)
        .selectAll('path')
        .attr('fill', () => style?.color || null)
        .attr('stroke', () => style?.borderColor || null)
        .attr('stroke-width', () => style?.borderWidth || null);
    }
  }, [style]);

  useEffect(() => {
    redraw();
    restyle();
  }, [redraw, restyle]);

  return (
    <>
      <g ref={ref} />
      <GeoContext.Provider value={{ projection }}>
        {children}
      </GeoContext.Provider>
    </>
  );
};

export default Geo;
