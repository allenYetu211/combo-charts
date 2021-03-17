/*
 * @Description: 全局声明文件
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-08 16:18:26
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-17 22:20:13
 */

export type Coordinate = [number, number];

export interface GlobalContextType<ProjectionType> {
  projection?: ProjectionType;
}

export interface CartesianChildrenProps {
  data?: number[] | Coordinate[];
}
