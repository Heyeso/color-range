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
export const rgbToString = (rgb: RGB): string => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

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
 */
export const toHex = (rgb: RGB): string =>
  `#${channelToHex(rgb.r)}${channelToHex(rgb.g)}${channelToHex(rgb.b)}`;

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
    /^(rgb)?\(?\W?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\W?\)?)$/;
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
  const valid = /^#[0-9a-fA-F]{6}$/;
  return typeof value === "string" && valid.test(value);
};

/**
 * It takes a string and returns an RGB object
 * @param {string} value - string - The string to convert to an RGB object.
 * @returns an RGB object.
 */
export const stringToRGB = (value: string): RGB => {
  if (!isRGBString(value))
    throw new Error("Input values must be a valid rgb string value.");
  const rgbValues = value.match(/\d{1,3}/g) ?? ["0", "0", "0"];
  return {
    r: parseInt(rgbValues[0]),
    b: parseInt(rgbValues[1]),
    g: parseInt(rgbValues[2]),
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
 * @returns An object with three properties: r, g, and b.
 */
export const hexToRGB = (value: string): RGB => {
  if (!isHex(value))
    throw new Error("Input values must be a valid Color Hex value.");
  const hexValues = value.match(/[0-9a-fA-F]{1,2}/g) ?? ["0", "0", "0"];
  return {
    r: parseInt(hexValues[0], 16),
    g: parseInt(hexValues[1], 16),
    b: parseInt(hexValues[2], 16),
  };
};

/**
 * It takes an array of three numbers or strings, and returns an RGB object
 * @param {number[] | string[]} values - number[] | string[]
 * @returns An object with three properties: r, g, and b.
 */
export const arrayToRGB = (values: number[] | string[]): RGB => {
  if (!(Array.isArray(values) && values.length === 3))
    throw new Error("Input values must be an array of length 3.");

  const validValues: number[] = values.map((value) => {
    let newValue = value;
    if (typeof newValue === "string") {
      newValue = parseInt(newValue);
      if (isNaN(newValue)) throw new Error(`Invalid value: ${value}.`);
    }
    if (value < 0 || value > 255)
      throw new Error(`Value out of range for an RGB value: ${value}.`);
    return newValue;
  });

  return { r: validValues[0], g: validValues[1], b: validValues[2] };
};
