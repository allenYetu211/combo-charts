/*
 * @Description: 笛卡尔坐标系context
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-10 09:16:56
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-30 17:32:03
 */
import React from 'react';
import { GlobalContextType } from '../_utils/types';
import { AxisMode, AxisProjection, ProjectionSetter } from './types';

export interface CartesianProjection {
  x?: AxisProjection;
  y?: AxisProjection;
}

interface CartesianContextType extends GlobalContextType<CartesianProjection> {
  xMode?: AxisMode | undefined;
  yMode?: AxisMode | undefined;
  setXMode?: (v: AxisMode) => void;
  setYMode?: (v: AxisMode) => void;
  updateProjection?: ProjectionSetter;
}

const CartesianContext = React.createContext<CartesianContextType>({});

export default CartesianContext;
