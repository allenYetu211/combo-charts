import React from 'react';
import { GlobalContextType } from '../../types';
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
  setProjection?: (v: CartesianProjection) => void;
}

const CartesianContext = React.createContext<CartesianContextType>({});

export default CartesianContext;
