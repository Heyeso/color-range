import {
  blendColorByRatio,
  colorRange,
  createColor,
  createMap,
} from "../color-range";
import { test_colors, test_ranges } from "./data";

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
    expect(color1.toHex).toEqual("#ff00ff");
  });

  it("should return rgb string of input color", () => {
    expect(color1.toString).toEqual(
      `rgb(${sampleColor.r}, ${sampleColor.g}, ${sampleColor.b})`
    );
  });
});

describe("createMap()", () => {
  const colorRangeMap = createMap(test_colors, test_ranges);

  it("should return an object of ColorRangeMap type", () => {
    expect(typeof colorRangeMap.colors[0].rgb === "object").toBe(true);
    expect(typeof colorRangeMap.colors[0].toHex === "string").toBe(true);
    expect(typeof colorRangeMap.colors[0].toString === "string").toBe(true);
    expect(typeof colorRangeMap.ranges[0] === "number").toBe(true);
  });

  it("should sort the ranges", () => {
    expect(colorRangeMap.ranges[0]).toEqual(-23);
  });
});

describe("blendColorByRatio()", () => {
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

describe("colorRange()", () => {
  const mapping1 = colorRange(test_colors, test_ranges);
  const colorRangeMap1 = createMap(test_colors, test_ranges);

  it("should map colors and range correctly", () => {
    expect(mapping1.map.ranges).toEqual(colorRangeMap1.ranges);
  });
  describe(".getColor()", () => {
    it("should pass edge cases", () => {
      expect(mapping1.getColor(-100)?.rgb).toEqual(
        colorRangeMap1.colors[0].rgb
      );
      expect(mapping1.getColor(100)?.rgb).toEqual(
        colorRangeMap1.colors[colorRangeMap1.colors.length - 1].rgb
      );
    });
  });
});
