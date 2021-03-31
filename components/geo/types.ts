/*
 * @Description: types
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-31 11:07:21
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-31 14:45:45
 */

export interface SimpleGeoJSON {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  features: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any;
}

export type GeoJSONFunction = () => Promise<SimpleGeoJSON>;

export interface GeoStyle {
  color?: string;
  borderColor?: string;
  borderWidth?: number;
}
