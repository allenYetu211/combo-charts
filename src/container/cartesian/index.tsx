import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CartesianContext, { CartesianProjection } from './context';
import { getAxisProjection, validPadding } from './utils';
import {
  AxisMode,
  AxisType,
  CartesianScale,
  CartesianStyle,
  MultiAxisScale,
  ProjectionSetter,
  ZoomType,
} from './types';
import Axis from './components/Axis';
import useBox, { BoxProps } from '../../utils/hooks/useBox';
import { useZoom } from './useZoom';

interface CartesianProps extends BoxProps {
  xAxis?: AxisType;
  yAxis?: AxisType;
  style?: CartesianStyle;
  scale?: CartesianScale;
  children?: React.ReactNode;
}

const Cartesian: React.FC<CartesianProps> = (props: CartesianProps) => {
  const {
    children,
    xAxis = {},
    yAxis = {},
    style,
    width,
    height,
    scale,
  } = props;
  const padding = useMemo(() => validPadding(style), [style]);
  const [projection, setProjection] = useState<CartesianProjection>({});
  const [zoomProjection, setZoomProjection] = useState<CartesianProjection>({});
  const [xMode, setXMode] = useState<AxisMode | undefined>(undefined);
  const [yMode, setYMode] = useState<AxisMode | undefined>(undefined);
  const [zoom, setZoom] = useState<ZoomType | undefined>(undefined);
  const { innerHeight, innerWidth, ref } = useBox(width, height);
  const innerScale = useMemo<Required<MultiAxisScale>>(() => {
    const defaultRes = {
      x: {
        minimum: 1,
        maximum: 1,
      },
      y: {
        minimum: 1,
        maximum: 1,
      },
    };
    if (!scale) {
      return defaultRes;
    }

    defaultRes.x.minimum = scale.minimum || 1;
    defaultRes.y.minimum = scale.minimum || 1;
    defaultRes.x.maximum = scale.maximum || 1;
    defaultRes.y.maximum = scale.maximum || 1;
    if (scale.x) {
      defaultRes.x.minimum = scale.x.minimum || 1;
      defaultRes.x.maximum = scale.x.maximum || 1;
    }
    if (scale.y) {
      defaultRes.y.minimum = scale.y.minimum || 1;
      defaultRes.y.maximum = scale.y.maximum || 1;
    }
    return defaultRes;
  }, [scale]);

  /**
   * 初始化 x、y 轴映射函数
   */
  useEffect(() => {
    const x = getAxisProjection(xAxis, [padding[3], innerWidth - padding[1]]);
    const y = getAxisProjection(yAxis, [innerHeight - padding[2], padding[0]]);
    setProjection({
      x,
      y,
    });
    setZoomProjection({
      x,
      y,
    });
  }, [innerWidth, padding, innerHeight, xAxis, yAxis]);

  /**
   * 设置 x 轴的映射
   * 只会在子组件中调用
   * 且只会在 x 轴为数值轴时调用
   */
  const updateProjection = useCallback<ProjectionSetter>(
    (type, minValue, maxValue) => {
      const axis = type === 'x' ? xAxis : yAxis;
      if (axis.mode !== 'value') {
        return;
      }
      const { min, max } = axis;
      const base = minValue > 0 ? 0 : minValue;
      const mn = min ? min : base;
      const mx = max ? max : maxValue;
      const p = { ...projection };
      p[type] = getAxisProjection(
        {
          mode: 'value',
          min: mn,
          max: mx,
        },
        type === 'x'
          ? [padding[3], innerWidth - padding[1]]
          : [innerHeight - padding[2], padding[0]]
      );
      setZoomProjection(p);
      setProjection(p);
    },
    [innerHeight, padding, projection, innerWidth, xAxis, yAxis]
  );

  useZoom(
    (previous, current, scale, point) => {
      setZoom({
        previous,
        current,
        scale,
        point,
      });
    },
    innerWidth,
    innerHeight,
    ref.current
  );

  return (
    <svg ref={ref} width={innerWidth} height={innerHeight}>
      <CartesianContext.Provider
        value={{
          height: innerHeight,
          width: innerWidth,
          projection: zoomProjection,
          xMode,
          yMode,
          setXMode,
          setYMode,
          updateProjection,
          setProjection: setZoomProjection,
        }}
      >
        {/* xAxis */}
        <Axis
          padding={padding}
          projection={projection}
          type="x"
          zoom={zoom}
          {...xAxis}
          scale={innerScale}
        />
        {/* yAxis */}
        <Axis
          padding={padding}
          projection={projection}
          type="y"
          zoom={zoom}
          {...yAxis}
          scale={innerScale}
        />
        {/* children */}
        {children}
      </CartesianContext.Provider>
    </svg>
  );
};

export default Cartesian;

export { CartesianContext };

export type { CartesianProjection };

export * from './types';

export * from './apply';
