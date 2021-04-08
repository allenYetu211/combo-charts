import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as d3Geo from 'd3-geo';
import * as d3Selection from 'd3-selection';
import GeoContext from './context';
import * as d3Zoom from 'd3-zoom';
import { GeoJSONFunction, SimpleGeoJSON, GeoStyle } from './types';
import { Scale } from '../../types';
import useBox, { BoxProps } from '../../utils/hooks/useBox';

interface GeoProps extends BoxProps {
  geoJson?: GeoJSONFunction | SimpleGeoJSON;
  style?: GeoStyle;
  children?: React.ReactNode;
  scale?: false | Scale;
}

const Geo: React.FC<GeoProps> = (props: GeoProps) => {
  const { children, geoJson, style, scale, width, height } = props;
  const ref = useRef<SVGGElement>(null);
  const [geoData, setGeoData] = useState<
    d3Geo.ExtendedFeatureCollection | undefined
  >(undefined);
  const { innerHeight, innerWidth, ref: svgRef } = useBox(width, height);

  const projection = useMemo(
    () =>
      geoData
        ? d3Geo.geoMercator().fitExtent(
            [
              [0, 0],
              [innerWidth, innerHeight],
            ],
            geoData
          )
        : undefined,
    [geoData, innerHeight, innerWidth]
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
    if (ref.current && projection && geoData) {
      const bx = d3Selection.select(ref.current);
      bx.selectAll('path')
        .data(geoData.features)
        .join('path')
        .attr('d', d3Geo.geoPath(projection))
        .attr('fill', () => style?.color || null)
        .attr('stroke', () => style?.borderColor || null)
        .attr('stroke-width', () => style?.borderWidth || null);
    }
  }, [geoData, projection, style]);

  useEffect(() => {
    if (scale && svgRef.current) {
      const { maximum, minimum } = scale;
      const max = maximum && maximum > 1 ? maximum : 1;
      const min = minimum && minimum > 1 ? minimum : 1;
      const zoom = d3Zoom
        .zoom<SVGSVGElement, unknown>()
        .translateExtent([
          [0, 0],
          [innerWidth, innerHeight],
        ])
        .scaleExtent([min, max])
        .on('zoom', function (this, event) {
          if (this) {
            const t = event.transform;
            const w = innerWidth / t.k;
            const h = innerHeight / t.k;
            let x = t.x > 0 ? 0 : -t.x / t.k;
            x = t.x > -innerWidth * (t.k - 1) ? x : innerWidth - w;
            let y = t.y > 0 ? 0 : -t.y / t.k;
            y = t.y > -innerHeight * (t.k - 1) ? y : innerHeight - h;
            this.setAttribute('viewBox', `${x} ${y} ${w} ${h}`);
          }
        });
      d3Selection.select(svgRef.current).call(zoom);
    }
  }, [innerHeight, innerWidth, scale, svgRef]);

  return (
    <svg ref={svgRef} width={innerWidth} height={innerHeight}>
      <g ref={ref} />
      <GeoContext.Provider
        value={{ projection, width: innerWidth, height: innerHeight }}
      >
        {children}
      </GeoContext.Provider>
    </svg>
  );
};

export default Geo;

export { GeoContext };

export * from './types';
