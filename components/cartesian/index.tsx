/*
 * @Description:
 * @version:
 * @Author: liuyin
 * @Date: 2021-03-10 09:14:18
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-30 14:43:54
 */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ComboContext from '../combo/context';
import CartesianContext, { CartesianProjection } from './context';
import { getAxisProjection, validPadding } from './utils';
import * as d3Selection from 'd3-selection';
import * as d3Axis from 'd3-axis';
import { Axis, CartesianStyle, ProjectionSetter } from './types';

interface CartesianPropsType {
  xAxis?: Axis;
  yAxis?: Axis;
  style?: CartesianStyle;
  children?: React.ReactNode;
}

const Cartesian: React.FC<CartesianPropsType> = (props: CartesianPropsType) => {
  const { children, xAxis, yAxis, style } = props;
  const { width, height } = useContext(ComboContext);
  const { innerWidth, innerHeight } = useMemo(
    () => ({
      innerWidth: width || 0,
      innerHeight: height || 0,
    }),
    [width, height]
  );
  const xRef = useRef<SVGGElement>(null);
  const yRef = useRef<SVGGElement>(null);
  const padding = useMemo(() => validPadding(style), [style]);
  const [projection, setProjection] = useState<CartesianProjection>({});

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
  }, [xAxis, yAxis, padding, innerWidth, innerHeight]);

  /**
   * 设置 x 轴的映射
   * 只会在子组件中调用
   * 且只会在 x 轴为数值轴时调用
   */
  const updateProjection = useCallback<ProjectionSetter>(
    (type, minValue, maxValue) => {
      const axis = type === 'x' ? xAxis : yAxis;
      if (!axis || axis.mode !== 'value') {
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
      setProjection(p);
    },
    [innerHeight, innerWidth, padding, projection, xAxis, yAxis]
  );

  /**
   * 绘制 x、y 轴轴线
   */
  useEffect(() => {
    if (xRef.current && yRef.current) {
      const xA = d3Selection.select(xRef.current);
      const yA = d3Selection.select(yRef.current);
      if (projection.x) {
        xA.attr('transform', `translate(0, ${innerHeight - padding[2]})`).call(
          d3Axis.axisBottom(projection.x)
        );
      }
      if (projection.y) {
        yA.attr('transform', `translate(${padding[3]}, 0)`).call(
          d3Axis.axisLeft(projection.y)
        );
      }
    }
  }, [projection, innerHeight, padding]);

  return (
    <>
      <g>
        {/* x axis */}
        <g ref={xRef} />
        {/* y axis */}
        <g ref={yRef} />
      </g>
      <CartesianContext.Provider
        value={{
          projection,
          updateProjection,
          xMode: xAxis?.mode,
          yMode: yAxis?.mode,
        }}
      >
        {children}
      </CartesianContext.Provider>
    </>
  );
};

Cartesian.defaultProps = {
  xAxis: {
    mode: 'category',
  },
  yAxis: {
    mode: 'value',
  },
};

export default Cartesian;
