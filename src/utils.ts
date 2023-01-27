import { createColor } from "./color-map";
import { Color, MapObject } from "./types";

/**
 * "Given two color channels and a ratio, return a new color channel that is a mix of the two."
 *
 * @param {number} channel1 - The first color channel to mix.
 * @param {number} channel2 - The second color channel to mix.
 * @param {number} ratio - The amount of the first color to mix with the second color.
 * @returns A new color channel that is a mix of the two.
 */
const blendChannelByRatio = (
  channel1: number,
  channel2: number,
  ratio: number
): number => channel1 * ratio + channel2 * (1 - ratio);

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
 * It takes a number between 0 and 255 and returns a string with the hexadecimal representation of that
 * number
 * @param {number} channel - The channel to convert to hex.
 * @returns A string
 */
export const channelToHex = (channel: number): string => {
  const hex = channel.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

/**
 * It takes an array of RGB colors and an array of ranges, and returns a ColorRangeMap object.
 * Both arrays must be of same sizes
 *
 * @param {number[][]} colors - An array of RGB color values.
 * @param {number[]} ranges - An array of numbers that represent the ranges of the colors.
 * @returns A color range map.
 */
export const createMap = (colors: number[][], ranges: number[]): MapObject => {
  return {
    colors: colors.map((colorItem) =>
      createColor({ r: colorItem[0], g: colorItem[1], b: colorItem[2] })
    ),
    ranges: ranges.sort((a, b) => a - b),
  };
};
