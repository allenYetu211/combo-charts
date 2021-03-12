/*
 * @Description: 全局声明文件
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-08 16:18:26
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-10 16:19:09
 */

export type Coordinate = [number, number];

export interface GlobalContextType<ProjectionType> {
  projection?: ProjectionType;
}
