export type RGB = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

export type RGBString = string;

export type Hex = string;

export type Color = {
  rgb: RGB;
  toString: string;
  toHex: string;
};

export type MapObject = {
  colors: Color[];
  ranges: number[];
};

export type ColorRange = {
  map: MapObject;
  getColor: (value: number, alpha?: number) => Color;
};
