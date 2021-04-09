export type Coordinate = [number, number];

export interface GlobalContextType<ProjectionType> {
  width?: number;
  height?: number;
  projection?: ProjectionType;
}

export interface Scale {
  minimum?: number;
  maximum?: number;
}
