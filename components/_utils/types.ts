/*
 * @Description: 全局声明文件
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-08 16:18:26
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-31 14:44:38
 */

export type Coordinate = [number, number];

export interface GlobalContextType<ProjectionType> {
  width?: number;
  height?: number;
  projection?: ProjectionType;
}

export interface BoxProps {
  width?: number | string;
  height?: number | string;
}

export interface Scale {
  minimum?: number;
  maximum?: number;
}
