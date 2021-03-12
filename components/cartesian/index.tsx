/*
 * @Description:
 * @version:
 * @Author: liuyin
 * @Date: 2021-03-10 09:14:18
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-12 17:11:51
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
import {
  checkAxisData,
  checkMode,
  getAxisProjection,
  validPadding,
} from './utils';
import * as d3Selection from 'd3-selection';
import * as d3Axis from 'd3-axis';
import * as d3Scale from 'd3-scale';
import { Axis, CartesianStyle, ProjectionSetter } from './interface';
import { axisWarn } from './warn';

interface CartesianPropsType {
  xAxis?: Axis;
  yAxis?: Axis;
  style?: CartesianStyle;
  children?: React.ReactNode;
}

const Cartesian: React.FC<CartesianPropsType> = (props: CartesianPropsType) => {
  const { children, xAxis, yAxis, style } = props;
  const context = useContext(ComboContext);
  const ref = useRef<SVGGElement>(null);
  const padding = useMemo(() => validPadding(style), [style]);
  const [projection, setProjection] = useState<CartesianProjection>({});

  useEffect(() => {
    if (!xAxis || !yAxis || !xAxis.mode || !yAxis.mode) {
      // 缺少配置信息就返回一个空对象
      axisWarn('xAxis', xAxis);
      axisWarn('yAxis', yAxis);
      setProjection({});
      return;
    }
    const xMode = xAxis.mode;
    const yMode = yAxis.mode;
    checkMode(xMode, yMode);
    checkAxisData(xAxis, yAxis);
    const x = getAxisProjection(xAxis, [
      padding[3],
      context.width - padding[1],
    ]);
    const y = getAxisProjection(yAxis, [
      context.height - padding[2],
      padding[0],
    ]);
    setProjection({
      x,
      y,
    });
  }, [xAxis, yAxis, padding, context]);

  /**
   * 设置 x 轴的映射
   * 只会在子组件中调用
   * 且只会在 x 轴为数值轴时调用
   */
  const setXProjection = useCallback<ProjectionSetter>(
    (minValue: number, maxValue: number) => {
      if (!xAxis || !xAxis.mode) {
        axisWarn('xAxis', xAxis);
        return;
      }
      if (xAxis.mode !== 'value') {
        return;
      }
      const { min, max } = xAxis;
      const base = minValue > 0 ? 0 : minValue;
      const mn = min ? min : base;
      const mx = max ? max : maxValue;
      setProjection({
        ...projection,
        x: getAxisProjection(
          {
            mode: 'value',
            min: mn,
            max: mx,
          },
          [padding[3], context.width - padding[1]]
        ),
      });
    },
    [xAxis, projection, padding, context.width]
  );

  const setYProjection = useCallback<ProjectionSetter>(
    (minValue: number, maxValue: number) => {
      if (!yAxis || !yAxis.mode) {
        axisWarn('yAxis', yAxis);
        return;
      }
      if (yAxis.mode !== 'value') {
        return;
      }
      const { min, max } = yAxis;
      const base = minValue > 0 ? 0 : minValue;
      const mn = min ? min : base;
      const mx = max ? max : maxValue;
      setProjection({
        ...projection,
        y: getAxisProjection(
          {
            mode: 'value',
            min: mn,
            max: mx,
          },
          [context.height - padding[2], padding[0]]
        ),
      });
    },
    [yAxis, projection, padding, context.height]
  );

  useEffect(() => {
    if (ref.current) {
      if (!xAxis || !yAxis || !xAxis.mode || !yAxis.mode) {
        // 缺少配置信息就返回一个空对象
        axisWarn('xAxis', xAxis);
        axisWarn('yAxis', yAxis);
        return;
      }
      const axis = d3Selection.select(ref.current);
      const padding = validPadding(style);
      axis
        .selectChildren('g')
        .data(['xAxis', 'yAxis'])
        .join('g')
        .attr('class', function (data) {
          return data;
        });
      const fnx = projection.x && projection.x[xAxis.mode];
      const fny = projection.y && projection.y[yAxis.mode];
      if (fnx) {
        type FnType = typeof fnx extends d3Scale.ScaleBand<string>
          ? d3Scale.ScaleBand<string>
          : d3Scale.ScaleLinear<number, number, number>;
        type ParamType = typeof fnx extends d3Scale.ScaleBand<string>
          ? string
          : number;
        axis
          .select<SVGGElement>('g.xAxis')
          .attr('transform', `translate(0, ${context.height - padding[2]})`)
          .call(d3Axis.axisBottom<ParamType>(fnx as FnType));
      }
      if (fny) {
        type FnType = typeof fny extends d3Scale.ScaleBand<string>
          ? d3Scale.ScaleBand<string>
          : d3Scale.ScaleLinear<number, number, number>;
        type ParamType = typeof fny extends d3Scale.ScaleBand<string>
          ? string
          : number;
        axis
          .select<SVGGElement>('g.yAxis')
          .attr('transform', `translate(${padding[3]}, 0)`)
          .call(d3Axis.axisLeft<ParamType>(fny as FnType));
      }
    }
  }, [projection, context, style, xAxis, yAxis]);

  return (
    <>
      <g ref={ref} />
      <CartesianContext.Provider
        value={{
          projection,
          setXProjection,
          setYProjection,
          xMode: xAxis?.mode || 'value',
          yMode: yAxis?.mode || 'value',
        }}
      >
        {children}
      </CartesianContext.Provider>
    </>
  );
};

export default Cartesian;
