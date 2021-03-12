/*
 * @Description: 声明文件
 * @version: 0.0.1
 * @Author: liuyin
 * @Date: 2021-03-11 10:53:40
 * @LastEditors: liuyin
 * @LastEditTime: 2021-03-12 10:03:42
 */

/**
 * 柱状图数据类型
 *
 * 如果 x 轴类型为 `value`，y 轴类型为 `value`，
 * 那么这个类型一定要是 [number, number][]，
 * 数组每个元素分别对应 x 轴的值和 y 轴的值，
 * 由于这种组合类型无法断定柱状图的朝向（垂直于 x 轴、垂直于 y 轴），
 * 因此这种组合是需要舍弃的
 *
 * 如果 x 轴类型为 `enum`，y 轴类型为 `value`，
 * 由于 x 轴为类目轴，所有可能的值在 domain 中都已经给出，
 * 因此这个类型一定要是 number[]
 *
 * 如果 x 轴类型为 `value`, y 轴类型为 `enum`，
 * 同理，此时 y 轴的值域可以确定，
 * 因此这个类型一定要是 number[]
 *
 * 如果 x 轴类型为 `enum`，y 轴类型为 `enum`，
 * 那么这个类型一定要是 [string, string][]，
 * 与第一种组合一样，这种组合也是需要舍弃的
 */
export type BarDataType = number[];

export interface RectBox {
  x: number;
  y: number;
  width: number;
  height: number;
}
