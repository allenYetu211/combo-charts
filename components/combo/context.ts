/*
 * @Description: Combo Context
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-09 09:14:08
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-09 09:16:59
 */

import React from 'react';

export interface ComboContextType {
  width: number;
  height: number;
}

const ComboContext = React.createContext<ComboContextType>({
  width: 0,
  height: 0,
});

export default ComboContext;
