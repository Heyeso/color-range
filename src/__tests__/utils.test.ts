import { RGB } from "../types";
import {
  channelToHex,
  createMap,
  blendColorByRatio,
  createColor,
  isRGB,
  isRGBString,
  isHex,
  stringToRGB,
  hexToRGB,
  arrayToRGB,
} from "./../utils";
import { test_colors, test_ranges } from "./data";

describe("percentageColorMixer()", () => {
  const color1 = createColor({
    r: test_colors[0][0],
    g: test_colors[0][1],
    b: test_colors[0][2],
  });

  const color2 = createColor({
    r: test_colors[1][0],
    g: test_colors[2][1],
    b: test_colors[3][2],
  });

  const color3 = blendColorByRatio(color1, color2, 0.5);

  it("should return a mix of 2 colors by 0.5", () => {
    expect(color3.rgb).toEqual({
      r: 236,
      g: 0,
      b: 255,
    });
  });
});

describe("createColor()", () => {
  const sampleColor = {
    r: test_colors[0][0],
    g: test_colors[0][1],
    b: test_colors[0][2],
  };
  const color1 = createColor(sampleColor);
  const color2 = createColor(test_colors[0]);

  it("should match both types of color creation", () => {
    expect(color1.rgb).toEqual(color2.rgb);
  });

  it("should match rgb of input color", () => {
    expect(color1.rgb).toEqual(sampleColor);
  });

  it("should return the hex of input color", () => {
    expect(color1.toHex()).toEqual("#ff00ff");
  });

  it("should return rgb string of input color", () => {
    expect(color1.toString()).toEqual(
      `rgb(${sampleColor.r}, ${sampleColor.g}, ${sampleColor.b})`
    );
  });
});

describe("channelToHex()", () => {
  const hex = channelToHex(test_colors[0][0]);

  it("should return the hexadecimal of the number", () => {
    expect(hex).toEqual("ff");
  });
});

describe("createMap()", () => {
  const colorRangeMap = createMap(test_colors, test_ranges);

  it("should return an object of ColorRangeMap type", () => {
    expect(typeof colorRangeMap.colors[0].rgb === "object").toBe(true);
    expect(typeof colorRangeMap.colors[0].toHex === "function").toBe(true);
    expect(typeof colorRangeMap.colors[0].toString === "function").toBe(true);
    expect(typeof colorRangeMap.ranges[0] === "number").toBe(true);
  });

  it("should sort the ranges", () => {
    expect(colorRangeMap.ranges[0]).toEqual(-23);
  });
});

describe("isRGB()", () => {
  const sampleColor = {
    r: test_colors[0][0],
    g: test_colors[0][1],
    b: test_colors[0][2],
  };

  const imposter = {
    r: test_colors[0][0],
    g: test_colors[0][1],
    z: test_colors[0][2],
  };

  const imposter1 = {
    r: "1",
    g: "2",
    b: "3",
  };

  it("should return true if it is RGB object type", () => {
    expect(isRGB(sampleColor)).toEqual(true);
  });

  it("should return false if it is not RGB object type", () => {
    expect(isRGB(imposter)).toEqual(false);
    expect(isRGB(imposter1)).toEqual(false);
    expect(isRGB("rgb(2, 3, 4)")).toEqual(false);
  });
});

describe("isRGBString()", () => {
  const sampleColors = [
    "rgb(255,255,255)",
    "rgb(255, 255, 255)",
    "rgb(0/0/0)",
    "rgb(50-50-50)",
    "rgb(0 - 0 - 0)",
    "rgb(255,0-50)",
    "rgb(0, 255 255)",
    "rgb( 0 0 0 )",
    "255,255,255",
    "255, 255, 0",
    "(0, 0, 30)",
    "(255 - 255 - 255)",
    "rgb0 0 0",
    "rgb255 - 0/255",
  ];
  it("should return true if it is an RGB string", () => {
    sampleColors.forEach((sampleColor) =>
      expect(isRGBString(sampleColor)).toEqual(true)
    );
  });

  it("should return false if it is not an RGB string", () => {
    expect(isRGBString({})).toEqual(false);
    expect(isRGBString("Hello World")).toEqual(false);
  });
});

describe("isHex()", () => {
  const sampleColors = [
    "#ffffff",
    "#012345",
    "#012abc",
    "#abc012",
    "#abcdef",
    "#000000",
  ];
  it("should return true if it is an Hex string", () => {
    sampleColors.forEach((sampleColor) =>
      expect(isHex(sampleColor)).toEqual(true)
    );
  });

  it("should return false if it is not an Hex string", () => {
    expect(isHex({})).toEqual(false);
    expect(isHex("Hello World")).toEqual(false);
    expect(isHex("#abdxyz")).toEqual(false);
  });
});

describe("stringToRGB()", () => {
  const sampleColorsString = [
    "rgb(255,255,255)",
    "rgb(255, 255, 255)",
    "rgb(255/255/255)",
    "rgb(255-255-255)",
    "rgb(255 - 255 - 255)",
    "rgb(255,255-255)",
    "rgb(255, 255 255)",
    "rgb( 255 255 255 )",
    "255,255,255",
    "255, 255, 255",
    "(255, 255, 255)",
    "(255 - 255 - 255)",
    "rgb255 255 255",
    "rgb255 - 255/255",
  ];

  const sampleColor: RGB = {
    r: 255,
    g: 255,
    b: 255,
  };

  it("should return RGB object with correct values", () => {
    sampleColorsString.forEach((sampleColorString) =>
      expect(stringToRGB(sampleColorString)).toEqual(sampleColor)
    );
  });

  it("should throw error if not a valid rgb string value", () => {
    try {
      stringToRGB("rgf(255, 255, 255)");
      stringToRGB("#abdxyz");
    } catch (e) {
      expect(e).toEqual(
        new Error("Input values must be a valid rgb string value.")
      );
    }
  });
});

describe("hexToRGB()", () => {
  const sampleColor: RGB = {
    r: 255,
    g: 255,
    b: 255,
  };

  it("should return RGB object with correct values", () => {
    expect(hexToRGB("#ffffff")).toEqual(sampleColor);
  });

  it("should throw error if not a valid hex string value", () => {
    try {
      hexToRGB("rgf(255, 255, 255)");
      hexToRGB("#abdxyz");
    } catch (e) {
      expect(e).toEqual(
        new Error("Input values must be a valid Color Hex value.")
      );
    }
  });
});

describe("arrayToRGB()", () => {
  const sampleColor: RGB = {
    r: 255,
    g: 255,
    b: 255,
  };

  it("should return RGB object with correct values", () => {
    expect(arrayToRGB([255, 255, 255])).toEqual(sampleColor);
    expect(arrayToRGB(["255", "255", "255"])).toEqual(sampleColor);
  });

  describe("should throw error if not a valid array of rgb values", () => {
    it("should return throw out of range error", () => {
      try {
        expect(arrayToRGB([1255, 255, 255])).toEqual(sampleColor);
      } catch (e) {
        expect(e).toEqual(
          new Error("Value out of range for an RGB value: 1255.")
        );
      }
    });

    it("should return throw invalid value error", () => {
      try {
        expect(arrayToRGB(["Hello", "255", "255"])).toEqual(sampleColor);
      } catch (e) {
        expect(e).toEqual(new Error("Invalid value: Hello."));
      }
    });

    it("should return throw array length error", () => {
      try {
        expect(arrayToRGB([255, 255, 255, 34])).toEqual(sampleColor);
      } catch (e) {
        expect(e).toEqual(
          new Error("Input values must be an array of length 3.")
        );
      }
    });
  });
});
