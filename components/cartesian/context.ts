/*
 * @Description: 笛卡尔坐标系context
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-10 09:16:56
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-12 16:05:11
 */
import React from 'react';
import { GlobalContextType } from '../_utils/interface';
import { AxisMode, AxisProjection, ProjectionSetter } from './interface';

export interface CartesianProjection {
  x?: AxisProjection;
  y?: AxisProjection;
}

interface CartesianContextType extends GlobalContextType<CartesianProjection> {
  xMode: AxisMode;
  yMode: AxisMode;
  setXProjection: ProjectionSetter;
  setYProjection: ProjectionSetter;
}

const CartesianContext = React.createContext<CartesianContextType>({
  xMode: 'value',
  yMode: 'value',
  setXProjection: () => 0,
  setYProjection: () => 0,
});

export default CartesianContext;
