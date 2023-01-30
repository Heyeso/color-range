# Color Range  

![version](https://img.shields.io/npm/v/@heyeso/color-range) ![size](https://img.shields.io/bundlephobia/minzip/@heyeso/color-range) ![downloads](https://img.shields.io/npm/dw/@heyeso/color-range) ![license](https://img.shields.io/badge/license-MIT-green)

## Description

Color Range is a TypeScript library allows you to generate a percentage of mix between two colors within given a range. The provided range will determine the available midpoints, with each midpoint being a percentage of mix. It uses a linear interpolation algorithm to blend the two colors together, resulting in a smooth transition between the two.
The library provides a simple and easy-to-use API, allowing you to specify the colors and the range for the blend. It can be useful for creating color schemes, gradient backgrounds, and other design elements in web and graphic design projects. It also support different color format like RGB, RGBA, and HEX. With this library, you can easily create dynamic and visually striking designs with minimal code.

## Getting Started

### Dependencies

### Installing

* `npm i @heyeso/color-range`

### Usage  

#### `colorRange()`

```js
import { colorRange } from "@heyeso/color-range";

/**
 * Default colors for mapping.
 */
export const test_colors = [
    [255, 36, 0],
    [255, 0, 0],
  ];
/**
 * Default ranges for mapping.
 */
export const test_ranges = [0, 100];

const temperatureMap = colorRange(test_colors, test_ranges);
const temp1 = temperatureMap.getColor(50);

temp1?.rgb; // { r: 255, g: 18, b: 0 }
temp1?.toString(); // "rgb(255, 18, 0)"
temp1?.toHex(); // "#ff1200"
```

#### `createColor()`

```js
import { createColor } from "@heyeso/color-range";

const color = createColor([3, 40, 69]);
color.toString(); // "rgb(3, 40, 69)"
color.toHex(); // "#032845"
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Authors

Abdulsalam Odetayo  [@linkedIn](https://www.linkedin.com/in/abdulsalam-odetayo-87ba72202/)

## License

Distributed under the MIT License. See `LICENSE` for more information.

## References

* [How to convert RGBA to Hex color code using javascript](https://stackoverflow.com/a/49974627/14004547)
* [Mixing two colors "naturally" in javascript](https://stackoverflow.com/a/32171077/14004547)
* [Color and Temperature mapping](https://pin.it/5bV3fjK)
