import colorMap, { createColor } from "./color-map";
import { test_colors, test_ranges } from "./tests/data";

const temperatureMap = colorMap(test_colors, test_ranges);
const temp1 = temperatureMap.getColor(30);
console.log(temperatureMap.map.ranges);
console.log(temp1?.rgb); // returns { r: 255, g: 22, b: 0 }
console.log(temp1?.toString()); // returns "rgb(255, 22, 0)"
console.log(temp1?.toHex()); // returns "#ff1600"

const color = createColor([3, 40, 69]);
console.log(color.toString()); // returns "rgb(3, 40, 69)"
console.log(color.toHex()); // returns "#032845"
