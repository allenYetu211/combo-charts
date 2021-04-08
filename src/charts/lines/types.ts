import { Coordinate } from '../../types';

export type CurvePoints = [Coordinate, Coordinate, Coordinate];

export interface LinesModel {
  paths?: string[];
  points?: CurvePoints[];
}

export interface LinesStyle {
  color?: string;
  width?: number;
}

export interface LinesData {
  start?: Coordinate;
  end?: Coordinate;
}
