/*
 * @Description: polar context
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-29 14:53:15
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-31 17:30:50
 */
import React from 'react';
import { GlobalContextType } from '../_utils/types';
import { PolarProjectionType } from './types';

const PolarContext = React.createContext<
  GlobalContextType<PolarProjectionType>
>({});

export default PolarContext;
