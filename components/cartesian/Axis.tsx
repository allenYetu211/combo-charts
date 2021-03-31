/*
 * @Description: axis
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-30 17:14:39
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-31 17:26:37
 */
import React, { useContext, useEffect, useMemo, useRef } from 'react';
import CartesianContext, { CartesianProjection } from './context';
import { AxisMode, FullSpace, MultiAxisScale, ZoomType } from './types';
import * as d3Selection from 'd3-selection';
import * as d3Axis from 'd3-axis';
import * as d3Zoom from 'd3-zoom';
import { isContinuous } from './utils';

interface AxisPropsType {
  type: 'x' | 'y';
  padding: FullSpace;
  zoom?: ZoomType;
  mode?: AxisMode;
  scale: MultiAxisScale;
  projection: CartesianProjection;
}

const Axis: React.FC<AxisPropsType> = (props: AxisPropsType) => {
  const { type, mode, padding, zoom, scale, projection } = props;
  const ref = useRef<SVGGElement>(null);
  const {
    xMode,
    yMode,
    setXMode,
    setYMode,
    projection: zoomProjection,
    setProjection,
    height,
  } = useContext(CartesianContext);
  const zoomIdentity = useMemo(() => {
    const s = type === 'x' ? scale.x : scale.y;
    return d3Zoom
      .zoom<SVGGElement, unknown>()
      .scaleExtent([s.minimum, s.maximum]);
  }, [scale.x, scale.y, type]);

  useEffect(() => {
    if (type === 'x' && setXMode) {
      setXMode(mode || 'category');
    } else if (type === 'y' && setYMode) {
      setYMode(mode || 'value');
    }
  }, [mode, setXMode, setYMode, type]);

  useEffect(() => {
    if (ref.current && zoomProjection && height) {
      if (height < padding[2]) {
        return;
      }
      const { x, y } = zoomProjection;
      const el = d3Selection.select(ref.current);
      if (x && type === 'x') {
        el.attr('transform', `translate(0, ${height - padding[2]})`)
          .call(d3Axis.axisBottom(x))
          .call(zoomIdentity);
      }
      if (y && type === 'y') {
        el.attr('transform', `translate(${padding[3]}, 0)`)
          .call(d3Axis.axisLeft(y))
          .call(zoomIdentity);
      }
    }
  }, [height, padding, zoomProjection, type, zoomIdentity]);

  useEffect(() => {
    if (zoom && projection && ref.current) {
      const transform = d3Zoom.zoomTransform(ref.current);
      const { x, y } = projection;
      if (!x || !y) {
        return;
      }
      const { previous, current, scale, point } = zoom;
      const g = d3Selection.select(ref.current);
      let doZ = false;
      if (type === 'x') {
        doZ = point[0] > (x.range()[0] || Infinity) && isContinuous(xMode);
      } else if (type === 'y') {
        doZ = point[1] < (y.range()[0] || -Infinity) && isContinuous(yMode);
      }

      if (scale === 1) {
        const p1 = type === 'x' ? (current.x - previous.x) / transform.k : 0;
        const p2 = type === 'x' ? 0 : (current.y - previous.y) / transform.k;
        doZ && g.call(zoomIdentity.translateBy, p1, p2);
      } else {
        doZ && g.call(zoomIdentity.scaleBy, scale, point);
      }

      if (type === 'x' && isContinuous(xMode)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const xr = transform.rescaleX(x as any);
        setProjection &&
          setProjection({
            ...projection,
            x: xr,
          });
      } else if (isContinuous(yMode)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const yr = transform.rescaleX(y as any);
        setProjection &&
          setProjection({
            ...projection,
            y: yr,
          });
      }
    }
  }, [
    projection,
    setProjection,
    type,
    xMode,
    yMode,
    zoom,
    zoomIdentity.scaleBy,
    zoomIdentity.translateBy,
  ]);

  return <g ref={ref} />;
};

export default Axis;
