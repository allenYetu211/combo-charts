import React from 'react';

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

export type Subtract<T, K> = Omit<T, keyof K>;

export type HOC<IP, OP> = <T>(
  Node: React.ComponentType<T>
) => React.FC<Subtract<T, IP> & OP>;
