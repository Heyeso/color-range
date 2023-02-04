import { RGB } from "./types";

/**
 * "Given two color channels and a ratio, return a new color channel that is a mix of the two."
 *
 * @param {number} channel1 - The first color channel to mix.
 * @param {number} channel2 - The second color channel to mix.
 * @param {number} ratio - The amount of the first color to mix with the second color.
 * @returns A new color channel that is a mix of the two.
 */
export const blendChannelByRatio = (
  channel1: number,
  channel2: number,
  ratio: number
): number =>  (channel2 * (1 - ratio)) + (channel1 * ratio);

/**
 * "Given an RGB object, return a string of the form rgb(r, g, b)."
 *
 * The function takes an RGB object as its argument and returns a string
 * @param {RGB} rgb - The RGB object to convert to a string.
 */
export const rgbToString = (rgb: RGB): string =>
  `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}${rgb.a ? ", " + rgb.a : ""})`;

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
 * It takes an RGB object and returns an Hex string
 * @param {RGB} rgb - RGB - This is the RGB object that we're converting to a hex string.
 * @param {number} [alpha] - The alpha value of the color.
 */
export const toHex = (rgb: RGB, alpha?: number): string =>
  `#${channelToHex(rgb.r)}${channelToHex(rgb.g)}${channelToHex(rgb.b)}${
    alpha ? channelToHex(alpha * 255) : ""
  }`;

/**
 * "If the value is an object with r, g, and b properties that are numbers, then it's an RGB object."
 *
 * The above function is a type guard. It's a function that takes a value and returns a boolean. If the
 * value is of the type we're checking for, then the function returns true. Otherwise, it returns false
 * @param {any} value - any
 * @returns true if the value is an object with r, g, and b properties that are numbers.
 */
export const isRGB = (value: any): value is RGB => {
  return (
    typeof value === "object" &&
    "r" in value &&
    typeof value.r === "number" &&
    "g" in value &&
    typeof value.g === "number" &&
    "b" in value &&
    typeof value.b === "number"
  );
};

/**
 * It returns true if the value is a string that matches the regular expression
 * @param {any} value - any - The value to check
 * @returns a boolean.
 */
export const isRGBString = (value: any): value is string => {
  const valid =
    /^(rgb)?a?\(?\W?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)?(0(\.\d+)?|1(\.0+)?)?\W?\)?)$/;
  return typeof value === "string" && valid.test(value);
};

/**
 * "If the value is a string and it matches the regular expression, then it's a hex color."
 *
 * The function isHex() takes a value of any type and returns true if the value is a string and it
 * matches the regular expression
 * @param {any} value - any - The value to check.
 * @returns true if the value is a string and matches the regex.
 */
export const isHex = (value: any): value is string => {
  const valid = /^#([0-9a-fA-F]{2}){3,4}$/;
  return typeof value === "string" && valid.test(value);
};

/**
 * It takes a string and returns an RGB object
 * @param {string} value - string - The string value to convert to RGB.
 * @returns An object with the following properties:
 *   r: number
 *   g: number
 *   b: number
 */
export const stringToRGB = (value: string): RGB => {
  if (!isRGBString(value))
    throw new Error("Input values must be a valid rgb string value.");
  const matches = value.match(/\d{1,3}/g) ?? ["0", "0", "0"];
  const rgbValues = matches.map((value, index) => {
    const num = parseInt(value);

    if (index === 3 && (num < 0 || num > 1))
      throw new Error(`Value out of range for an alpha value: ${value}.`);
    if ((num < 0 || num > 255) && index < 3)
      throw new Error(`Value out of range for an RGB value: ${value}.`);

    return num;
  });

  const alpha =
    rgbValues.length > 4
      ? rgbValues[4] / Math.pow(10, rgbValues[4].toString().length)
      : rgbValues.length === 4
      ? rgbValues[3]
      : undefined;

  return {
    r: rgbValues[0],
    b: rgbValues[1],
    g: rgbValues[2],
    a: alpha,
  };
};

/**
 * "If the input value is a valid hex color, return an RGB object with the red, green, and blue
 * values."
 *
 * The first thing we do is check if the input value is a valid hex color. If it's not, we throw an
 * error. If it is, we use a regular expression to extract the red, green, and blue values from the hex
 * color. We then return an RGB object with the red, green, and blue values
 * @param {string} value - string - The hex value to convert to RGB.
 * @returns An object with the following properties:
 *   r: number
 *   g: number
 *   b: number
 *   a: number | undefined
 */
export const hexToRGB = (value: string): RGB => {
  if (!isHex(value))
    throw new Error("Input values must be a valid Color Hex value.");
  const matches = value.match(/[0-9a-fA-F]{2}/g) ?? ["0", "0", "0"];
  const hexValues = matches.map((value, index) => {
    const num = index === 3 ? parseInt(value, 16) / 255 : parseInt(value, 16);
    if (index === 3 && (num < 0 || num > 1))
      throw new Error(`Value out of range for an alpha value: ${value}.`);
    else if (num < 0 || num > 255)
      throw new Error(`Value out of range for an RGB value: ${value}.`);

    return num;
  });

  return {
    r: hexValues[0],
    g: hexValues[1],
    b: hexValues[2],
    a: hexValues.length === 4 ? hexValues[3] : undefined,
  };
};

/**
 * It takes an array of numbers or strings, and returns an RGB object
 * @param {number[] | string[]} values - number[] | string[]
 * @returns An object with the properties r, g, b, and a.
 */
export const arrayToRGB = (values: number[] | string[]): RGB => {
  if (!(Array.isArray(values) && (values.length === 3 || values.length === 4)))
    throw new Error("Input values must be an array of length 3 or 4.");

  const validValues: number[] = values.map((value, index) => {
    let newValue = value;
    if (typeof newValue === "string") {
      newValue = index === 3 ? parseFloat(newValue) : parseInt(newValue);
      if (isNaN(newValue)) throw new Error(`Invalid value: ${value}.`);
    }
    if (index === 3 && (value < 0 || value > 1))
      throw new Error(`Value out of range for an alpha value: ${value}.`);
    else if (value < 0 || value > 255)
      throw new Error(`Value out of range for an RGB value: ${value}.`);
    return newValue;
  });

  return {
    r: validValues[0],
    g: validValues[1],
    b: validValues[2],
    a: validValues.length === 4 ? validValues[3] : undefined,
  };
};
