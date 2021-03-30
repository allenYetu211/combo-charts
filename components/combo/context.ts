/*
 * @Description: Combo Context
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-09 09:14:08
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-30 17:04:33
 */

import React from 'react';
import { SetFunctionStateAction } from '../_utils/hooks/useFunctionState';
import { ZoomFunction } from './types';

export interface ComboContextType {
  width?: number;
  height?: number;
  maximumScale?: number;
  setZoomFunction?: SetFunctionStateAction<ZoomFunction | undefined>;
}

const ComboContext = React.createContext<ComboContextType>({
  width: 0,
  height: 0,
  maximumScale: 1,
  setZoomFunction: () => 0,
});

export default ComboContext;
