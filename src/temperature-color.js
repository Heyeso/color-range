"use strict";

/**
 * Default colors for mapping.
 */
const default_colors = [
  [255, 0, 255],
  [217, 130, 181],
  [128, 0, 128],
  [0, 0, 255],
  [135, 206, 235],
  [0, 255, 0],
  [27, 142, 45],
  [255, 255, 0],
  [255, 215, 0],
  [255, 36, 0],
  [255, 0, 0],
  [139, 0, 0],
];
/**
 * Default temperature for mapping.
 */
const default_temperatures = [-23, -18, -12, -7, -1, 4, 10, 16, 21, 27, 32, 38];

class Mapping {
  /**
   * Create a one-to-one mapping of array of colors and array of temperatures
   * @param {number[][]} color
   * @param {number[]} temperature
   */
  constructor(color = default_colors, temperature = default_temperatures) {
    this.color = color;
    this.temperature = temperature;
  }
}

export class RGB {
  /**
   * color object in rgb format
   * @param {number} r
   * @param {number} g
   * @param {number} b
   */
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  /**
   * String representation of color in rgb format
   * @returns { string }
   */
  toString() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
  /**
   * String representation of color in hex format
   * @returns { string }
   */
  toHexString() {
    function channelToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
    return `#${channelToHex(this.r)}${channelToHex(this.g)}${channelToHex(
      this.b
    )}`;
  }
}

/**
 * Create a one-to-one mapping of array of colors and array of temperatures of same size.
 * @param {number[][]} colorArr array of colors represented in rgb format.
 * @param {number[]} temperatureArr array of numbers for represented temperature in any Unit.
 * @returns object of mapped colors and temperatures.
 */
export default function TempColorMapping(
  colorArr = default_colors,
  temperatureArr = default_temperatures
) {
  let self = {};
  self.Mapping = new Mapping(colorArr, temperatureArr);

  /**
   * Transition Mix between two colors.
   * @param {number[]} rgbA first color in rgb format. [r, g, b].
   * @param {number[]} rgbB second color in rgb format. [r, g, b].
   * @param {number} amountToMix transition amount min = 0, max = 1, default = 0.5.
   * @returns {number[]} color of transition mix in rgb format.
   */
  self.PercentageColorMixer = function (rgbA, rgbB, amountToMix = 0.5) {
    /**
     *
     * @param {number} colorChannelA
     * @param {number} colorChannelB
     * @returns
     */
    const ColorChannelMixer = function (colorChannelA, colorChannelB) {
      var channelA = colorChannelA * amountToMix;
      var channelB = colorChannelB * (1 - amountToMix);
      return channelA + channelB;
    };
    if (amountToMix > 1) amountToMix = 1;
    if (amountToMix < 0) amountToMix = 0;
    const r = ColorChannelMixer(rgbA[0], rgbB[0]);
    const g = ColorChannelMixer(rgbA[1], rgbB[1]);
    const b = ColorChannelMixer(rgbA[2], rgbB[2]);

    return [parseInt(r), parseInt(g), parseInt(b)];
  };

  /**
   * Calculate the color that represents temperature in the color-temperature mapping.
   * @param {number} temperature temperature number.
   * @returns {RGB} color that represents temperature in mapping in rgb format.
   */
  self.TemperatureToColor = function (temperature) {
    temperature = parseFloat(temperature);
    if (temperature <= this.Mapping.temperature[0])
      return new RGB(
        this.Mapping.color[0][0],
        this.Mapping.color[0][1],
        this.Mapping.color[0][2]
      );
    if (
      temperature >=
      this.Mapping.temperature[this.Mapping.temperature.length - 1]
    )
      return new RGB(
        this.Mapping.color[this.Mapping.temperature.length - 1][0],
        this.Mapping.color[this.Mapping.temperature.length - 1][1],
        this.Mapping.color[this.Mapping.temperature.length - 1][2]
      );
    for (let x = 0; x < this.Mapping.temperature.length - 1; x++) {
      if (this.Mapping.temperature[x] === temperature)
        return new RGB(
          this.Mapping.color[x][0],
          this.Mapping.color[x][1],
          this.Mapping.color[x][2]
        );

      if (
        temperature > this.Mapping.temperature[x] &&
        temperature < this.Mapping.temperature[x + 1]
      ) {
        const max = this.Mapping.temperature[x],
          min = this.Mapping.temperature[x + 1];
        const ratio = (temperature - min) / (max - min);
        const [r, g, b] = this.PercentageColorMixer(
          this.Mapping.color[x],
          this.Mapping.color[x + 1],
          ratio
        );
        return new RGB(r, g, b);
      }
    }
    return new RGB(0, 0, 0);
  };

  return self;
}
