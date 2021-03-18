/*
 * @Description: 笛卡尔坐标系context
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-10 09:16:56
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-18 22:33:20
 */
import React from 'react';
import { GlobalContextType } from '../_utils/types';
import { AxisMode, AxisProjection, ProjectionSetter } from './types';

export interface CartesianProjection {
  x?: AxisProjection;
  y?: AxisProjection;
}

interface CartesianContextType extends GlobalContextType<CartesianProjection> {
  xMode: AxisMode | undefined;
  yMode: AxisMode | undefined;
  updateProjection: ProjectionSetter;
}

const CartesianContext = React.createContext<CartesianContextType>({
  xMode: 'category',
  yMode: 'value',
  updateProjection: () => 0,
});

export default CartesianContext;
