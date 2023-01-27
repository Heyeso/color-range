"use strict";

import { RGB, Color, ColorMap } from "./types";
import { channelToHex, createMap, blendColorByRatio } from "./utils";

/**
 * It takes an object with three properties, r, g, and b, and returns an object with two methods,
 * toString and toHex
 * @param {RGB}  - RGB - the type of the parameter
 * @returns A function that returns an object with a toString method and a toHex method.
 */
export const createColor = (rgb: RGB | number[]): Color => ({
  rgb: Array.isArray(rgb) ? { r: rgb[0], g: rgb[1], b: rgb[0] } : rgb,
  toString() {
    return `rgb(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b})`;
  },
  toHex() {
    return `#${channelToHex(this.rgb.r)}${channelToHex(
      this.rgb.g
    )}${channelToHex(this.rgb.b)}`;
  },
});

/**
 * It takes an array of colors and an array of ranges, and returns an object with the mapping of
 * color to ranges, and a `getColor` method that takes a number and returns a color.
 * @param {number[][]} colors - an array of colors, each color is an array of 3 numbers, each number is
 * between 0 and 255.
 * @param {number[]} ranges - [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
 * @returns An object with two properties: map and getColor.
 */
export default function colorMap(
  colors: number[][],
  ranges: number[]
): ColorMap {
  return {
    map: createMap(colors, ranges),
    getColor(num: number): Color | null {
      if (num <= this.map.ranges[0]) return this.map.colors[0];
      if (num >= this.map.ranges[this.map.ranges.length - 1])
        return this.map.colors[this.map.ranges.length - 1];

      let color = null;
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
        } else if (num === range) color = this.map.colors[index];
      });

      return color;
    },
  };
}
