import { Coordinate } from '../../types';
import Linear from '../../utils/linear';

export function computeControllPoint(
  p0: Coordinate,
  p1: Coordinate,
  curve: number
): Coordinate {
  const line = new Linear(p0, p1);
  const center = p0.map((v, i) => (v + (p1[i] || 0)) / 2); // 中心点
  const line1 = line.perpendicular(); // 垂直线
  const theta = line1.getAngle(); // 这条线与x轴的角度
  const distance = Math.sqrt(
    p0.map((v, i) => Math.pow(v - (center[i] || 0), 2)).reduce((p, c) => p + c)
  ); // 起始点与终止点的距离
  const offset = distance * (curve || 0); // 沿着垂线的偏移距离
  const xOffset = Math.cos(theta) * offset; // 偏移距离与center点的x轴偏移
  const yOffset = Math.sin(theta) * offset; // 偏移距离与center点的y轴偏移
  const x = (center[0] || 0) + xOffset; // 偏移点x点
  const y = (center[1] || 0) + yOffset; // 偏移点y点
  return [x, y];
}
