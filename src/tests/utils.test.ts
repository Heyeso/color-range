import { createColor } from "../color-map";
import { channelToHex, createMap, blendColorByRatio } from "./../utils";
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
