/*
 * @Description:
 * @version:
 * @Author: liuyin
 * @Date: 2021-03-10 09:14:18
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-30 22:26:11
 */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ComboContext from '../combo/context';
import CartesianContext, { CartesianProjection } from './context';
import { getAxisProjection, validPadding } from './utils';
import { AxisMode, AxisType, CartesianStyle, ProjectionSetter } from './types';
import Axis from './Axis';

interface CartesianPropsType {
  xAxis?: AxisType;
  yAxis?: AxisType;
  style?: CartesianStyle;
  children?: React.ReactNode;
}

const Cartesian: React.FC<CartesianPropsType> = (props: CartesianPropsType) => {
  const { children, xAxis = {}, yAxis = {}, style } = props;
  const { width, height } = useContext(ComboContext);
  const padding = useMemo(() => validPadding(style), [style]);
  const [projection, setProjection] = useState<CartesianProjection>({});
  const [xMode, setXMode] = useState<AxisMode | undefined>(undefined);
  const [yMode, setYMode] = useState<AxisMode | undefined>(undefined);

  /**
   * 初始化 x、y 轴映射函数
   */
  useEffect(() => {
    if (!width || !height) {
      return;
    }
    const x = getAxisProjection(xAxis, [padding[3], width - padding[1]]);
    const y = getAxisProjection(yAxis, [height - padding[2], padding[0]]);
    setProjection({
      x,
      y,
    });
  }, [height, padding, width, xAxis, yAxis]);

  /**
   * 设置 x 轴的映射
   * 只会在子组件中调用
   * 且只会在 x 轴为数值轴时调用
   */
  const updateProjection = useCallback<ProjectionSetter>(
    (type, minValue, maxValue) => {
      const axis = type === 'x' ? xAxis : yAxis;
      if (axis.mode !== 'value' || !width || !height) {
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
          ? [padding[3], width - padding[1]]
          : [height - padding[2], padding[0]]
      );
      setProjection(p);
    },
    [height, padding, projection, width, xAxis, yAxis]
  );

  return (
    <>
      <CartesianContext.Provider
        value={{
          projection,
          xMode,
          yMode,
          setXMode,
          setYMode,
          updateProjection,
        }}
      >
        {/* xAxis */}
        <Axis padding={padding} type="x" {...xAxis} />
        {/* yAxis */}
        <Axis padding={padding} type="y" {...yAxis} />
        {/* children */}
        {children}
      </CartesianContext.Provider>
    </>
  );
};

export default Cartesian;
