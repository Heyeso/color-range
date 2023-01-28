import { createMap, createColor } from "../utils";
import colorRange from "../color-range";
import { test_colors, test_ranges } from "./data";

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
