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
