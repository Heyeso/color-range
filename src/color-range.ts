import { Color, ColorRange, MapObject, RGB } from "./types";
import {
  isRGB,
  arrayToRGB,
  hexToRGB,
  isHex,
  isRGBString,
  stringToRGB,
  rgbToString,
  toHex,
  blendChannelByRatio,
} from "./utils";

/**
 * It takes in a color value, and returns a color object
 * @param {RGB | number[] | string} value - RGB | number[] | string
 * @returns A function that returns an object with a toString method and a toHex method.
 */
export const createColor = (value: RGB | number[] | string): Color => {
  let rgb: RGB = { r: 0, g: 0, b: 0 };

  if (isRGB(value)) {
    if (value.a && (value.a < 0 || value.a > 1))
      throw new Error(`Value out of range for an alpha value: ${value}.`);
    rgb = { r: value.r, g: value.g, b: value.b, a: value.a };
  } else if (isRGBString(value)) rgb = stringToRGB(value);
  else if (isHex(value)) rgb = hexToRGB(value);
  else if (Array.isArray(value)) rgb = arrayToRGB(value);

  return {
    rgb,
    toString: rgbToString(rgb),
    toHex: toHex(rgb, rgb.a),
  };
};

/**
 * It takes an array of RGB colors and an array of ranges, and returns a ColorRangeMap object.
 * Both arrays must be of same sizes
 *
 * @param {(RGB | number[] | string)[]} colors - An array of RGB color values.
 * @param {number[]} ranges - An array of numbers that represent the ranges of the colors.
 * @returns A color range map.
 */
export const createMap = (
  colors: (RGB | number[] | string)[],
  ranges: number[]
): MapObject => {
  return {
    colors: colors.map((colorItem) => createColor(colorItem)),
    ranges: ranges.sort((a, b) => a - b),
  };
};

/**
 * It takes two colors and a percentage, and returns a new color that is a mix of the two colors
 * @param {Color} color1 - The first color to mix.
 * @param {Color} color2 - The color to mix with.
 * @param [ratio=0.5] - The percentage of color1 to use.
 * @returns A color object
 */
export const blendColorByRatio = function (
  color1: Color,
  color2: Color,
  ratio = 0.5
): Color {
  if (ratio > 1) ratio = 1;
  if (ratio < 0) ratio = 0;

  const r = blendChannelByRatio(color1.rgb.r, color2.rgb.r, ratio);
  const g = blendChannelByRatio(color1.rgb.g, color2.rgb.g, ratio);
  const b = blendChannelByRatio(color1.rgb.b, color2.rgb.b, ratio);

  return createColor({ r: Math.round(r), g: Math.round(g), b: Math.round(b) });
};

/**
 * It takes an array of colors and an array of ranges, and returns an object with the mapping of
 * color to ranges, and a `getColor` method that takes a number and returns a color.
 * @param {(RGB | number[] | string)[]} colors - an array of colors, each color is an array of 3 numbers, each number is
 * between 0 and 255.
 * @param {number[]} ranges - [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
 * @returns An object with two properties: map and getColor.
 */
export function colorRange(colors: (RGB | number[] | string)[], ranges: number[]): ColorRange {
  return {
    map: createMap(colors, ranges),
    getColor(num: number, alpha?: number): Color {
      if (num <= this.map.ranges[0]) return this.map.colors[0];
      if (num >= this.map.ranges[this.map.ranges.length - 1])
        return this.map.colors[this.map.ranges.length - 1];

      let color = createColor({ ...this.map.colors[0].rgb, a: alpha });
      this.map.ranges.forEach((range, index) => {
        if (num > range && num < this.map.ranges[index + 1]) {
          const min = range,
            max = this.map.ranges[index + 1];
          const ratio = (num - min) / (max - min);

          color = blendColorByRatio(
            this.map.colors[index],
            this.map.colors[index + 1],
            ratio
          );

          color = alpha ? createColor({ ...color.rgb, a: alpha }) : color;
        } else if (num === range)
          color = alpha
            ? createColor({ ...this.map.colors[index].rgb, a: alpha })
            : this.map.colors[index];
      });

      return color;
    },
  };
}
