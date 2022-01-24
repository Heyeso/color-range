# Temperature Color

A function for generating colors associated with temperature within a range.

## Description

Temperature Color is a function that generates a color associated with a temperature withing a range. [Function](https://github.com/Heyeso/TemperatureColor/blob/f3b43a83a948daa5a758872e0eda4b76afcd7a07/app.js#L41) takes in a temperature number and color opacity number, and returns a color in rgba format. [rgba2hex](https://github.com/Heyeso/TemperatureColor/blob/f3b43a83a948daa5a758872e0eda4b76afcd7a07/app.js#L62) can be used to convert rgba to hex. The range is a mapping of checkpoint temperature numbers with a color, and is defined along with the function. Reference [TEMP_COLORS](https://github.com/Heyeso/TemperatureColor/blob/f3b43a83a948daa5a758872e0eda4b76afcd7a07/app.js#L1) and [TEMP](https://github.com/Heyeso/TemperatureColor/blob/f3b43a83a948daa5a758872e0eda4b76afcd7a07/app.js#L15) for the mapping used in this project.

## Getting Started

### Dependencies

### Installing

* Copy `TEMP` (object), `TEMP_COLORS` (object), `colorMixer` (function) and `TemperatureColorGenerator` (function)
* Copy `rgba2hex` (function) to convert to hex

### Executing program

* Call `TemperatureColorGenerator(temperature, opacity?)` function.
* Call `rgba2hex(string)` and pass `TemperatureColorGenerator` return value as parameter to conver to hex.
```
//Example1
TemperatureColorGenerator(-3, 0.7) //returns rgba representation as a string.

//Example2.
rgba2hex(TemperatureColorGenerator(-3, 0.7)) //return hex representation as a string.
```

## Authors

Abdulsalam Odetayo  [@linkedIn](https://www.linkedin.com/in/abdulsalam-odetayo-87ba72202/)

## References

* [How to convert RGBA to Hex color code using javascript](https://stackoverflow.com/a/49974627/14004547)
* [Mixing two colors "naturally" in javascript](https://stackoverflow.com/a/32171077/14004547)
* [Color and Temperature mapping](https://pin.it/5bV3fjK)
