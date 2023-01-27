# Color Map  

![version](https://img.shields.io/npm/v/@heyeso/color-map) ![size](https://img.shields.io/bundlephobia/minzip/@heyeso/color-map) ![downloads](https://img.shields.io/npm/dw/@heyeso/color-map) ![license](https://img.shields.io/npm/l/@heyeso/color-map)

## Description

color-map is a TypeScript library that allows developers to easily generate a wide range of colors within a specified interval of numbers. The library utilizes a unique mapping system that assigns specific colors to specific values, allowing for precise and consistent color generation. With color-map, developers can easily create color palettes for use in web and mobile applications, as well as in data visualization and graphic design projects. Whether you're a designer looking to create a cohesive color scheme or a developer building an interactive data visualization, color-map is the perfect tool for the job.

## Getting Started

### Dependencies

### Installing

* `npm i @heyeso/color-map --save-dev`
* In your projects's `package.json` file, add
    ```
    {
        ...,
        "type": "module"
    }
    ```

### Usage  

#### `colorMap()`

```js
import colorMap from "@heyeso/color-map";

/**
 * Default colors for mapping.
 */
export const test_colors = [
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
 * Default ranges for mapping.
 */
export const test_ranges = [-1, 4, 10, 16, 21, 27, 32, 38, -23, -18, -12, -7];

const temperatureMap = colorMap(test_colors, test_ranges);
const temp1 = temperatureMap.getColor(30);

temp1?.rgb; // { r: 255, g: 22, b: 0 }
temp1?.toString(); // "rgb(255, 22, 0)"
temp1?.toHex(); // "#ff1600"
```

#### `createColor()`

```js
import { createColor } from "@heyeso/color-map";

const color = createColor([3, 40, 69]);
color.toString(); // "rgb(3, 40, 69)"
color.toHex(); // "#032845"
```

## Sample Use

Sample use in projects.

![image](https://user-images.githubusercontent.com/60695851/150843912-84a696a6-a8e0-49db-b563-c71b7a93aadd.png)
![image](https://user-images.githubusercontent.com/60695851/150844051-da838947-10f7-4d8b-bbd2-f273cfcbd735.png)

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
