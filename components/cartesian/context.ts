/*
 * @Description: 笛卡尔坐标系context
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-10 09:16:56
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-10 16:19:17
 */
import React from 'react';
import * as d3Scale from 'd3-scale';
import { GlobalContextType } from '../_utils/interface';

export interface CartesianProjection {
  x: d3Scale.ScaleLinear<number, number> | d3Scale.ScaleBand<string>;
  y: d3Scale.ScaleLinear<number, number> | d3Scale.ScaleBand<string>;
}

const CartesianContext = React.createContext<
  GlobalContextType<CartesianProjection>
>({});

export default CartesianContext;
