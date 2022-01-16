const TEMP_COLORS = [
  [139, 0, 0], //DARK_RED
  [255, 0, 0], //RED
  [255, 36, 0], //SCARLET
  [255, 215, 0], //ORANGE
  [255, 255, 0], //YELLOW
  [27, 142, 45], //RICH_GREEN
  [0, 255, 0], //GREEN
  [135, 206, 235], //SKY_BLUE
  [0, 0, 255], //BLUE
  [128, 0, 128], //PURPLE
  [217, 130, 181], //PINKY_PURPLE
  [255, 0, 255], //MAGENTA
];
const TEMP = [38, 32, 27, 21, 16, 10, 4, -1, -7, -12, -18, -23];
//colorChannelA and colorChannelB are ints ranging from 0 to 255
const colorChannelMixer = (colorChannelA, colorChannelB, amountToMix) => {
  var channelA = colorChannelA * amountToMix;
  var channelB = colorChannelB * (1 - amountToMix);
  return channelA + channelB;
};
//rgbA and rgbB are arrays, amountToMix ranges from 0.0 to 1.0
//example (red): rgbA = [255,0,0]
const colorMixer = (rgbA, rgbB, amountToMix, opacity) => {
  var r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix);
  var g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix);
  var b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix);
  return (
    "rgba(" +
    r.toFixed(0) +
    "," +
    g.toFixed(0) +
    "," +
    b.toFixed(0) +
    "," +
    opacity +
    ")"
  );
};

const TemperatureColorGenerator = (temp, opacity = 1) => {
  temp = parseFloat(temp);
  if (temp >= TEMP[0]) return `rgb(${TEMP_COLORS[0]}, ${opacity})`;
  if (temp <= TEMP[TEMP.length - 1])
    return `rgba(${TEMP_COLORS[TEMP.length - 1]}, ${opacity})`;
  for (let x = 0; x < TEMP.length - 1; x++) {
    if (TEMP[x] === temp) return `rgba(${TEMP_COLORS[x]}, ${opacity})`;

    if (temp < TEMP[x] && temp > TEMP[x + 1]) {
      let max = TEMP[x],
        min = TEMP[x + 1];
      let ratio = (temp - min) / (max - min);
      return colorMixer(TEMP_COLORS[x], TEMP_COLORS[x + 1], ratio, opacity);
    }
  }
  return `rgb(0,0,0,1)`;
};

const FahrenheitToCelsius = (value) => (((value - 32) * 5) / 9).toFixed(1);
const CelsiusToFahrenheit = (value) => ((value * 9) / 5 + 32).toFixed(1);

function rgba2hex(orig) {
  var a,
    isPercent,
    rgb = orig
      .replace(/\s/g, "")
      .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
    alpha = ((rgb && rgb[4]) || "").trim(),
    hex = rgb
      ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
        (rgb[2] | (1 << 8)).toString(16).slice(1) +
        (rgb[3] | (1 << 8)).toString(16).slice(1)
      : orig;

  if (alpha !== "") {
    a = alpha;
  } else {
    a = 01;
  }
  // multiply before convert to HEX
  a = ((a * 255) | (1 << 8)).toString(16).slice(1);
  hex = hex + a;

  return hex;
}

const $input = $("#input-temperature");
const $unit = $("#unit");
const $text = $("#text");
const DEFAULT_TEMPERATURE = 0;
const $bg = $("#temperature-bg");
const $copy = $(".icon");
let Celsius = true;

$(document).ready(function () {
  $input.attr("placeholder", `${DEFAULT_TEMPERATURE}`);
  $bg.css(
    "background-color",
    `${TemperatureColorGenerator(DEFAULT_TEMPERATURE, 0.7)}`
  );
  $unit.text("°C");
  $text.text(rgba2hex(TemperatureColorGenerator(DEFAULT_TEMPERATURE)));
});

const GetBG = () => {
  if (isNaN($input.val())) {
    $input.val("");
    $input.css("background-color", `rgba(255, 0, 0, 0.4)`);
    setTimeout(() => {
      $input.css("background-color", `rgba(255, 255, 255, 0.7)`);
    }, 500);
  } else {
    $input.attr(
      "placeholder",
      `${Celsius ? $input.val() : CelsiusToFahrenheit($input.val())}`
    );
    $bg.css(
      "background-color",
      `${TemperatureColorGenerator(
        Celsius ? $input.val() : FahrenheitToCelsius($input.val()),
        0.7
      )}`
    );
    $text.text(
      rgba2hex(
        TemperatureColorGenerator(
          Celsius ? $input.val() : FahrenheitToCelsius($input.val())
        )
      )
    );
  }
};
$input.focusout(() => {
  if ($input.val() !== "") GetBG();
});

$input.on("keypress", (e) => {
  if (e.which == 13) if ($input.val() !== "") GetBG();
});

$unit.click(() => {
  Celsius = !Celsius;
  $unit.text(Celsius ? "°C" : "°F");
  let temp = $input.val();
  if (temp === "") temp = $input.attr("placeholder");
  $input.val(
    `${Celsius ? FahrenheitToCelsius(temp) : CelsiusToFahrenheit(temp)}`
  );
  $input.attr(
    "placeholder",
    `${Celsius ? FahrenheitToCelsius(temp) : CelsiusToFahrenheit(temp)}`
  );
});

$copy.click(() => {
  navigator.clipboard.writeText($text.text());
  $(".copy #notification").fadeIn(300);
  setTimeout(() => {
    $(".copy #notification").fadeOut(300);
  }, 1500);
});
