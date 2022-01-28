# Temperature Color  

![version](https://img.shields.io/npm/v/temperature-color) ![size](https://img.shields.io/bundlephobia/minzip/temperature-color) ![downloads](https://img.shields.io/npm/dw/temperature-color) ![license](https://img.shields.io/npm/l/temperature-color)

A function for generating colors associated with temperature within a range. [View Demo](https://temperaturecolor.web.app/)

## Description

Temperature Color is a function that generates a color associated with a temperature withing a range. The range is a mapping of checkpoint temperature numbers with a color, and is defined along with the function.

## Getting Started

### Dependencies

### Installing

* `npm i temperature-color`
* In your projects's `package.json` file, add
    ```
    {
        ...,
        "type": "module"
    }
    ```

### Usage  

```js
import TempColorMapping, { RGB } from 'temperature-color';

const Mapping = TempColorMapping(); // default mapping
const Example1 = Mapping.TemperatureToColor(30);
console.log(Example1); // returns RBG { r: 255, g: 14, b: 0 }
console.log(Example1.toString()); // returns "rgb(255, 14, 0)"
console.log(Example1.toHexString()); // returns "#ff0e00"

const colors = [
  [255, 0, 255],
  [128, 0, 128],
  [135, 206, 235],
  [255, 255, 0],
  [255, 36, 0],
  [139, 0, 0],
]; // [r, g, b]
const temperatures = [-7, -1, 4, 10, 16, 21]; // °C

const Mapping1 = TempColorMapping(colors, temperatures); // custom mapping
const Example2 = Mapping1.TemperatureToColor(3);
console.log(Example2); // returns RGB { r: 133, g: 164, b: 213 }
console.log(Example2.toString()); // returns "rgb(133, 164, 213)"
console.log(Example2.toHexString()); // returns "#85a4d5"

const Example3 = new RGB(3, 40, 69); // color in rgb format
console.log(Example3.totring()); // returns "rgb(3, 40, 69)"
console.log(Example3.toHexString()); // returns "#032845"
```

Default Mapping (°C) -  

![3b84d4f6ff48199229411d8ef5ce148c](https://user-images.githubusercontent.com/60695851/151463299-7c4973aa-1f57-48a9-9fe2-6451635dc60e.jpg)

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

## References

* [How to convert RGBA to Hex color code using javascript](https://stackoverflow.com/a/49974627/14004547)
* [Mixing two colors "naturally" in javascript](https://stackoverflow.com/a/32171077/14004547)
* [Color and Temperature mapping](https://pin.it/5bV3fjK)
* [Function Implementation Example](https://weathernowjs.web.app/)
