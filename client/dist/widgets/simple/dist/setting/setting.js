System.register(["jimu-core/react","jimu-ui","jimu-ui/advanced/setting-components"], function(__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {
	var __WEBPACK_EXTERNAL_MODULE_react__ = {};
	var __WEBPACK_EXTERNAL_MODULE_jimu_ui__ = {};
	var __WEBPACK_EXTERNAL_MODULE_jimu_ui_advanced_setting_components__ = {};
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_react__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_ui__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_jimu_ui_advanced_setting_components__, "__esModule", { value: true });
	return {
		setters: [
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_react__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_ui__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_jimu_ui_advanced_setting_components__[key] = module[key];
				});
			}
		],
		execute: function() {
			__WEBPACK_DYNAMIC_EXPORT__(
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@ant-design/colors/es/generate.js":
/*!********************************************************!*\
  !*** ./node_modules/@ant-design/colors/es/generate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ generate)
/* harmony export */ });
/* harmony import */ var _ctrl_tinycolor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ctrl/tinycolor */ "./node_modules/@ctrl/tinycolor/dist/module/conversion.js");
/* harmony import */ var _ctrl_tinycolor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ctrl/tinycolor */ "./node_modules/@ctrl/tinycolor/dist/module/format-input.js");

var hueStep = 2; // 色相阶梯
var saturationStep = 0.16; // 饱和度阶梯，浅色部分
var saturationStep2 = 0.05; // 饱和度阶梯，深色部分
var brightnessStep1 = 0.05; // 亮度阶梯，浅色部分
var brightnessStep2 = 0.15; // 亮度阶梯，深色部分
var lightColorCount = 5; // 浅色数量，主色上
var darkColorCount = 4; // 深色数量，主色下
// 暗色主题颜色映射关系表
var darkColorMap = [{
  index: 7,
  opacity: 0.15
}, {
  index: 6,
  opacity: 0.25
}, {
  index: 5,
  opacity: 0.3
}, {
  index: 5,
  opacity: 0.45
}, {
  index: 5,
  opacity: 0.65
}, {
  index: 5,
  opacity: 0.85
}, {
  index: 4,
  opacity: 0.9
}, {
  index: 3,
  opacity: 0.95
}, {
  index: 2,
  opacity: 0.97
}, {
  index: 1,
  opacity: 0.98
}];
// Wrapper function ported from TinyColor.prototype.toHsv
// Keep it here because of `hsv.h * 360`
function toHsv(_ref) {
  var r = _ref.r,
    g = _ref.g,
    b = _ref.b;
  var hsv = (0,_ctrl_tinycolor__WEBPACK_IMPORTED_MODULE_0__.rgbToHsv)(r, g, b);
  return {
    h: hsv.h * 360,
    s: hsv.s,
    v: hsv.v
  };
}

// Wrapper function ported from TinyColor.prototype.toHexString
// Keep it here because of the prefix `#`
function toHex(_ref2) {
  var r = _ref2.r,
    g = _ref2.g,
    b = _ref2.b;
  return "#".concat((0,_ctrl_tinycolor__WEBPACK_IMPORTED_MODULE_0__.rgbToHex)(r, g, b, false));
}

// Wrapper function ported from TinyColor.prototype.mix, not treeshakable.
// Amount in range [0, 1]
// Assume color1 & color2 has no alpha, since the following src code did so.
function mix(rgb1, rgb2, amount) {
  var p = amount / 100;
  var rgb = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b
  };
  return rgb;
}
function getHue(hsv, i, light) {
  var hue;
  // 根据色相不同，色相转向不同
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return hue;
}
function getSaturation(hsv, i, light) {
  // grey color don't change saturation
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  var saturation;
  if (light) {
    saturation = hsv.s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i;
  }
  // 边界值修正
  if (saturation > 1) {
    saturation = 1;
  }
  // 第一格的 s 限制在 0.06-0.1 之间
  if (light && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  return Number(saturation.toFixed(2));
}
function getValue(hsv, i, light) {
  var value;
  if (light) {
    value = hsv.v + brightnessStep1 * i;
  } else {
    value = hsv.v - brightnessStep2 * i;
  }
  if (value > 1) {
    value = 1;
  }
  return Number(value.toFixed(2));
}
function generate(color) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var patterns = [];
  var pColor = (0,_ctrl_tinycolor__WEBPACK_IMPORTED_MODULE_1__.inputToRGB)(color);
  for (var i = lightColorCount; i > 0; i -= 1) {
    var hsv = toHsv(pColor);
    var colorString = toHex((0,_ctrl_tinycolor__WEBPACK_IMPORTED_MODULE_1__.inputToRGB)({
      h: getHue(hsv, i, true),
      s: getSaturation(hsv, i, true),
      v: getValue(hsv, i, true)
    }));
    patterns.push(colorString);
  }
  patterns.push(toHex(pColor));
  for (var _i = 1; _i <= darkColorCount; _i += 1) {
    var _hsv = toHsv(pColor);
    var _colorString = toHex((0,_ctrl_tinycolor__WEBPACK_IMPORTED_MODULE_1__.inputToRGB)({
      h: getHue(_hsv, _i),
      s: getSaturation(_hsv, _i),
      v: getValue(_hsv, _i)
    }));
    patterns.push(_colorString);
  }

  // dark theme patterns
  if (opts.theme === 'dark') {
    return darkColorMap.map(function (_ref3) {
      var index = _ref3.index,
        opacity = _ref3.opacity;
      var darkColorString = toHex(mix((0,_ctrl_tinycolor__WEBPACK_IMPORTED_MODULE_1__.inputToRGB)(opts.backgroundColor || '#141414'), (0,_ctrl_tinycolor__WEBPACK_IMPORTED_MODULE_1__.inputToRGB)(patterns[index]), opacity * 100));
      return darkColorString;
    });
  }
  return patterns;
}

/***/ }),

/***/ "./node_modules/@ant-design/colors/es/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@ant-design/colors/es/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blue: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.blue),
/* harmony export */   blueDark: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.blueDark),
/* harmony export */   cyan: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.cyan),
/* harmony export */   cyanDark: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.cyanDark),
/* harmony export */   geekblue: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.geekblue),
/* harmony export */   geekblueDark: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.geekblueDark),
/* harmony export */   generate: () => (/* reexport safe */ _generate__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   gold: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.gold),
/* harmony export */   goldDark: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.goldDark),
/* harmony export */   gray: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.gray),
/* harmony export */   green: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.green),
/* harmony export */   greenDark: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.greenDark),
/* harmony export */   grey: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.grey),
/* harmony export */   greyDark: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.greyDark),
/* harmony export */   lime: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.lime),
/* harmony export */   limeDark: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.limeDark),
/* harmony export */   magenta: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.magenta),
/* harmony export */   magentaDark: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.magentaDark),
/* harmony export */   orange: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.orange),
/* harmony export */   orangeDark: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.orangeDark),
/* harmony export */   presetDarkPalettes: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.presetDarkPalettes),
/* harmony export */   presetPalettes: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.presetPalettes),
/* harmony export */   presetPrimaryColors: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.presetPrimaryColors),
/* harmony export */   purple: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.purple),
/* harmony export */   purpleDark: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.purpleDark),
/* harmony export */   red: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.red),
/* harmony export */   redDark: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.redDark),
/* harmony export */   volcano: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.volcano),
/* harmony export */   volcanoDark: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.volcanoDark),
/* harmony export */   yellow: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.yellow),
/* harmony export */   yellowDark: () => (/* reexport safe */ _presets__WEBPACK_IMPORTED_MODULE_1__.yellowDark)
/* harmony export */ });
/* harmony import */ var _generate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generate */ "./node_modules/@ant-design/colors/es/generate.js");
/* harmony import */ var _presets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presets */ "./node_modules/@ant-design/colors/es/presets.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./node_modules/@ant-design/colors/es/types.js");




/***/ }),

/***/ "./node_modules/@ant-design/colors/es/presets.js":
/*!*******************************************************!*\
  !*** ./node_modules/@ant-design/colors/es/presets.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blue: () => (/* binding */ blue),
/* harmony export */   blueDark: () => (/* binding */ blueDark),
/* harmony export */   cyan: () => (/* binding */ cyan),
/* harmony export */   cyanDark: () => (/* binding */ cyanDark),
/* harmony export */   geekblue: () => (/* binding */ geekblue),
/* harmony export */   geekblueDark: () => (/* binding */ geekblueDark),
/* harmony export */   gold: () => (/* binding */ gold),
/* harmony export */   goldDark: () => (/* binding */ goldDark),
/* harmony export */   gray: () => (/* binding */ gray),
/* harmony export */   green: () => (/* binding */ green),
/* harmony export */   greenDark: () => (/* binding */ greenDark),
/* harmony export */   grey: () => (/* binding */ grey),
/* harmony export */   greyDark: () => (/* binding */ greyDark),
/* harmony export */   lime: () => (/* binding */ lime),
/* harmony export */   limeDark: () => (/* binding */ limeDark),
/* harmony export */   magenta: () => (/* binding */ magenta),
/* harmony export */   magentaDark: () => (/* binding */ magentaDark),
/* harmony export */   orange: () => (/* binding */ orange),
/* harmony export */   orangeDark: () => (/* binding */ orangeDark),
/* harmony export */   presetDarkPalettes: () => (/* binding */ presetDarkPalettes),
/* harmony export */   presetPalettes: () => (/* binding */ presetPalettes),
/* harmony export */   presetPrimaryColors: () => (/* binding */ presetPrimaryColors),
/* harmony export */   purple: () => (/* binding */ purple),
/* harmony export */   purpleDark: () => (/* binding */ purpleDark),
/* harmony export */   red: () => (/* binding */ red),
/* harmony export */   redDark: () => (/* binding */ redDark),
/* harmony export */   volcano: () => (/* binding */ volcano),
/* harmony export */   volcanoDark: () => (/* binding */ volcanoDark),
/* harmony export */   yellow: () => (/* binding */ yellow),
/* harmony export */   yellowDark: () => (/* binding */ yellowDark)
/* harmony export */ });
// Generated by script. Do NOT modify!

var presetPrimaryColors = {
  "red": "#F5222D",
  "volcano": "#FA541C",
  "orange": "#FA8C16",
  "gold": "#FAAD14",
  "yellow": "#FADB14",
  "lime": "#A0D911",
  "green": "#52C41A",
  "cyan": "#13C2C2",
  "blue": "#1677FF",
  "geekblue": "#2F54EB",
  "purple": "#722ED1",
  "magenta": "#EB2F96",
  "grey": "#666666"
};
var red = ["#fff1f0", "#ffccc7", "#ffa39e", "#ff7875", "#ff4d4f", "#f5222d", "#cf1322", "#a8071a", "#820014", "#5c0011"];
red.primary = red[5];
var volcano = ["#fff2e8", "#ffd8bf", "#ffbb96", "#ff9c6e", "#ff7a45", "#fa541c", "#d4380d", "#ad2102", "#871400", "#610b00"];
volcano.primary = volcano[5];
var orange = ["#fff7e6", "#ffe7ba", "#ffd591", "#ffc069", "#ffa940", "#fa8c16", "#d46b08", "#ad4e00", "#873800", "#612500"];
orange.primary = orange[5];
var gold = ["#fffbe6", "#fff1b8", "#ffe58f", "#ffd666", "#ffc53d", "#faad14", "#d48806", "#ad6800", "#874d00", "#613400"];
gold.primary = gold[5];
var yellow = ["#feffe6", "#ffffb8", "#fffb8f", "#fff566", "#ffec3d", "#fadb14", "#d4b106", "#ad8b00", "#876800", "#614700"];
yellow.primary = yellow[5];
var lime = ["#fcffe6", "#f4ffb8", "#eaff8f", "#d3f261", "#bae637", "#a0d911", "#7cb305", "#5b8c00", "#3f6600", "#254000"];
lime.primary = lime[5];
var green = ["#f6ffed", "#d9f7be", "#b7eb8f", "#95de64", "#73d13d", "#52c41a", "#389e0d", "#237804", "#135200", "#092b00"];
green.primary = green[5];
var cyan = ["#e6fffb", "#b5f5ec", "#87e8de", "#5cdbd3", "#36cfc9", "#13c2c2", "#08979c", "#006d75", "#00474f", "#002329"];
cyan.primary = cyan[5];
var blue = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
blue.primary = blue[5];
var geekblue = ["#f0f5ff", "#d6e4ff", "#adc6ff", "#85a5ff", "#597ef7", "#2f54eb", "#1d39c4", "#10239e", "#061178", "#030852"];
geekblue.primary = geekblue[5];
var purple = ["#f9f0ff", "#efdbff", "#d3adf7", "#b37feb", "#9254de", "#722ed1", "#531dab", "#391085", "#22075e", "#120338"];
purple.primary = purple[5];
var magenta = ["#fff0f6", "#ffd6e7", "#ffadd2", "#ff85c0", "#f759ab", "#eb2f96", "#c41d7f", "#9e1068", "#780650", "#520339"];
magenta.primary = magenta[5];
var grey = ["#a6a6a6", "#999999", "#8c8c8c", "#808080", "#737373", "#666666", "#404040", "#1a1a1a", "#000000", "#000000"];
grey.primary = grey[5];
var gray = grey;
var presetPalettes = {
  red: red,
  volcano: volcano,
  orange: orange,
  gold: gold,
  yellow: yellow,
  lime: lime,
  green: green,
  cyan: cyan,
  blue: blue,
  geekblue: geekblue,
  purple: purple,
  magenta: magenta,
  grey: grey
};
var redDark = ["#2a1215", "#431418", "#58181c", "#791a1f", "#a61d24", "#d32029", "#e84749", "#f37370", "#f89f9a", "#fac8c3"];
redDark.primary = redDark[5];
var volcanoDark = ["#2b1611", "#441d12", "#592716", "#7c3118", "#aa3e19", "#d84a1b", "#e87040", "#f3956a", "#f8b692", "#fad4bc"];
volcanoDark.primary = volcanoDark[5];
var orangeDark = ["#2b1d11", "#442a11", "#593815", "#7c4a15", "#aa6215", "#d87a16", "#e89a3c", "#f3b765", "#f8cf8d", "#fae3b7"];
orangeDark.primary = orangeDark[5];
var goldDark = ["#2b2111", "#443111", "#594214", "#7c5914", "#aa7714", "#d89614", "#e8b339", "#f3cc62", "#f8df8b", "#faedb5"];
goldDark.primary = goldDark[5];
var yellowDark = ["#2b2611", "#443b11", "#595014", "#7c6e14", "#aa9514", "#d8bd14", "#e8d639", "#f3ea62", "#f8f48b", "#fafab5"];
yellowDark.primary = yellowDark[5];
var limeDark = ["#1f2611", "#2e3c10", "#3e4f13", "#536d13", "#6f9412", "#8bbb11", "#a9d134", "#c9e75d", "#e4f88b", "#f0fab5"];
limeDark.primary = limeDark[5];
var greenDark = ["#162312", "#1d3712", "#274916", "#306317", "#3c8618", "#49aa19", "#6abe39", "#8fd460", "#b2e58b", "#d5f2bb"];
greenDark.primary = greenDark[5];
var cyanDark = ["#112123", "#113536", "#144848", "#146262", "#138585", "#13a8a8", "#33bcb7", "#58d1c9", "#84e2d8", "#b2f1e8"];
cyanDark.primary = cyanDark[5];
var blueDark = ["#111a2c", "#112545", "#15325b", "#15417e", "#1554ad", "#1668dc", "#3c89e8", "#65a9f3", "#8dc5f8", "#b7dcfa"];
blueDark.primary = blueDark[5];
var geekblueDark = ["#131629", "#161d40", "#1c2755", "#203175", "#263ea0", "#2b4acb", "#5273e0", "#7f9ef3", "#a8c1f8", "#d2e0fa"];
geekblueDark.primary = geekblueDark[5];
var purpleDark = ["#1a1325", "#24163a", "#301c4d", "#3e2069", "#51258f", "#642ab5", "#854eca", "#ab7ae0", "#cda8f0", "#ebd7fa"];
purpleDark.primary = purpleDark[5];
var magentaDark = ["#291321", "#40162f", "#551c3b", "#75204f", "#a02669", "#cb2b83", "#e0529c", "#f37fb7", "#f8a8cc", "#fad2e3"];
magentaDark.primary = magentaDark[5];
var greyDark = ["#151515", "#1f1f1f", "#2d2d2d", "#393939", "#494949", "#5a5a5a", "#6a6a6a", "#7b7b7b", "#888888", "#969696"];
greyDark.primary = greyDark[5];
var presetDarkPalettes = {
  red: redDark,
  volcano: volcanoDark,
  orange: orangeDark,
  gold: goldDark,
  yellow: yellowDark,
  lime: limeDark,
  green: greenDark,
  cyan: cyanDark,
  blue: blueDark,
  geekblue: geekblueDark,
  purple: purpleDark,
  magenta: magentaDark,
  grey: greyDark
};

/***/ }),

/***/ "./node_modules/@ant-design/colors/es/types.js":
/*!*****************************************************!*\
  !*** ./node_modules/@ant-design/colors/es/types.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./node_modules/@ant-design/icons-svg/es/asn/CloseOutlined.js":
/*!********************************************************************!*\
  !*** ./node_modules/@ant-design/icons-svg/es/asn/CloseOutlined.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// This icon file is generated automatically.
var CloseOutlined = { "icon": { "tag": "svg", "attrs": { "fill-rule": "evenodd", "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z" } }] }, "name": "close", "theme": "outlined" };
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CloseOutlined);


/***/ }),

/***/ "./node_modules/@ant-design/icons/es/components/AntdIcon.js":
/*!******************************************************************!*\
  !*** ./node_modules/@ant-design/icons/es/components/AntdIcon.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ant_design_colors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ant-design/colors */ "./node_modules/@ant-design/colors/es/index.js");
/* harmony import */ var _Context__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Context */ "./node_modules/@ant-design/icons/es/components/Context.js");
/* harmony import */ var _IconBase__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./IconBase */ "./node_modules/@ant-design/icons/es/components/IconBase.js");
/* harmony import */ var _twoTonePrimaryColor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./twoTonePrimaryColor */ "./node_modules/@ant-design/icons/es/components/twoTonePrimaryColor.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils */ "./node_modules/@ant-design/icons/es/utils.js");
'use client';





var _excluded = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];







// Initial setting
// should move it to antd main repo?
(0,_twoTonePrimaryColor__WEBPACK_IMPORTED_MODULE_7__.setTwoToneColor)(_ant_design_colors__WEBPACK_IMPORTED_MODULE_6__.blue.primary);

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757#issuecomment-488848720

var Icon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.forwardRef(function (props, ref) {
  var className = props.className,
    icon = props.icon,
    spin = props.spin,
    rotate = props.rotate,
    tabIndex = props.tabIndex,
    onClick = props.onClick,
    twoToneColor = props.twoToneColor,
    restProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__["default"])(props, _excluded);
  var _React$useContext = react__WEBPACK_IMPORTED_MODULE_4__.useContext(_Context__WEBPACK_IMPORTED_MODULE_8__["default"]),
    _React$useContext$pre = _React$useContext.prefixCls,
    prefixCls = _React$useContext$pre === void 0 ? 'anticon' : _React$useContext$pre,
    rootClassName = _React$useContext.rootClassName;
  var classString = classnames__WEBPACK_IMPORTED_MODULE_5___default()(rootClassName, prefixCls, (0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])({}, "".concat(prefixCls, "-").concat(icon.name), !!icon.name), "".concat(prefixCls, "-spin"), !!spin || icon.name === 'loading'), className);
  var iconTabIndex = tabIndex;
  if (iconTabIndex === undefined && onClick) {
    iconTabIndex = -1;
  }
  var svgStyle = rotate ? {
    msTransform: "rotate(".concat(rotate, "deg)"),
    transform: "rotate(".concat(rotate, "deg)")
  } : undefined;
  var _normalizeTwoToneColo = (0,_utils__WEBPACK_IMPORTED_MODULE_9__.normalizeTwoToneColors)(twoToneColor),
    _normalizeTwoToneColo2 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_normalizeTwoToneColo, 2),
    primaryColor = _normalizeTwoToneColo2[0],
    secondaryColor = _normalizeTwoToneColo2[1];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement("span", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    role: "img",
    "aria-label": icon.name
  }, restProps, {
    ref: ref,
    tabIndex: iconTabIndex,
    onClick: onClick,
    className: classString
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(_IconBase__WEBPACK_IMPORTED_MODULE_10__["default"], {
    icon: icon,
    primaryColor: primaryColor,
    secondaryColor: secondaryColor,
    style: svgStyle
  }));
});
Icon.displayName = 'AntdIcon';
Icon.getTwoToneColor = _twoTonePrimaryColor__WEBPACK_IMPORTED_MODULE_7__.getTwoToneColor;
Icon.setTwoToneColor = _twoTonePrimaryColor__WEBPACK_IMPORTED_MODULE_7__.setTwoToneColor;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Icon);

/***/ }),

/***/ "./node_modules/@ant-design/icons/es/components/Context.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@ant-design/icons/es/components/Context.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

var IconContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IconContext);

/***/ }),

/***/ "./node_modules/@ant-design/icons/es/components/IconBase.js":
/*!******************************************************************!*\
  !*** ./node_modules/@ant-design/icons/es/components/IconBase.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutProperties */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectSpread2 */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./node_modules/@ant-design/icons/es/utils.js");


var _excluded = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"];


var twoToneColorPalette = {
  primaryColor: '#333',
  secondaryColor: '#E6E6E6',
  calculated: false
};
function setTwoToneColors(_ref) {
  var primaryColor = _ref.primaryColor,
    secondaryColor = _ref.secondaryColor;
  twoToneColorPalette.primaryColor = primaryColor;
  twoToneColorPalette.secondaryColor = secondaryColor || (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getSecondaryColor)(primaryColor);
  twoToneColorPalette.calculated = !!secondaryColor;
}
function getTwoToneColors() {
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({}, twoToneColorPalette);
}
var IconBase = function IconBase(props) {
  var icon = props.icon,
    className = props.className,
    onClick = props.onClick,
    style = props.style,
    primaryColor = props.primaryColor,
    secondaryColor = props.secondaryColor,
    restProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(props, _excluded);
  var svgRef = react__WEBPACK_IMPORTED_MODULE_2__.useRef();
  var colors = twoToneColorPalette;
  if (primaryColor) {
    colors = {
      primaryColor: primaryColor,
      secondaryColor: secondaryColor || (0,_utils__WEBPACK_IMPORTED_MODULE_3__.getSecondaryColor)(primaryColor)
    };
  }
  (0,_utils__WEBPACK_IMPORTED_MODULE_3__.useInsertStyles)(svgRef);
  (0,_utils__WEBPACK_IMPORTED_MODULE_3__.warning)((0,_utils__WEBPACK_IMPORTED_MODULE_3__.isIconDefinition)(icon), "icon should be icon definiton, but got ".concat(icon));
  if (!(0,_utils__WEBPACK_IMPORTED_MODULE_3__.isIconDefinition)(icon)) {
    return null;
  }
  var target = icon;
  if (target && typeof target.icon === 'function') {
    target = (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({}, target), {}, {
      icon: target.icon(colors.primaryColor, colors.secondaryColor)
    });
  }
  return (0,_utils__WEBPACK_IMPORTED_MODULE_3__.generate)(target.icon, "svg-".concat(target.name), (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({
    className: className,
    onClick: onClick,
    style: style,
    'data-icon': target.name,
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    'aria-hidden': 'true'
  }, restProps), {}, {
    ref: svgRef
  }));
};
IconBase.displayName = 'IconReact';
IconBase.getTwoToneColors = getTwoToneColors;
IconBase.setTwoToneColors = setTwoToneColors;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IconBase);

/***/ }),

/***/ "./node_modules/@ant-design/icons/es/components/twoTonePrimaryColor.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@ant-design/icons/es/components/twoTonePrimaryColor.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTwoToneColor: () => (/* binding */ getTwoToneColor),
/* harmony export */   setTwoToneColor: () => (/* binding */ setTwoToneColor)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _IconBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IconBase */ "./node_modules/@ant-design/icons/es/components/IconBase.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./node_modules/@ant-design/icons/es/utils.js");



function setTwoToneColor(twoToneColor) {
  var _normalizeTwoToneColo = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.normalizeTwoToneColors)(twoToneColor),
    _normalizeTwoToneColo2 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_normalizeTwoToneColo, 2),
    primaryColor = _normalizeTwoToneColo2[0],
    secondaryColor = _normalizeTwoToneColo2[1];
  return _IconBase__WEBPACK_IMPORTED_MODULE_2__["default"].setTwoToneColors({
    primaryColor: primaryColor,
    secondaryColor: secondaryColor
  });
}
function getTwoToneColor() {
  var colors = _IconBase__WEBPACK_IMPORTED_MODULE_2__["default"].getTwoToneColors();
  if (!colors.calculated) {
    return colors.primaryColor;
  }
  return [colors.primaryColor, colors.secondaryColor];
}

/***/ }),

/***/ "./node_modules/@ant-design/icons/es/icons/CloseOutlined.js":
/*!******************************************************************!*\
  !*** ./node_modules/@ant-design/icons/es/icons/CloseOutlined.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _ant_design_icons_svg_es_asn_CloseOutlined__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons-svg/es/asn/CloseOutlined */ "./node_modules/@ant-design/icons-svg/es/asn/CloseOutlined.js");
/* harmony import */ var _components_AntdIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/AntdIcon */ "./node_modules/@ant-design/icons/es/components/AntdIcon.js");

// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY




var CloseOutlined = function CloseOutlined(props, ref) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_components_AntdIcon__WEBPACK_IMPORTED_MODULE_2__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    icon: _ant_design_icons_svg_es_asn_CloseOutlined__WEBPACK_IMPORTED_MODULE_3__["default"]
  }));
};

/**![close](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNjYWNhY2EiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iNjQgNjQgODk2IDg5NiIgZm9jdXNhYmxlPSJmYWxzZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNzk5Ljg2IDE2Ni4zMWMuMDIgMCAuMDQuMDIuMDguMDZsNTcuNjkgNTcuN2MuMDQuMDMuMDUuMDUuMDYuMDhhLjEyLjEyIDAgMDEwIC4wNmMwIC4wMy0uMDIuMDUtLjA2LjA5TDU2OS45MyA1MTJsMjg3LjcgMjg3LjdjLjA0LjA0LjA1LjA2LjA2LjA5YS4xMi4xMiAwIDAxMCAuMDdjMCAuMDItLjAyLjA0LS4wNi4wOGwtNTcuNyA1Ny42OWMtLjAzLjA0LS4wNS4wNS0uMDcuMDZhLjEyLjEyIDAgMDEtLjA3IDBjLS4wMyAwLS4wNS0uMDItLjA5LS4wNkw1MTIgNTY5LjkzbC0yODcuNyAyODcuN2MtLjA0LjA0LS4wNi4wNS0uMDkuMDZhLjEyLjEyIDAgMDEtLjA3IDBjLS4wMiAwLS4wNC0uMDItLjA4LS4wNmwtNTcuNjktNTcuN2MtLjA0LS4wMy0uMDUtLjA1LS4wNi0uMDdhLjEyLjEyIDAgMDEwLS4wN2MwLS4wMy4wMi0uMDUuMDYtLjA5TDQ1NC4wNyA1MTJsLTI4Ny43LTI4Ny43Yy0uMDQtLjA0LS4wNS0uMDYtLjA2LS4wOWEuMTIuMTIgMCAwMTAtLjA3YzAtLjAyLjAyLS4wNC4wNi0uMDhsNTcuNy01Ny42OWMuMDMtLjA0LjA1LS4wNS4wNy0uMDZhLjEyLjEyIDAgMDEuMDcgMGMuMDMgMCAuMDUuMDIuMDkuMDZMNTEyIDQ1NC4wN2wyODcuNy0yODcuN2MuMDQtLjA0LjA2LS4wNS4wOS0uMDZhLjEyLjEyIDAgMDEuMDcgMHoiIC8+PC9zdmc+) */
var RefIcon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(CloseOutlined);
if (true) {
  RefIcon.displayName = 'CloseOutlined';
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RefIcon);

/***/ }),

/***/ "./node_modules/@ant-design/icons/es/utils.js":
/*!****************************************************!*\
  !*** ./node_modules/@ant-design/icons/es/utils.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generate: () => (/* binding */ generate),
/* harmony export */   getSecondaryColor: () => (/* binding */ getSecondaryColor),
/* harmony export */   iconStyles: () => (/* binding */ iconStyles),
/* harmony export */   isIconDefinition: () => (/* binding */ isIconDefinition),
/* harmony export */   normalizeAttrs: () => (/* binding */ normalizeAttrs),
/* harmony export */   normalizeTwoToneColors: () => (/* binding */ normalizeTwoToneColors),
/* harmony export */   svgBaseProps: () => (/* binding */ svgBaseProps),
/* harmony export */   useInsertStyles: () => (/* binding */ useInsertStyles),
/* harmony export */   warning: () => (/* binding */ warning)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectSpread2 */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/typeof */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _ant_design_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ant-design/colors */ "./node_modules/@ant-design/colors/es/index.js");
/* harmony import */ var rc_util_es_Dom_dynamicCSS__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rc-util/es/Dom/dynamicCSS */ "./node_modules/rc-util/es/Dom/dynamicCSS.js");
/* harmony import */ var rc_util_es_Dom_shadow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rc-util/es/Dom/shadow */ "./node_modules/rc-util/es/Dom/shadow.js");
/* harmony import */ var rc_util_es_warning__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rc-util/es/warning */ "./node_modules/rc-util/es/warning.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _components_Context__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/Context */ "./node_modules/@ant-design/icons/es/components/Context.js");








function camelCase(input) {
  return input.replace(/-(.)/g, function (match, g) {
    return g.toUpperCase();
  });
}
function warning(valid, message) {
  (0,rc_util_es_warning__WEBPACK_IMPORTED_MODULE_5__["default"])(valid, "[@ant-design/icons] ".concat(message));
}
function isIconDefinition(target) {
  return (0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(target) === 'object' && typeof target.name === 'string' && typeof target.theme === 'string' && ((0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(target.icon) === 'object' || typeof target.icon === 'function');
}
function normalizeAttrs() {
  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(attrs).reduce(function (acc, key) {
    var val = attrs[key];
    switch (key) {
      case 'class':
        acc.className = val;
        delete acc.class;
        break;
      default:
        delete acc[key];
        acc[camelCase(key)] = val;
    }
    return acc;
  }, {});
}
function generate(node, key, rootProps) {
  if (!rootProps) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement(node.tag, (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
      key: key
    }, normalizeAttrs(node.attrs)), (node.children || []).map(function (child, index) {
      return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
    }));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["default"].createElement(node.tag, (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({
    key: key
  }, normalizeAttrs(node.attrs)), rootProps), (node.children || []).map(function (child, index) {
    return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
  }));
}
function getSecondaryColor(primaryColor) {
  // choose the second color
  return (0,_ant_design_colors__WEBPACK_IMPORTED_MODULE_2__.generate)(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
  if (!twoToneColor) {
    return [];
  }
  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
}

// These props make sure that the SVG behaviours like general text.
// Reference: https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
var svgBaseProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  'aria-hidden': 'true',
  focusable: 'false'
};
var iconStyles = "\n.anticon {\n  display: inline-flex;\n  align-items: center;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
var useInsertStyles = function useInsertStyles(eleRef) {
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_6__.useContext)(_components_Context__WEBPACK_IMPORTED_MODULE_7__["default"]),
    csp = _useContext.csp,
    prefixCls = _useContext.prefixCls;
  var mergedStyleStr = iconStyles;
  if (prefixCls) {
    mergedStyleStr = mergedStyleStr.replace(/anticon/g, prefixCls);
  }
  (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(function () {
    var ele = eleRef.current;
    var shadowRoot = (0,rc_util_es_Dom_shadow__WEBPACK_IMPORTED_MODULE_4__.getShadowRoot)(ele);
    (0,rc_util_es_Dom_dynamicCSS__WEBPACK_IMPORTED_MODULE_3__.updateCSS)(mergedStyleStr, '@ant-design-icons', {
      prepend: true,
      csp: csp,
      attachTo: shadowRoot
    });
  }, []);
};

/***/ }),

/***/ "./node_modules/@ctrl/tinycolor/dist/module/conversion.js":
/*!****************************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/conversion.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertDecimalToHex: () => (/* binding */ convertDecimalToHex),
/* harmony export */   convertHexToDecimal: () => (/* binding */ convertHexToDecimal),
/* harmony export */   hslToRgb: () => (/* binding */ hslToRgb),
/* harmony export */   hsvToRgb: () => (/* binding */ hsvToRgb),
/* harmony export */   numberInputToObject: () => (/* binding */ numberInputToObject),
/* harmony export */   parseIntFromHex: () => (/* binding */ parseIntFromHex),
/* harmony export */   rgbToHex: () => (/* binding */ rgbToHex),
/* harmony export */   rgbToHsl: () => (/* binding */ rgbToHsl),
/* harmony export */   rgbToHsv: () => (/* binding */ rgbToHsv),
/* harmony export */   rgbToRgb: () => (/* binding */ rgbToRgb),
/* harmony export */   rgbaToArgbHex: () => (/* binding */ rgbaToArgbHex),
/* harmony export */   rgbaToHex: () => (/* binding */ rgbaToHex)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./node_modules/@ctrl/tinycolor/dist/module/util.js");

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
/**
 * Handle bounds / percentage checking to conform to CSS color spec
 * <http://www.w3.org/TR/css3-color/>
 * *Assumes:* r, g, b in [0, 255] or [0, 1]
 * *Returns:* { r, g, b } in [0, 255]
 */
function rgbToRgb(r, g, b) {
    return {
        r: (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.bound01)(r, 255) * 255,
        g: (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.bound01)(g, 255) * 255,
        b: (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.bound01)(b, 255) * 255,
    };
}
/**
 * Converts an RGB color value to HSL.
 * *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
 * *Returns:* { h, s, l } in [0,1]
 */
function rgbToHsl(r, g, b) {
    r = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.bound01)(r, 255);
    g = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.bound01)(g, 255);
    b = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.bound01)(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;
    if (max === min) {
        s = 0;
        h = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, l: l };
}
function hue2rgb(p, q, t) {
    if (t < 0) {
        t += 1;
    }
    if (t > 1) {
        t -= 1;
    }
    if (t < 1 / 6) {
        return p + (q - p) * (6 * t);
    }
    if (t < 1 / 2) {
        return q;
    }
    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
}
/**
 * Converts an HSL color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    h = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.bound01)(h, 360);
    s = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.bound01)(s, 100);
    l = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.bound01)(l, 100);
    if (s === 0) {
        // achromatic
        g = l;
        b = l;
        r = l;
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color value to HSV
 *
 * *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
 * *Returns:* { h, s, v } in [0,1]
 */
function rgbToHsv(r, g, b) {
    r = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.bound01)(r, 255);
    g = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.bound01)(g, 255);
    b = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.bound01)(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var v = max;
    var d = max - min;
    var s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0; // achromatic
    }
    else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}
/**
 * Converts an HSV color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hsvToRgb(h, s, v) {
    h = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.bound01)(h, 360) * 6;
    s = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.bound01)(s, 100);
    v = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.bound01)(v, 100);
    var i = Math.floor(h);
    var f = h - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    var mod = i % 6;
    var r = [v, q, p, p, t, v][mod];
    var g = [t, v, v, q, p, p][mod];
    var b = [p, p, t, v, v, q][mod];
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color to hex
 *
 * Assumes r, g, and b are contained in the set [0, 255]
 * Returns a 3 or 6 character hex
 */
function rgbToHex(r, g, b, allow3Char) {
    var hex = [
        (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(r).toString(16)),
        (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(g).toString(16)),
        (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(b).toString(16)),
    ];
    // Return a 3 character hex if possible
    if (allow3Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join('');
}
/**
 * Converts an RGBA color plus alpha transparency to hex
 *
 * Assumes r, g, b are contained in the set [0, 255] and
 * a in [0, 1]. Returns a 4 or 8 character rgba hex
 */
// eslint-disable-next-line max-params
function rgbaToHex(r, g, b, a, allow4Char) {
    var hex = [
        (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(r).toString(16)),
        (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(g).toString(16)),
        (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(b).toString(16)),
        (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.pad2)(convertDecimalToHex(a)),
    ];
    // Return a 4 character hex if possible
    if (allow4Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1)) &&
        hex[3].startsWith(hex[3].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }
    return hex.join('');
}
/**
 * Converts an RGBA color to an ARGB Hex8 string
 * Rarely used, but required for "toFilter()"
 */
function rgbaToArgbHex(r, g, b, a) {
    var hex = [
        (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.pad2)(convertDecimalToHex(a)),
        (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(r).toString(16)),
        (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(g).toString(16)),
        (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.pad2)(Math.round(b).toString(16)),
    ];
    return hex.join('');
}
/** Converts a decimal to a hex value */
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
/** Converts a hex value to a decimal */
function convertHexToDecimal(h) {
    return parseIntFromHex(h) / 255;
}
/** Parse a base-16 hex value into a base-10 integer */
function parseIntFromHex(val) {
    return parseInt(val, 16);
}
function numberInputToObject(color) {
    return {
        r: color >> 16,
        g: (color & 0xff00) >> 8,
        b: color & 0xff,
    };
}


/***/ }),

/***/ "./node_modules/@ctrl/tinycolor/dist/module/css-color-names.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/css-color-names.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   names: () => (/* binding */ names)
/* harmony export */ });
// https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json
/**
 * @hidden
 */
var names = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    goldenrod: '#daa520',
    gold: '#ffd700',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavenderblush: '#fff0f5',
    lavender: '#e6e6fa',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
};


/***/ }),

/***/ "./node_modules/@ctrl/tinycolor/dist/module/format-input.js":
/*!******************************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/format-input.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   inputToRGB: () => (/* binding */ inputToRGB),
/* harmony export */   isValidCSSUnit: () => (/* binding */ isValidCSSUnit),
/* harmony export */   stringInputToObject: () => (/* binding */ stringInputToObject)
/* harmony export */ });
/* harmony import */ var _conversion_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conversion.js */ "./node_modules/@ctrl/tinycolor/dist/module/conversion.js");
/* harmony import */ var _css_color_names_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css-color-names.js */ "./node_modules/@ctrl/tinycolor/dist/module/css-color-names.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./node_modules/@ctrl/tinycolor/dist/module/util.js");
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */



/**
 * Given a string or object, convert that input to RGB
 *
 * Possible string inputs:
 * ```
 * "red"
 * "#f00" or "f00"
 * "#ff0000" or "ff0000"
 * "#ff000000" or "ff000000"
 * "rgb 255 0 0" or "rgb (255, 0, 0)"
 * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
 * "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
 * "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
 * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
 * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
 * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
 * ```
 */
function inputToRGB(color) {
    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;
    if (typeof color === 'string') {
        color = stringInputToObject(color);
    }
    if (typeof color === 'object') {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = (0,_conversion_js__WEBPACK_IMPORTED_MODULE_0__.rgbToRgb)(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.convertToPercentage)(color.s);
            v = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.convertToPercentage)(color.v);
            rgb = (0,_conversion_js__WEBPACK_IMPORTED_MODULE_0__.hsvToRgb)(color.h, s, v);
            ok = true;
            format = 'hsv';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.convertToPercentage)(color.s);
            l = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.convertToPercentage)(color.l);
            rgb = (0,_conversion_js__WEBPACK_IMPORTED_MODULE_0__.hslToRgb)(color.h, s, l);
            ok = true;
            format = 'hsl';
        }
        if (Object.prototype.hasOwnProperty.call(color, 'a')) {
            a = color.a;
        }
    }
    a = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.boundAlpha)(a);
    return {
        ok: ok,
        format: color.format || format,
        r: Math.min(255, Math.max(rgb.r, 0)),
        g: Math.min(255, Math.max(rgb.g, 0)),
        b: Math.min(255, Math.max(rgb.b, 0)),
        a: a,
    };
}
// <http://www.w3.org/TR/css3-values/#integers>
var CSS_INTEGER = '[-\\+]?\\d+%?';
// <http://www.w3.org/TR/css3-values/#number-value>
var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
// Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
// Actual matching.
// Parentheses and commas are optional, but not required.
// Whitespace can take the place of commas or opening paren
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
    rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
    hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
    hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
    hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
    hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
};
/**
 * Permissive string parsing.  Take in a number of formats, and output an object
 * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
 */
function stringInputToObject(color) {
    color = color.trim().toLowerCase();
    if (color.length === 0) {
        return false;
    }
    var named = false;
    if (_css_color_names_js__WEBPACK_IMPORTED_MODULE_2__.names[color]) {
        color = _css_color_names_js__WEBPACK_IMPORTED_MODULE_2__.names[color];
        named = true;
    }
    else if (color === 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: 'name' };
    }
    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match = matchers.rgb.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    match = matchers.rgba.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    match = matchers.hsl.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    match = matchers.hsla.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    match = matchers.hsv.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    match = matchers.hsva.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    match = matchers.hex8.exec(color);
    if (match) {
        return {
            r: (0,_conversion_js__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[1]),
            g: (0,_conversion_js__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[2]),
            b: (0,_conversion_js__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[3]),
            a: (0,_conversion_js__WEBPACK_IMPORTED_MODULE_0__.convertHexToDecimal)(match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex6.exec(color);
    if (match) {
        return {
            r: (0,_conversion_js__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[1]),
            g: (0,_conversion_js__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[2]),
            b: (0,_conversion_js__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    match = matchers.hex4.exec(color);
    if (match) {
        return {
            r: (0,_conversion_js__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[1] + match[1]),
            g: (0,_conversion_js__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[2] + match[2]),
            b: (0,_conversion_js__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[3] + match[3]),
            a: (0,_conversion_js__WEBPACK_IMPORTED_MODULE_0__.convertHexToDecimal)(match[4] + match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex3.exec(color);
    if (match) {
        return {
            r: (0,_conversion_js__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[1] + match[1]),
            g: (0,_conversion_js__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[2] + match[2]),
            b: (0,_conversion_js__WEBPACK_IMPORTED_MODULE_0__.parseIntFromHex)(match[3] + match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    return false;
}
/**
 * Check to see if it looks like a CSS unit
 * (see `matchers` above for definition).
 */
function isValidCSSUnit(color) {
    return Boolean(matchers.CSS_UNIT.exec(String(color)));
}


/***/ }),

/***/ "./node_modules/@ctrl/tinycolor/dist/module/util.js":
/*!**********************************************************!*\
  !*** ./node_modules/@ctrl/tinycolor/dist/module/util.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bound01: () => (/* binding */ bound01),
/* harmony export */   boundAlpha: () => (/* binding */ boundAlpha),
/* harmony export */   clamp01: () => (/* binding */ clamp01),
/* harmony export */   convertToPercentage: () => (/* binding */ convertToPercentage),
/* harmony export */   isOnePointZero: () => (/* binding */ isOnePointZero),
/* harmony export */   isPercentage: () => (/* binding */ isPercentage),
/* harmony export */   pad2: () => (/* binding */ pad2)
/* harmony export */ });
/**
 * Take input from [0, n] and return it as [0, 1]
 * @hidden
 */
function bound01(n, max) {
    if (isOnePointZero(n)) {
        n = '100%';
    }
    var isPercent = isPercentage(n);
    n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
    // Automatically convert percentage into number
    if (isPercent) {
        n = parseInt(String(n * max), 10) / 100;
    }
    // Handle floating point rounding errors
    if (Math.abs(n - max) < 0.000001) {
        return 1;
    }
    // Convert into [0, 1] range if it isn't already
    if (max === 360) {
        // If n is a hue given in degrees,
        // wrap around out-of-range values into [0, 360] range
        // then convert into [0, 1].
        n = (n < 0 ? (n % max) + max : n % max) / parseFloat(String(max));
    }
    else {
        // If n not a hue given in degrees
        // Convert into [0, 1] range if it isn't already.
        n = (n % max) / parseFloat(String(max));
    }
    return n;
}
/**
 * Force a number between 0 and 1
 * @hidden
 */
function clamp01(val) {
    return Math.min(1, Math.max(0, val));
}
/**
 * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
 * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
 * @hidden
 */
function isOnePointZero(n) {
    return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
}
/**
 * Check to see if string passed in is a percentage
 * @hidden
 */
function isPercentage(n) {
    return typeof n === 'string' && n.indexOf('%') !== -1;
}
/**
 * Return a valid alpha value [0,1] with all invalid values being set to 1
 * @hidden
 */
function boundAlpha(a) {
    a = parseFloat(a);
    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }
    return a;
}
/**
 * Replace a decimal with it's percentage value
 * @hidden
 */
function convertToPercentage(n) {
    if (n <= 1) {
        return "".concat(Number(n) * 100, "%");
    }
    return n;
}
/**
 * Force a hex value to have 2 characters
 * @hidden
 */
function pad2(c) {
    return c.length === 1 ? '0' + c : String(c);
}


/***/ }),

/***/ "./node_modules/rc-util/es/Dom/canUseDom.js":
/*!**************************************************!*\
  !*** ./node_modules/rc-util/es/Dom/canUseDom.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ canUseDom)
/* harmony export */ });
function canUseDom() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

/***/ }),

/***/ "./node_modules/rc-util/es/Dom/contains.js":
/*!*************************************************!*\
  !*** ./node_modules/rc-util/es/Dom/contains.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ contains)
/* harmony export */ });
function contains(root, n) {
  if (!root) {
    return false;
  }

  // Use native if support
  if (root.contains) {
    return root.contains(n);
  }

  // `document.contains` not support with IE11
  var node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

/***/ }),

/***/ "./node_modules/rc-util/es/Dom/dynamicCSS.js":
/*!***************************************************!*\
  !*** ./node_modules/rc-util/es/Dom/dynamicCSS.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearContainerCache: () => (/* binding */ clearContainerCache),
/* harmony export */   injectCSS: () => (/* binding */ injectCSS),
/* harmony export */   removeCSS: () => (/* binding */ removeCSS),
/* harmony export */   updateCSS: () => (/* binding */ updateCSS)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectSpread2 */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _canUseDom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canUseDom */ "./node_modules/rc-util/es/Dom/canUseDom.js");
/* harmony import */ var _contains__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contains */ "./node_modules/rc-util/es/Dom/contains.js");



var APPEND_ORDER = 'data-rc-order';
var APPEND_PRIORITY = 'data-rc-priority';
var MARK_KEY = "rc-util-key";
var containerCache = new Map();
function getMark() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    mark = _ref.mark;
  if (mark) {
    return mark.startsWith('data-') ? mark : "data-".concat(mark);
  }
  return MARK_KEY;
}
function getContainer(option) {
  if (option.attachTo) {
    return option.attachTo;
  }
  var head = document.querySelector('head');
  return head || document.body;
}
function getOrder(prepend) {
  if (prepend === 'queue') {
    return 'prependQueue';
  }
  return prepend ? 'prepend' : 'append';
}

/**
 * Find style which inject by rc-util
 */
function findStyles(container) {
  return Array.from((containerCache.get(container) || container).children).filter(function (node) {
    return node.tagName === 'STYLE';
  });
}
function injectCSS(css) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!(0,_canUseDom__WEBPACK_IMPORTED_MODULE_1__["default"])()) {
    return null;
  }
  var csp = option.csp,
    prepend = option.prepend,
    _option$priority = option.priority,
    priority = _option$priority === void 0 ? 0 : _option$priority;
  var mergedOrder = getOrder(prepend);
  var isPrependQueue = mergedOrder === 'prependQueue';
  var styleNode = document.createElement('style');
  styleNode.setAttribute(APPEND_ORDER, mergedOrder);
  if (isPrependQueue && priority) {
    styleNode.setAttribute(APPEND_PRIORITY, "".concat(priority));
  }
  if (csp !== null && csp !== void 0 && csp.nonce) {
    styleNode.nonce = csp === null || csp === void 0 ? void 0 : csp.nonce;
  }
  styleNode.innerHTML = css;
  var container = getContainer(option);
  var firstChild = container.firstChild;
  if (prepend) {
    // If is queue `prepend`, it will prepend first style and then append rest style
    if (isPrependQueue) {
      var existStyle = (option.styles || findStyles(container)).filter(function (node) {
        // Ignore style which not injected by rc-util with prepend
        if (!['prepend', 'prependQueue'].includes(node.getAttribute(APPEND_ORDER))) {
          return false;
        }

        // Ignore style which priority less then new style
        var nodePriority = Number(node.getAttribute(APPEND_PRIORITY) || 0);
        return priority >= nodePriority;
      });
      if (existStyle.length) {
        container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
        return styleNode;
      }
    }

    // Use `insertBefore` as `prepend`
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }
  return styleNode;
}
function findExistNode(key) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var container = getContainer(option);
  return (option.styles || findStyles(container)).find(function (node) {
    return node.getAttribute(getMark(option)) === key;
  });
}
function removeCSS(key) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var existNode = findExistNode(key, option);
  if (existNode) {
    var container = getContainer(option);
    container.removeChild(existNode);
  }
}

/**
 * qiankun will inject `appendChild` to insert into other
 */
function syncRealContainer(container, option) {
  var cachedRealContainer = containerCache.get(container);

  // Find real container when not cached or cached container removed
  if (!cachedRealContainer || !(0,_contains__WEBPACK_IMPORTED_MODULE_2__["default"])(document, cachedRealContainer)) {
    var placeholderStyle = injectCSS('', option);
    var parentNode = placeholderStyle.parentNode;
    containerCache.set(container, parentNode);
    container.removeChild(placeholderStyle);
  }
}

/**
 * manually clear container cache to avoid global cache in unit testes
 */
function clearContainerCache() {
  containerCache.clear();
}
function updateCSS(css, key) {
  var originOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var container = getContainer(originOption);
  var styles = findStyles(container);
  var option = (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__["default"])({}, originOption), {}, {
    styles: styles
  });

  // Sync real parent
  syncRealContainer(container, option);
  var existNode = findExistNode(key, option);
  if (existNode) {
    var _option$csp, _option$csp2;
    if ((_option$csp = option.csp) !== null && _option$csp !== void 0 && _option$csp.nonce && existNode.nonce !== ((_option$csp2 = option.csp) === null || _option$csp2 === void 0 ? void 0 : _option$csp2.nonce)) {
      var _option$csp3;
      existNode.nonce = (_option$csp3 = option.csp) === null || _option$csp3 === void 0 ? void 0 : _option$csp3.nonce;
    }
    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }
    return existNode;
  }
  var newNode = injectCSS(css, option);
  newNode.setAttribute(getMark(option), key);
  return newNode;
}

/***/ }),

/***/ "./node_modules/rc-util/es/Dom/shadow.js":
/*!***********************************************!*\
  !*** ./node_modules/rc-util/es/Dom/shadow.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getShadowRoot: () => (/* binding */ getShadowRoot),
/* harmony export */   inShadow: () => (/* binding */ inShadow)
/* harmony export */ });
function getRoot(ele) {
  var _ele$getRootNode;
  return ele === null || ele === void 0 || (_ele$getRootNode = ele.getRootNode) === null || _ele$getRootNode === void 0 ? void 0 : _ele$getRootNode.call(ele);
}

/**
 * Check if is in shadowRoot
 */
function inShadow(ele) {
  return getRoot(ele) instanceof ShadowRoot;
}

/**
 * Return shadowRoot if possible
 */
function getShadowRoot(ele) {
  return inShadow(ele) ? getRoot(ele) : null;
}

/***/ }),

/***/ "./node_modules/rc-util/es/warning.js":
/*!********************************************!*\
  !*** ./node_modules/rc-util/es/warning.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   call: () => (/* binding */ call),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   note: () => (/* binding */ note),
/* harmony export */   noteOnce: () => (/* binding */ noteOnce),
/* harmony export */   preMessage: () => (/* binding */ preMessage),
/* harmony export */   resetWarned: () => (/* binding */ resetWarned),
/* harmony export */   warning: () => (/* binding */ warning),
/* harmony export */   warningOnce: () => (/* binding */ warningOnce)
/* harmony export */ });
/* eslint-disable no-console */
var warned = {};
var preWarningFns = [];

/**
 * Pre warning enable you to parse content before console.error.
 * Modify to null will prevent warning.
 */
var preMessage = function preMessage(fn) {
  preWarningFns.push(fn);
};

/**
 * Warning if condition not match.
 * @param valid Condition
 * @param message Warning message
 * @example
 * ```js
 * warning(false, 'some error'); // print some error
 * warning(true, 'some error'); // print nothing
 * warning(1 === 2, 'some error'); // print some error
 * ```
 */
function warning(valid, message) {
  if ( true && !valid && console !== undefined) {
    var finalMessage = preWarningFns.reduce(function (msg, preMessageFn) {
      return preMessageFn(msg !== null && msg !== void 0 ? msg : '', 'warning');
    }, message);
    if (finalMessage) {
      console.error("Warning: ".concat(finalMessage));
    }
  }
}

/** @see Similar to {@link warning} */
function note(valid, message) {
  if ( true && !valid && console !== undefined) {
    var finalMessage = preWarningFns.reduce(function (msg, preMessageFn) {
      return preMessageFn(msg !== null && msg !== void 0 ? msg : '', 'note');
    }, message);
    if (finalMessage) {
      console.warn("Note: ".concat(finalMessage));
    }
  }
}
function resetWarned() {
  warned = {};
}
function call(method, valid, message) {
  if (!valid && !warned[message]) {
    method(false, message);
    warned[message] = true;
  }
}

/** @see Same as {@link warning}, but only warn once for the same message */
function warningOnce(valid, message) {
  call(warning, valid, message);
}

/** @see Same as {@link warning}, but only warn once for the same message */
function noteOnce(valid, message) {
  call(note, valid, message);
}
warningOnce.preMessage = preMessage;
warningOnce.resetWarned = resetWarned;
warningOnce.noteOnce = noteOnce;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (warningOnce);

/***/ }),

/***/ "react":
/*!**********************************!*\
  !*** external "jimu-core/react" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "jimu-ui":
/*!**************************!*\
  !*** external "jimu-ui" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_ui__;

/***/ }),

/***/ "jimu-ui/advanced/setting-components":
/*!******************************************************!*\
  !*** external "jimu-ui/advanced/setting-components" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_ui_advanced_setting_components__;

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}


/***/ }),

/***/ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithHoles)
/* harmony export */ });
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}


/***/ }),

/***/ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperty(e, r, t) {
  return (r = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}


/***/ }),

/***/ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/extends.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}


/***/ }),

/***/ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArrayLimit)
/* harmony export */ });
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}


/***/ }),

/***/ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableRest)
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}


/***/ }),

/***/ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/objectSpread2.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/objectSpread2.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _objectSpread2)
/* harmony export */ });
/* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defineProperty.js */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/defineProperty.js");

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      (0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}


/***/ }),

/***/ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _objectWithoutProperties)
/* harmony export */ });
/* harmony import */ var _objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objectWithoutPropertiesLoose.js */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = (0,_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}


/***/ }),

/***/ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _objectWithoutPropertiesLoose)
/* harmony export */ });
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}


/***/ }),

/***/ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _slicedToArray)
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(r, e) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(r, e) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(r, e) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}


/***/ }),

/***/ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPrimitive)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/typeof.js");

function toPrimitive(t, r) {
  if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}


/***/ }),

/***/ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPropertyKey)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function toPropertyKey(t) {
  var i = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(t, "string");
  return "symbol" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i) ? i : i + "";
}


/***/ }),

/***/ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}


/***/ }),

/***/ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@ant-design/icons/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r, a) : void 0;
  }
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperty(obj, key, value) {
  key = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _objectSpread2)
/* harmony export */ });
/* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defineProperty.js */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      (0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPrimitive)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

function toPrimitive(t, r) {
  if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPropertyKey)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function toPropertyKey(t) {
  var i = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(t, "string");
  return "symbol" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i) ? i : String(i);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!******************************************!*\
  !*** ./jimu-core/lib/set-public-path.ts ***!
  \******************************************/
/**
 * Webpack will replace __webpack_public_path__ with __webpack_require__.p to set the public path dynamically.
 * The reason why we can't set the publicPath in webpack config is: we change the publicPath when download.
 * */
// eslint-disable-next-line
// @ts-ignore
__webpack_require__.p = window.jimuConfig.baseUrl;

})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!****************************************************************!*\
  !*** ./your-extensions/widgets/simple/src/setting/setting.tsx ***!
  \****************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __set_webpack_public_path__: () => (/* binding */ __set_webpack_public_path__),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var jimu_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jimu-ui */ "jimu-ui");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/CloseOutlined.js");
/* harmony import */ var jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jimu-ui/advanced/setting-components */ "jimu-ui/advanced/setting-components");
// import { React } from 'jimu-core'
// import { AllWidgetSettingProps } from 'jimu-for-builder'
// import {
//   MapWidgetSelector,
//   SettingSection,
//   SettingRow
// } from "jimu-ui/advanced/setting-components";
// // import defaultMessages from "./translations/default";
// const Setting = (props: AllWidgetSettingProps<any>) => {
//   const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
//     props.onSettingChange({
//       id: props.id,
//       useMapWidgetIds: useMapWidgetIds
//     })
//   }
//   return (
//     <div className="widget-setting-demo">
//       <MapWidgetSelector
//         useMapWidgetIds={props.useMapWidgetIds}
//         onSelect={onMapWidgetSelected}
//       />
//     </div>
//   )
// }
// // export default Setting
// import React, { useState, useEffect } from 'react';
// import { AllWidgetSettingProps } from 'jimu-for-builder';
// import { Button, Input, Label } from 'jimu-ui';
// import { CloseOutlined } from '@ant-design/icons';
// import {
//   SettingSection,
//   SettingRow
// } from 'jimu-ui/advanced/setting-components';
// const Setting = (props: AllWidgetSettingProps<any>) => {
//   // const [urllst, setUrllst] = useState([]);
//   // const [urlInput, setUrlInput] = useState('');
//   // const [labelInput, setLabelInput] = useState('');
//   // const [yngage, setyngage] = useState('');
//   // const [oldage, setoldage] = useState('');
//   // useEffect(() => {
//   //   // Fetch the initial data from the server
//   //   fetch('http://localhost:8000/data')
//   //     .then(response => response.json())
//   //     .then(data => setUrllst(data["url"]))
//   //     .catch(error => console.error('Error fetching data:', error));
//   // }, []);
//   const [urllst, setUrllst] = useState([]);
//   const [urlInput, setUrlInput] = useState('');
//   const [labelInput, setLabelInput] = useState('');
//   const [yngage, setyngage] = useState('');
//   const [oldage, setoldage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchError, setFetchError] = useState(null);
//   useEffect(() => {
//     setIsLoading(true);   
//     fetch('http://localhost:8000/data')
//       .then(response => response.json())
//       .then(data =>{
//         console.log(data)
//         localStorage.setItem('urllist', JSON.stringify(data));
//         setUrllst(data)
//       } ) // Assuming the 'url' property in the response
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setFetchError(error);
//       })
//       .finally(() => setIsLoading(false));
//   }, []);
//   const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUrlInput(event.target.value);
//   };
//   const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setLabelInput(event.target.value);
//   };
//   const handleyngChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setyngage(event.target.value);
//   };
//   const handleoldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setoldage(event.target.value);
//   };
//   const handleAddUrl = () => {
//     if (urlInput && labelInput) {
//       const newUrls = [...urllst, { label: labelInput, url: urlInput ,  Young_age_field:yngage,
//         old_age_field:oldage}];
//       setUrllst(newUrls);
//       setUrlInput('');
//       setLabelInput('');
//       // Save to localStorage and send to server
//       // localStorage.setItem("urllst", JSON.stringify(newUrls));
//       fetch('http://localhost:8000/write', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newUrls),
//       }).catch(error => console.error('Error posting data:', error));
//     }
//   };
//   const handleRemove = (urlToRemove: string) => {
//     const updatedUrls = urllst.filter(url => url.url !== urlToRemove);
//     setUrllst(updatedUrls);
//     // localStorage.setItem("urllst", JSON.stringify(updatedUrls));
//     // // Optionally, you could also post the updated list to the server
//     fetch('http://localhost:8000/write', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedUrls),
//     }).catch(error => console.error('Error posting data:', error));
//   };
//   return (
//     <div className="widget-setting-demo">
//       <SettingSection
//         className="url-list-section"
//         title="Manage URLs"
//       >
//         <SettingRow>
//           <div className="url-inputs">
//             <Label>URL:</Label>
//             <Input
//               placeholder="Enter URL"
//               value={urlInput}
//               onChange={handleUrlChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Label>Label:</Label>
//             <Input
//               placeholder="Enter label"
//               value={labelInput}
//               onChange={handleLabelChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Label>young age field:</Label>
//             <Input
//               placeholder="young age field"
//               value={yngage}
//               onChange={handleyngChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Label>old age field:</Label>
//             <Input
//               placeholder="old age field"
//               value={oldage}
//               onChange={handleoldChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Button
//               type="primary"
//               onClick={handleAddUrl}
//               disabled={!urlInput || !labelInput}
//             >
//               Add URL
//             </Button>
//           </div>
//         </SettingRow>
//         <SettingRow>
//           <div className="url-buttons">
//             {urllst.map((urlEntry) => (
//               <div key={urlEntry.url} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
//                 <Button
//                   type="default"
//                   style={{ marginRight: '10px' }}
//                 >
//                   {urlEntry.label || 'No Label'}
//                 </Button>
//                 <Button
//                   type="tertiary"
//                   onClick={() => handleRemove(urlEntry.url)}
//                 >
//                   <CloseOutlined />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </SettingRow>
//       </SettingSection>
//     </div>
//   );
// };
// export default Setting;
// import React, { useState, useEffect } from 'react';
// import { AllWidgetSettingProps } from 'jimu-for-builder';
// import { Button, Input, Label } from 'jimu-ui';
// import { CloseOutlined } from '@ant-design/icons';
// import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components';
// const Setting = (props: AllWidgetSettingProps<any>) => {
//   const [urllst, setUrllst] = useState([]);
//   const [urlInput, setUrlInput] = useState('');
//   const [labelInput, setLabelInput] = useState('');
//   const [yngage, setyngage] = useState('');
//   const [oldage, setoldage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchError, setFetchError] = useState(null);
//   const [selectedValue, setSelectedValue] = useState('');
//   const [options, setOptions] = useState([]);
//   useEffect(() => {
//     setIsLoading(true);
//     const storedOptions = JSON.parse(localStorage.getItem('urllst')) || [];
//     console.log(storedOptions);
//     setOptions(storedOptions);
//     fetch('http://localhost:8000/data')
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         setUrllst(data);
//         props.onSettingChange({
//           id: props.id,
//           config: props.config.set('urllst', data)
//         });
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setFetchError(error);
//       })
//       .finally(() => setIsLoading(false));
//   }, []);
//   const handleDropdownChange = (event) => {
//     setSelectedValue(event.target.value);
//   };
//   const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUrlInput(event.target.value);
//   };
//   const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setLabelInput(event.target.value);
//   };
//   const handleyngChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setyngage(event.target.value);
//   };
//   const handleoldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setoldage(event.target.value);
//   };
//   const handleAddUrl = () => {
//     if (urlInput && labelInput) {
//       const newUrls = [...urllst, { label: labelInput, url: urlInput, Young_age_field: yngage, old_age_field: oldage }];
//       setUrllst(newUrls);
//       setUrlInput('');
//       setLabelInput('');
//       props.onSettingChange({
//         id: props.id,
//         config: props.config.set('urllst', newUrls)
//       });
//       console.log(newUrls)
//       fetch('http://localhost:8000/write', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newUrls),
//       }).catch(error => console.error('Error posting data:', error));
//     }
//   };
//   const handleRemove = (urlToRemove: string) => {
//     const updatedUrls = urllst.filter(url => url.url !== urlToRemove);
//     setUrllst(updatedUrls);
//     props.onSettingChange({
//       id: props.id,
//       config: props.config.set('urllst', updatedUrls)
//     });
//     fetch('http://localhost:8000/write', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedUrls),
//     }).catch(error => console.error('Error posting data:', error));
//   };
//   return (
//     <div className="widget-setting-demo">
//       <SettingSection className="url-list-section" title="Manage URLs">
//         <SettingRow>
//           <div className="url-inputs">
//             <Label>URL:</Label>
//             <Input
//               placeholder="Enter URL"
//               value={urlInput}
//               onChange={handleUrlChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Label>Label:</Label>
//             <Input
//               placeholder="Enter label"
//               value={labelInput}
//               onChange={handleLabelChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Label>young age field:</Label>
//             <Input
//               placeholder="young age field"
//               value={yngage}
//               onChange={handleyngChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Label>old age field:</Label>
//             <Input
//               placeholder="old age field"
//               value={oldage}
//               onChange={handleoldChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Button
//               type="primary"
//               onClick={handleAddUrl}
//               disabled={!urlInput || !labelInput}
//             >
//               Add URL
//             </Button>
//           </div>
//         </SettingRow>
//         <SettingRow>
//           <div className="url-buttons">
//             {urllst.map((urlEntry) => (
//               <div key={urlEntry.url} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
//                 <Button type="default" style={{ marginRight: '10px' }}>
//                   {urlEntry.label || 'No Label'}
//                 </Button>
//                 <Button type="tertiary" onClick={() => handleRemove(urlEntry.url)}>
//                   <CloseOutlined />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </SettingRow>
//       </SettingSection>
//     </div>
//   );
// };
// export default Setting;
// import React, { useState, useEffect } from 'react';
// import { AllWidgetSettingProps } from 'jimu-for-builder';
// import { Button, Input, Label, Select, Option } from 'jimu-ui';
// import { CloseOutlined } from '@ant-design/icons';
// import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components';
// const Setting = (props: AllWidgetSettingProps<any>) => {
//   const [urllst, setUrllst] = useState([]);
//   const [urlInput, setUrlInput] = useState('');
//   const [labelInput, setLabelInput] = useState('');
//   const [yngage, setyngage] = useState('');
//   const [oldage, setoldage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchError, setFetchError] = useState(null);
//   const [selectedValue, setSelectedValue] = useState('');
//   const [options, setOptions] = useState([]);
//   useEffect(() => {
//     setIsLoading(true);
//     const storedOptions = JSON.parse(localStorage.getItem('urllst')) || [];
//     console.log(storedOptions);
//     setOptions(storedOptions);
//     fetch('http://localhost:8000/data')
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         setUrllst(data);
//         props.onSettingChange({
//           id: props.id,
//           config: props.config.set('urllst', data)
//         });
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         setFetchError(error);
//       })
//       .finally(() => setIsLoading(false));
//   }, []);
//   const handleDropdownChange = (event) => {
//     setSelectedValue(event.target.value);
//     setUrlInput(event.target.value);
//   };
//   const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setLabelInput(event.target.value);
//   };
//   const handleyngChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setyngage(event.target.value);
//   };
//   const handleoldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setoldage(event.target.value);
//   };
//   const handleAddUrl = () => {
//     if (urlInput && labelInput) {
//       const newUrls = [...urllst, { label: labelInput, url: urlInput, Young_age_field: yngage, old_age_field: oldage }];
//       setUrllst(newUrls);
//       setUrlInput('');
//       setLabelInput('');
//       props.onSettingChange({
//         id: props.id,
//         config: props.config.set('urllst', newUrls)
//       });
//       console.log(newUrls)
//       fetch('http://localhost:8000/write', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newUrls),
//       }).catch(error => console.error('Error posting data:', error));
//     }
//   };
//   const handleRemove = (urlToRemove: string) => {
//     const updatedUrls = urllst.filter(url => url.url !== urlToRemove);
//     setUrllst(updatedUrls);
//     props.onSettingChange({
//       id: props.id,
//       config: props.config.set('urllst', updatedUrls)
//     });
//     fetch('http://localhost:8000/write', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedUrls),
//     }).catch(error => console.error('Error posting data:', error));
//   };
//   return (
//     <div className="widget-setting-demo">
//       <SettingSection className="url-list-section" title="Manage URLs">
//         <SettingRow>
//           <div className="url-inputs">
//             <Label>URL:</Label>
//             <Select
//               placeholder="Select URL"
//               value={urlInput}
//               onChange={handleDropdownChange}
//               style={{ marginBottom: '10px' }}
//             >
//               {options.map((option, index) => (
//                 <Option key={index} value={option.url}>
//                   {option.label}
//                 </Option>
//               ))}
//             </Select>
//             <Label>Label:</Label>
//             <Input
//               placeholder="Enter label"
//               value={labelInput}
//               onChange={handleLabelChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Label>young age field:</Label>
//             <Input
//               placeholder="young age field"
//               value={yngage}
//               onChange={handleyngChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Label>old age field:</Label>
//             <Input
//               placeholder="old age field"
//               value={oldage}
//               onChange={handleoldChange}
//               style={{ marginBottom: '10px' }}
//             />
//             <Button
//               type="primary"
//               onClick={handleAddUrl}
//               disabled={!urlInput || !labelInput}
//             >
//               Add URL
//             </Button>
//           </div>
//         </SettingRow>
//         <SettingRow>
//           <div className="url-buttons">
//             {urllst.map((urlEntry) => (
//               <div key={urlEntry.url} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
//                 <Button type="default" style={{ marginRight: '10px' }}>
//                   {urlEntry.label || 'No Label'}
//                 </Button>
//                 <Button type="tertiary" onClick={() => handleRemove(urlEntry.url)}>
//                   <CloseOutlined />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </SettingRow>
//       </SettingSection>
//     </div>
//   );
// };
// export default Setting;




const Setting = (props) => {
    const [urllst, setUrllst] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [urlInput, setUrlInput] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const [labelInput, setLabelInput] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const [yngage, setyngage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const [oldage, setoldage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [fetchError, setFetchError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [selectedValue, setSelectedValue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const [options, setOptions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [fields, setFields] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        setIsLoading(true);
        const storedOptions = JSON.parse(localStorage.getItem('urllst')) || [];
        console.log(storedOptions);
        setOptions(storedOptions);
        fetch('http://localhost:8000/data')
            .then(response => response.json())
            .then(data => {
            console.log(data);
            setUrllst(data);
            props.onSettingChange({
                id: props.id,
                config: props.config.set('urllst', data)
            });
        })
            .catch(error => {
            console.error('Error fetching data:', error);
            setFetchError(error);
        })
            .finally(() => setIsLoading(false));
    }, []);
    const handleDropdownChange = (event) => {
        const selectedUrl = event.target.value;
        setSelectedValue(selectedUrl);
        setUrlInput(selectedUrl);
        // Fetch fields from the selected URL
        fetch(`${selectedUrl}?f=json`)
            .then(response => response.json())
            .then(data => {
            if (data.fields) {
                // setFields(data.fields);
                const dateFields = data.fields.filter(field => field.type === 'esriFieldTypeDouble');
                setFields(dateFields.length > 0 ? dateFields : []);
            }
            else {
                setFields([]);
                console.log(fields);
                console.error('No fields found in the response');
            }
        })
            .catch(error => {
            setFields([]);
            console.error('Error fetching fields:', error);
        });
    };
    // const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   setLabelInput(event.target.value);
    // };
    const handleyngChange = (event) => {
        setyngage(event.target.value);
    };
    const handleoldChange = (event) => {
        setoldage(event.target.value);
    };
    const handleAddUrl = () => {
        if (urlInput) {
            const newUrls = [...urllst, { label: labelInput, url: urlInput, Young_age_field: yngage, old_age_field: oldage }];
            setUrllst(newUrls);
            setUrlInput('');
            setLabelInput('');
            props.onSettingChange({
                id: props.id,
                config: props.config.set('urllst', newUrls)
            });
            console.log(newUrls);
            fetch('http://localhost:8000/write', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUrls),
            }).catch(error => console.error('Error posting data:', error));
        }
    };
    const handleRemove = (urlToRemove) => {
        const updatedUrls = urllst.filter(url => url.url !== urlToRemove);
        setUrllst(updatedUrls);
        props.onSettingChange({
            id: props.id,
            config: props.config.set('urllst', updatedUrls)
        });
        fetch('http://localhost:8000/write', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUrls),
        }).catch(error => console.error('Error posting data:', error));
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: "widget-setting-demo" },
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_2__.SettingSection, { className: "url-list-section", title: "Manage URLs" },
            react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_2__.SettingRow, null,
                react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: "url-inputs" },
                    react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_1__.Label, null, "Layers:"),
                    react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_1__.Select, { placeholder: "Select URL", value: urlInput, onChange: handleDropdownChange, style: { marginBottom: '10px' } }, options.map((option, index) => (react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_1__.Option, { key: index, value: option.url }, option.label)))),
                    react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_1__.Label, null, "Young age field:"),
                    react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_1__.Select, { placeholder: "Select young age field", value: yngage, onChange: handleyngChange, style: { marginBottom: '10px' } }, fields.map((field, index) => (react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_1__.Option, { key: index, value: field.name }, field.alias || field.name)))),
                    react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_1__.Label, null, "Old age field:"),
                    react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_1__.Select, { placeholder: "Select old age field", value: oldage, onChange: handleoldChange, style: { marginBottom: '10px' } }, fields.map((field, index) => (react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_1__.Option, { key: index, value: field.name }, field.alias || field.name)))),
                    react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "primary", onClick: handleAddUrl, disabled: !urlInput }, "Add URL"))),
            react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(jimu_ui_advanced_setting_components__WEBPACK_IMPORTED_MODULE_2__.SettingRow, null,
                react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: "url-buttons" }, urllst.map((urlEntry) => (react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { key: urlEntry.url, style: { marginBottom: '10px', display: 'flex', alignItems: 'center' } },
                    react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "default", style: { marginRight: '10px' } },
                        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, urlEntry.label || 'No Label'),
                        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, urlEntry.Young_age_field),
                        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, urlEntry.old_age_field)),
                    react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(jimu_ui__WEBPACK_IMPORTED_MODULE_1__.Button, { type: "tertiary", onClick: () => handleRemove(urlEntry.url) },
                        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__["default"], null))))))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Setting);
function __set_webpack_public_path__(url) { __webpack_require__.p = url; }

})();

/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy9zaW1wbGUvZGlzdC9zZXR0aW5nL3NldHRpbmcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFpRTtBQUNqRSxpQkFBaUI7QUFDakIsMkJBQTJCO0FBQzNCLDRCQUE0QjtBQUM1Qiw0QkFBNEI7QUFDNUIsNEJBQTRCO0FBQzVCLHlCQUF5QjtBQUN6Qix3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx5REFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHlEQUFRO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0EsZUFBZSwyREFBVTtBQUN6QixnQ0FBZ0MsT0FBTztBQUN2QztBQUNBLDRCQUE0QiwyREFBVTtBQUN0QztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBLDZCQUE2QiwyREFBVTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLDJEQUFVLHFDQUFxQywyREFBVTtBQUMvRjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xLaUQ7QUFDdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0QxQjs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNPO0FBQ1A7QUFDTztBQUNQO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuR0E7QUFDQSxzQkFBc0IsVUFBVSx5QkFBeUIsMEVBQTBFLGlCQUFpQiwwQkFBMEIsb29CQUFvb0IsR0FBRztBQUNyekIsaUVBQWUsYUFBYSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRjdCOztBQUUwRDtBQUNZO0FBQ0U7QUFDa0I7QUFDMUY7QUFDK0I7QUFDSztBQUNNO0FBQ1Y7QUFDRztBQUNzQztBQUN2QjtBQUNsRDtBQUNBO0FBQ0EscUVBQWUsQ0FBQyxvREFBSTs7QUFFcEI7O0FBRUEsd0JBQXdCLDZDQUFnQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw4RkFBd0I7QUFDeEMsMEJBQTBCLDZDQUFnQixDQUFDLGdEQUFPO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixpREFBVSwyQkFBMkIscUZBQWUsQ0FBQyxxRkFBZSxHQUFHO0FBQzNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLDhCQUE4Qiw4REFBc0I7QUFDcEQsNkJBQTZCLG9GQUFjO0FBQzNDO0FBQ0E7QUFDQSxzQkFBc0IsZ0RBQW1CLFNBQVMsOEVBQVE7QUFDMUQ7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsZ0JBQWdCLGdEQUFtQixDQUFDLGtEQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBLHVCQUF1QixpRUFBZTtBQUN0Qyx1QkFBdUIsaUVBQWU7QUFDdEMsaUVBQWUsSUFBSTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFbUI7QUFDdEMsK0JBQStCLG9EQUFhLEdBQUc7QUFDL0MsaUVBQWUsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZnRTtBQUNyQjtBQUNyRTtBQUMrQjtBQUNvRTtBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQseURBQWlCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLFNBQVMsb0ZBQWEsR0FBRztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDhGQUF3QjtBQUN4QyxlQUFlLHlDQUFZO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLHlEQUFpQjtBQUN6RDtBQUNBO0FBQ0EsRUFBRSx1REFBZTtBQUNqQixFQUFFLCtDQUFPLENBQUMsd0RBQWdCO0FBQzFCLE9BQU8sd0RBQWdCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxvRkFBYSxDQUFDLG9GQUFhLEdBQUcsYUFBYTtBQUN4RDtBQUNBLEtBQUs7QUFDTDtBQUNBLFNBQVMsZ0RBQVEsMENBQTBDLG9GQUFhLENBQUMsb0ZBQWE7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsZ0JBQWdCO0FBQ25CO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9EK0M7QUFDbkM7QUFDZTtBQUMzQztBQUNQLDhCQUE4Qiw4REFBc0I7QUFDcEQsNkJBQTZCLG9GQUFjO0FBQzNDO0FBQ0E7QUFDQSxTQUFTLGlEQUFTO0FBQ2xCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDTztBQUNQLGVBQWUsaURBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CMEQ7QUFDMUQ7QUFDQTs7QUFFK0I7QUFDMkM7QUFDNUI7QUFDOUM7QUFDQSxzQkFBc0IsZ0RBQW1CLENBQUMsNERBQVEsRUFBRSw4RUFBUSxHQUFHO0FBQy9EO0FBQ0EsVUFBVSxrRkFBZ0I7QUFDMUIsR0FBRztBQUNIOztBQUVBLCtCQUErQjtBQUMvQiwyQkFBMkIsNkNBQWdCO0FBQzNDLElBQUksSUFBcUM7QUFDekM7QUFDQTtBQUNBLGlFQUFlLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQitDO0FBQ2I7QUFDTztBQUNUO0FBQ0E7QUFDaEI7QUFDZTtBQUNOO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNPO0FBQ1AsRUFBRSw4REFBSTtBQUNOO0FBQ087QUFDUCxTQUFTLDZFQUFPLGlHQUFpRyw2RUFBTztBQUN4SDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLElBQUk7QUFDUDtBQUNPO0FBQ1A7QUFDQSx3QkFBd0IsMkRBQW1CLFdBQVcsb0ZBQWE7QUFDbkU7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxzQkFBc0IsMkRBQW1CLFdBQVcsb0ZBQWEsQ0FBQyxvRkFBYTtBQUMvRTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNPO0FBQ1A7QUFDQSxTQUFTLDREQUFhO0FBQ3RCO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLDhCQUE4Qix5QkFBeUIsd0JBQXdCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHVCQUF1Qix5QkFBeUIsNkJBQTZCLHVDQUF1Qyx3Q0FBd0MsdUNBQXVDLEdBQUcsa0JBQWtCLG1CQUFtQixHQUFHLGtCQUFrQiwwQkFBMEIsR0FBRyxzQkFBc0Isa0JBQWtCLEdBQUcsNEJBQTRCLG1CQUFtQixHQUFHLHdCQUF3QixvQkFBb0IsR0FBRywyQ0FBMkMsMEJBQTBCLHdEQUF3RCxnREFBZ0QsR0FBRyxzQ0FBc0MsVUFBVSx3Q0FBd0MsZ0NBQWdDLEtBQUssR0FBRyw4QkFBOEIsVUFBVSx3Q0FBd0MsZ0NBQWdDLEtBQUssR0FBRztBQUM3OUI7QUFDUCxvQkFBb0IsaURBQVUsQ0FBQywyREFBVztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLGdEQUFTO0FBQ1g7QUFDQSxxQkFBcUIsb0VBQWE7QUFDbEMsSUFBSSxvRUFBUztBQUNiO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZGMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFVBQVU7QUFDMUI7QUFDTztBQUNQO0FBQ0EsV0FBVyxpREFBTztBQUNsQixXQUFXLGlEQUFPO0FBQ2xCLFdBQVcsaURBQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixVQUFVO0FBQzFCO0FBQ087QUFDUCxRQUFRLGlEQUFPO0FBQ2YsUUFBUSxpREFBTztBQUNmLFFBQVEsaURBQU87QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFVBQVU7QUFDMUI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaURBQU87QUFDZixRQUFRLGlEQUFPO0FBQ2YsUUFBUSxpREFBTztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsVUFBVTtBQUMxQjtBQUNPO0FBQ1AsUUFBUSxpREFBTztBQUNmLFFBQVEsaURBQU87QUFDZixRQUFRLGlEQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFVBQVU7QUFDMUI7QUFDTztBQUNQLFFBQVEsaURBQU87QUFDZixRQUFRLGlEQUFPO0FBQ2YsUUFBUSxpREFBTztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQSxRQUFRLDhDQUFJO0FBQ1osUUFBUSw4Q0FBSTtBQUNaLFFBQVEsOENBQUk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLFFBQVEsOENBQUk7QUFDWixRQUFRLDhDQUFJO0FBQ1osUUFBUSw4Q0FBSTtBQUNaLFFBQVEsOENBQUk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EsUUFBUSw4Q0FBSTtBQUNaLFFBQVEsOENBQUk7QUFDWixRQUFRLDhDQUFJO0FBQ1osUUFBUSw4Q0FBSTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDMU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6SkE7QUFDc0c7QUFDekQ7QUFDZTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHdEQUFRO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDZEQUFtQjtBQUNuQyxnQkFBZ0IsNkRBQW1CO0FBQ25DLGtCQUFrQix3REFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiw2REFBbUI7QUFDbkMsZ0JBQWdCLDZEQUFtQjtBQUNuQyxrQkFBa0Isd0RBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9EQUFVO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRTtBQUM3RCwyQkFBMkIsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFO0FBQzdELDJCQUEyQixFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFO0FBQzdFLDJCQUEyQixFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFO0FBQzdFO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxTQUFTLFFBQVEsU0FBUyxRQUFRLFFBQVE7QUFDbkY7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFLO0FBQ2IsZ0JBQWdCLHNEQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSwrREFBZTtBQUM5QixlQUFlLCtEQUFlO0FBQzlCLGVBQWUsK0RBQWU7QUFDOUIsZUFBZSxtRUFBbUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSwrREFBZTtBQUM5QixlQUFlLCtEQUFlO0FBQzlCLGVBQWUsK0RBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSwrREFBZTtBQUM5QixlQUFlLCtEQUFlO0FBQzlCLGVBQWUsK0RBQWU7QUFDOUIsZUFBZSxtRUFBbUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSwrREFBZTtBQUM5QixlQUFlLCtEQUFlO0FBQzlCLGVBQWUsK0RBQWU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdExBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDakZlO0FBQ2Y7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDRmU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CcUU7QUFDakM7QUFDRjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUZBQW1GO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNPO0FBQ1A7QUFDQSxPQUFPLHNEQUFTO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtCQUErQixxREFBUTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxlQUFlLG9GQUFhLENBQUMsb0ZBQWEsR0FBRyxtQkFBbUI7QUFDaEU7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ25KQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsZ0NBQWdDO0FBQ2hDLG1DQUFtQztBQUNuQztBQUNBO0FBQ087QUFDUCxNQUFNLEtBQXFDO0FBQzNDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsZUFBZTtBQUM3QjtBQUNQLE1BQU0sS0FBcUM7QUFDM0M7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixjQUFjO0FBQ3pCO0FBQ1A7QUFDQTs7QUFFQSxrQkFBa0IsY0FBYztBQUN6QjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxXQUFXOzs7Ozs7Ozs7OztBQ25FMUI7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7O0FBRUEsa0JBQWtCLHNCQUFzQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSyxLQUE2QjtBQUNsQztBQUNBO0FBQ0EsR0FBRyxTQUFTLElBQTRFO0FBQ3hGO0FBQ0EsRUFBRSxpQ0FBcUIsRUFBRSxtQ0FBRTtBQUMzQjtBQUNBLEdBQUc7QUFBQSxrR0FBQztBQUNKLEdBQUcsS0FBSyxFQUVOO0FBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzVFRDtBQUNBO0FBQ0EsZ0NBQWdDLE9BQU87QUFDdkM7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGK0M7QUFDL0M7QUFDQSxjQUFjLDZEQUFhO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLFlBQVksa0VBQWtFO0FBQ3RGLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRmlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBLE1BQU0sOERBQWM7QUFDcEIsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQjZFO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw0RUFBNEI7QUFDcEM7QUFDQTtBQUNBLGdCQUFnQixjQUFjLGtDQUFrQztBQUNoRTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSaUQ7QUFDWTtBQUNZO0FBQ3RCO0FBQ25EO0FBQ0EsU0FBUyw4REFBYyxPQUFPLG9FQUFvQixVQUFVLDBFQUEwQixVQUFVLCtEQUFlO0FBQy9HOzs7Ozs7Ozs7Ozs7Ozs7OztBQ05rQztBQUNsQztBQUNBLGtCQUFrQixzREFBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isc0RBQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZrQztBQUNTO0FBQzNDO0FBQ0EsVUFBVSwyREFBVztBQUNyQixxQkFBcUIsc0RBQU87QUFDNUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUnFEO0FBQ3JEO0FBQ0E7QUFDQSxxQ0FBcUMsZ0VBQWdCO0FBQ3JELGNBQWM7QUFDZCwrTEFBK0wsZ0VBQWdCO0FBQy9NO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUCtDO0FBQ2hDO0FBQ2YsUUFBUSw2REFBYTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDZGlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDZTtBQUNmLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBLE1BQU0sOERBQWM7QUFDcEIsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCa0M7QUFDbkI7QUFDZixrQkFBa0Isc0RBQU87QUFDekI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNEQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZrQztBQUNTO0FBQzVCO0FBQ2YsVUFBVSwyREFBVztBQUNyQixxQkFBcUIsc0RBQU87QUFDNUI7Ozs7Ozs7Ozs7Ozs7OztBQ0xlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEdBQUc7QUFDSDs7Ozs7O1VDUkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7QUNBQTs7O0tBR0s7QUFDTCwyQkFBMkI7QUFDM0IsYUFBYTtBQUNiLHFCQUF1QixHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05uRCxvQ0FBb0M7QUFDcEMsMkRBQTJEO0FBQzNELFdBQVc7QUFDWCx1QkFBdUI7QUFDdkIsb0JBQW9CO0FBQ3BCLGVBQWU7QUFDZixnREFBZ0Q7QUFFaEQsMkRBQTJEO0FBRTNELDJEQUEyRDtBQUMzRCxpRUFBaUU7QUFDakUsOEJBQThCO0FBQzlCLHNCQUFzQjtBQUN0Qix5Q0FBeUM7QUFDekMsU0FBUztBQUNULE1BQU07QUFFTixhQUFhO0FBQ2IsNENBQTRDO0FBQzVDLDJCQUEyQjtBQUMzQixrREFBa0Q7QUFDbEQseUNBQXlDO0FBQ3pDLFdBQVc7QUFDWCxhQUFhO0FBQ2IsTUFBTTtBQUNOLElBQUk7QUFFSiw0QkFBNEI7QUFDNUIsc0RBQXNEO0FBQ3RELDREQUE0RDtBQUM1RCxrREFBa0Q7QUFDbEQscURBQXFEO0FBQ3JELFdBQVc7QUFDWCxvQkFBb0I7QUFDcEIsZUFBZTtBQUNmLGdEQUFnRDtBQUVoRCwyREFBMkQ7QUFDM0QsaURBQWlEO0FBQ2pELHFEQUFxRDtBQUNyRCx5REFBeUQ7QUFDekQsaURBQWlEO0FBQ2pELGlEQUFpRDtBQUVqRCx5QkFBeUI7QUFDekIsbURBQW1EO0FBQ25ELDZDQUE2QztBQUM3Qyw4Q0FBOEM7QUFDOUMsaURBQWlEO0FBQ2pELDBFQUEwRTtBQUMxRSxlQUFlO0FBQ2YsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCxzREFBc0Q7QUFDdEQsOENBQThDO0FBQzlDLDhDQUE4QztBQUM5Qyx1REFBdUQ7QUFDdkQsd0RBQXdEO0FBRXhELHNCQUFzQjtBQUN0Qiw2QkFBNkI7QUFFN0IsMENBQTBDO0FBQzFDLDJDQUEyQztBQUMzQyx1QkFBdUI7QUFDdkIsNEJBQTRCO0FBQzVCLGlFQUFpRTtBQUNqRSwwQkFBMEI7QUFDMUIsMkRBQTJEO0FBQzNELDBCQUEwQjtBQUMxQix3REFBd0Q7QUFDeEQsZ0NBQWdDO0FBQ2hDLFdBQVc7QUFDWCw2Q0FBNkM7QUFDN0MsWUFBWTtBQUVaLDhFQUE4RTtBQUM5RSx1Q0FBdUM7QUFDdkMsT0FBTztBQUVQLGdGQUFnRjtBQUNoRix5Q0FBeUM7QUFDekMsT0FBTztBQUNQLDhFQUE4RTtBQUM5RSxxQ0FBcUM7QUFDckMsT0FBTztBQUNQLDhFQUE4RTtBQUM5RSxxQ0FBcUM7QUFDckMsT0FBTztBQUVQLGlDQUFpQztBQUNqQyxvQ0FBb0M7QUFDcEMsa0dBQWtHO0FBQ2xHLGtDQUFrQztBQUNsQyw0QkFBNEI7QUFDNUIseUJBQXlCO0FBQ3pCLDJCQUEyQjtBQUUzQixtREFBbUQ7QUFDbkQsb0VBQW9FO0FBQ3BFLCtDQUErQztBQUMvQywwQkFBMEI7QUFDMUIscUJBQXFCO0FBQ3JCLGdEQUFnRDtBQUNoRCxhQUFhO0FBQ2IseUNBQXlDO0FBQ3pDLHdFQUF3RTtBQUN4RSxRQUFRO0FBQ1IsT0FBTztBQUVQLG9EQUFvRDtBQUNwRCx5RUFBeUU7QUFDekUsOEJBQThCO0FBQzlCLHNFQUFzRTtBQUV0RSwyRUFBMkU7QUFDM0UsNkNBQTZDO0FBQzdDLHdCQUF3QjtBQUN4QixtQkFBbUI7QUFDbkIsOENBQThDO0FBQzlDLFdBQVc7QUFDWCwyQ0FBMkM7QUFDM0Msc0VBQXNFO0FBQ3RFLE9BQU87QUFFUCxhQUFhO0FBQ2IsNENBQTRDO0FBQzVDLHdCQUF3QjtBQUN4Qix1Q0FBdUM7QUFDdkMsOEJBQThCO0FBQzlCLFVBQVU7QUFDVix1QkFBdUI7QUFDdkIseUNBQXlDO0FBQ3pDLGtDQUFrQztBQUNsQyxxQkFBcUI7QUFDckIsd0NBQXdDO0FBQ3hDLGlDQUFpQztBQUNqQywyQ0FBMkM7QUFDM0MsaURBQWlEO0FBQ2pELGlCQUFpQjtBQUNqQixvQ0FBb0M7QUFDcEMscUJBQXFCO0FBQ3JCLDBDQUEwQztBQUMxQyxtQ0FBbUM7QUFDbkMsNkNBQTZDO0FBQzdDLGlEQUFpRDtBQUNqRCxpQkFBaUI7QUFDakIsOENBQThDO0FBQzlDLHFCQUFxQjtBQUNyQiw4Q0FBOEM7QUFDOUMsK0JBQStCO0FBQy9CLDJDQUEyQztBQUMzQyxpREFBaUQ7QUFDakQsaUJBQWlCO0FBQ2pCLDRDQUE0QztBQUM1QyxxQkFBcUI7QUFDckIsNENBQTRDO0FBQzVDLCtCQUErQjtBQUMvQiwyQ0FBMkM7QUFDM0MsaURBQWlEO0FBQ2pELGlCQUFpQjtBQUNqQixzQkFBc0I7QUFDdEIsK0JBQStCO0FBQy9CLHVDQUF1QztBQUN2QyxvREFBb0Q7QUFDcEQsZ0JBQWdCO0FBQ2hCLHdCQUF3QjtBQUN4Qix3QkFBd0I7QUFDeEIsbUJBQW1CO0FBQ25CLHdCQUF3QjtBQUV4Qix1QkFBdUI7QUFDdkIsMENBQTBDO0FBQzFDLDBDQUEwQztBQUMxQyxpSEFBaUg7QUFDakgsMEJBQTBCO0FBQzFCLG1DQUFtQztBQUNuQyxvREFBb0Q7QUFDcEQsb0JBQW9CO0FBQ3BCLG1EQUFtRDtBQUNuRCw0QkFBNEI7QUFDNUIsMEJBQTBCO0FBQzFCLG9DQUFvQztBQUNwQywrREFBK0Q7QUFDL0Qsb0JBQW9CO0FBQ3BCLHNDQUFzQztBQUN0Qyw0QkFBNEI7QUFDNUIsdUJBQXVCO0FBQ3ZCLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsd0JBQXdCO0FBQ3hCLDBCQUEwQjtBQUMxQixhQUFhO0FBQ2IsT0FBTztBQUNQLEtBQUs7QUFFTCwwQkFBMEI7QUFHMUIsc0RBQXNEO0FBQ3RELDREQUE0RDtBQUM1RCxrREFBa0Q7QUFDbEQscURBQXFEO0FBQ3JELG9GQUFvRjtBQUVwRiwyREFBMkQ7QUFDM0QsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCxzREFBc0Q7QUFDdEQsOENBQThDO0FBQzlDLDhDQUE4QztBQUM5Qyx1REFBdUQ7QUFDdkQsd0RBQXdEO0FBQ3hELDREQUE0RDtBQUM1RCxnREFBZ0Q7QUFDaEQsc0JBQXNCO0FBQ3RCLDBCQUEwQjtBQUMxQiw4RUFBOEU7QUFDOUUsa0NBQWtDO0FBQ2xDLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMsMkNBQTJDO0FBQzNDLHdCQUF3QjtBQUN4Qiw2QkFBNkI7QUFDN0IsMkJBQTJCO0FBQzNCLGtDQUFrQztBQUNsQywwQkFBMEI7QUFDMUIscURBQXFEO0FBQ3JELGNBQWM7QUFDZCxXQUFXO0FBQ1gsMEJBQTBCO0FBQzFCLHdEQUF3RDtBQUN4RCxnQ0FBZ0M7QUFDaEMsV0FBVztBQUNYLDZDQUE2QztBQUM3QyxZQUFZO0FBQ1osOENBQThDO0FBQzlDLDRDQUE0QztBQUM1QyxPQUFPO0FBRVAsOEVBQThFO0FBQzlFLHVDQUF1QztBQUN2QyxPQUFPO0FBRVAsZ0ZBQWdGO0FBQ2hGLHlDQUF5QztBQUN6QyxPQUFPO0FBRVAsOEVBQThFO0FBQzlFLHFDQUFxQztBQUNyQyxPQUFPO0FBRVAsOEVBQThFO0FBQzlFLHFDQUFxQztBQUNyQyxPQUFPO0FBRVAsaUNBQWlDO0FBQ2pDLG9DQUFvQztBQUNwQywySEFBMkg7QUFDM0gsNEJBQTRCO0FBQzVCLHlCQUF5QjtBQUN6QiwyQkFBMkI7QUFFM0IsZ0NBQWdDO0FBQ2hDLHdCQUF3QjtBQUN4QixzREFBc0Q7QUFDdEQsWUFBWTtBQUNaLDZCQUE2QjtBQUM3QiwrQ0FBK0M7QUFDL0MsMEJBQTBCO0FBQzFCLHFCQUFxQjtBQUNyQixnREFBZ0Q7QUFDaEQsYUFBYTtBQUNiLHlDQUF5QztBQUN6Qyx3RUFBd0U7QUFDeEUsUUFBUTtBQUNSLE9BQU87QUFFUCxvREFBb0Q7QUFDcEQseUVBQXlFO0FBQ3pFLDhCQUE4QjtBQUU5Qiw4QkFBOEI7QUFDOUIsc0JBQXNCO0FBQ3RCLHdEQUF3RDtBQUN4RCxVQUFVO0FBRVYsNkNBQTZDO0FBQzdDLHdCQUF3QjtBQUN4QixtQkFBbUI7QUFDbkIsOENBQThDO0FBQzlDLFdBQVc7QUFDWCwyQ0FBMkM7QUFDM0Msc0VBQXNFO0FBQ3RFLE9BQU87QUFFUCxhQUFhO0FBQ2IsNENBQTRDO0FBQzVDLDBFQUEwRTtBQUMxRSx1QkFBdUI7QUFDdkIseUNBQXlDO0FBQ3pDLGtDQUFrQztBQUNsQyxxQkFBcUI7QUFDckIsd0NBQXdDO0FBQ3hDLGlDQUFpQztBQUNqQywyQ0FBMkM7QUFDM0MsaURBQWlEO0FBQ2pELGlCQUFpQjtBQUNqQixvQ0FBb0M7QUFDcEMscUJBQXFCO0FBQ3JCLDBDQUEwQztBQUMxQyxtQ0FBbUM7QUFDbkMsNkNBQTZDO0FBQzdDLGlEQUFpRDtBQUNqRCxpQkFBaUI7QUFDakIsOENBQThDO0FBQzlDLHFCQUFxQjtBQUNyQiw4Q0FBOEM7QUFDOUMsK0JBQStCO0FBQy9CLDJDQUEyQztBQUMzQyxpREFBaUQ7QUFDakQsaUJBQWlCO0FBQ2pCLDRDQUE0QztBQUM1QyxxQkFBcUI7QUFDckIsNENBQTRDO0FBQzVDLCtCQUErQjtBQUMvQiwyQ0FBMkM7QUFDM0MsaURBQWlEO0FBQ2pELGlCQUFpQjtBQUNqQixzQkFBc0I7QUFDdEIsK0JBQStCO0FBQy9CLHVDQUF1QztBQUN2QyxvREFBb0Q7QUFDcEQsZ0JBQWdCO0FBQ2hCLHdCQUF3QjtBQUN4Qix3QkFBd0I7QUFDeEIsbUJBQW1CO0FBQ25CLHdCQUF3QjtBQUV4Qix1QkFBdUI7QUFDdkIsMENBQTBDO0FBQzFDLDBDQUEwQztBQUMxQyxpSEFBaUg7QUFDakgsMEVBQTBFO0FBQzFFLG1EQUFtRDtBQUNuRCw0QkFBNEI7QUFDNUIsc0ZBQXNGO0FBQ3RGLHNDQUFzQztBQUN0Qyw0QkFBNEI7QUFDNUIsdUJBQXVCO0FBQ3ZCLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsd0JBQXdCO0FBQ3hCLDBCQUEwQjtBQUMxQixhQUFhO0FBQ2IsT0FBTztBQUNQLEtBQUs7QUFFTCwwQkFBMEI7QUFHMUIsc0RBQXNEO0FBQ3RELDREQUE0RDtBQUM1RCxrRUFBa0U7QUFDbEUscURBQXFEO0FBQ3JELG9GQUFvRjtBQUVwRiwyREFBMkQ7QUFDM0QsOENBQThDO0FBQzlDLGtEQUFrRDtBQUNsRCxzREFBc0Q7QUFDdEQsOENBQThDO0FBQzlDLDhDQUE4QztBQUM5Qyx1REFBdUQ7QUFDdkQsd0RBQXdEO0FBQ3hELDREQUE0RDtBQUM1RCxnREFBZ0Q7QUFFaEQsc0JBQXNCO0FBQ3RCLDBCQUEwQjtBQUMxQiw4RUFBOEU7QUFDOUUsa0NBQWtDO0FBQ2xDLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFDMUMsMkNBQTJDO0FBQzNDLHdCQUF3QjtBQUN4Qiw2QkFBNkI7QUFDN0IsMkJBQTJCO0FBQzNCLGtDQUFrQztBQUNsQywwQkFBMEI7QUFDMUIscURBQXFEO0FBQ3JELGNBQWM7QUFDZCxXQUFXO0FBQ1gsMEJBQTBCO0FBQzFCLHdEQUF3RDtBQUN4RCxnQ0FBZ0M7QUFDaEMsV0FBVztBQUNYLDZDQUE2QztBQUM3QyxZQUFZO0FBRVosOENBQThDO0FBQzlDLDRDQUE0QztBQUM1Qyx1Q0FBdUM7QUFDdkMsT0FBTztBQUVQLGdGQUFnRjtBQUNoRix5Q0FBeUM7QUFDekMsT0FBTztBQUVQLDhFQUE4RTtBQUM5RSxxQ0FBcUM7QUFDckMsT0FBTztBQUVQLDhFQUE4RTtBQUM5RSxxQ0FBcUM7QUFDckMsT0FBTztBQUVQLGlDQUFpQztBQUNqQyxvQ0FBb0M7QUFDcEMsMkhBQTJIO0FBQzNILDRCQUE0QjtBQUM1Qix5QkFBeUI7QUFDekIsMkJBQTJCO0FBRTNCLGdDQUFnQztBQUNoQyx3QkFBd0I7QUFDeEIsc0RBQXNEO0FBQ3RELFlBQVk7QUFDWiw2QkFBNkI7QUFDN0IsK0NBQStDO0FBQy9DLDBCQUEwQjtBQUMxQixxQkFBcUI7QUFDckIsZ0RBQWdEO0FBQ2hELGFBQWE7QUFDYix5Q0FBeUM7QUFDekMsd0VBQXdFO0FBQ3hFLFFBQVE7QUFDUixPQUFPO0FBRVAsb0RBQW9EO0FBQ3BELHlFQUF5RTtBQUN6RSw4QkFBOEI7QUFFOUIsOEJBQThCO0FBQzlCLHNCQUFzQjtBQUN0Qix3REFBd0Q7QUFDeEQsVUFBVTtBQUVWLDZDQUE2QztBQUM3Qyx3QkFBd0I7QUFDeEIsbUJBQW1CO0FBQ25CLDhDQUE4QztBQUM5QyxXQUFXO0FBQ1gsMkNBQTJDO0FBQzNDLHNFQUFzRTtBQUN0RSxPQUFPO0FBRVAsYUFBYTtBQUNiLDRDQUE0QztBQUM1QywwRUFBMEU7QUFDMUUsdUJBQXVCO0FBQ3ZCLHlDQUF5QztBQUN6QyxrQ0FBa0M7QUFDbEMsc0JBQXNCO0FBQ3RCLHlDQUF5QztBQUN6QyxpQ0FBaUM7QUFDakMsZ0RBQWdEO0FBQ2hELGlEQUFpRDtBQUNqRCxnQkFBZ0I7QUFDaEIsa0RBQWtEO0FBQ2xELDBEQUEwRDtBQUMxRCxtQ0FBbUM7QUFDbkMsNEJBQTRCO0FBQzVCLG9CQUFvQjtBQUNwQix3QkFBd0I7QUFDeEIsb0NBQW9DO0FBQ3BDLHFCQUFxQjtBQUNyQiwwQ0FBMEM7QUFDMUMsbUNBQW1DO0FBQ25DLDZDQUE2QztBQUM3QyxpREFBaUQ7QUFDakQsaUJBQWlCO0FBQ2pCLDhDQUE4QztBQUM5QyxxQkFBcUI7QUFDckIsOENBQThDO0FBQzlDLCtCQUErQjtBQUMvQiwyQ0FBMkM7QUFDM0MsaURBQWlEO0FBQ2pELGlCQUFpQjtBQUNqQiw0Q0FBNEM7QUFDNUMscUJBQXFCO0FBQ3JCLDRDQUE0QztBQUM1QywrQkFBK0I7QUFDL0IsMkNBQTJDO0FBQzNDLGlEQUFpRDtBQUNqRCxpQkFBaUI7QUFDakIsc0JBQXNCO0FBQ3RCLCtCQUErQjtBQUMvQix1Q0FBdUM7QUFDdkMsb0RBQW9EO0FBQ3BELGdCQUFnQjtBQUNoQix3QkFBd0I7QUFDeEIsd0JBQXdCO0FBQ3hCLG1CQUFtQjtBQUNuQix3QkFBd0I7QUFFeEIsdUJBQXVCO0FBQ3ZCLDBDQUEwQztBQUMxQywwQ0FBMEM7QUFDMUMsaUhBQWlIO0FBQ2pILDBFQUEwRTtBQUMxRSxtREFBbUQ7QUFDbkQsNEJBQTRCO0FBQzVCLHNGQUFzRjtBQUN0RixzQ0FBc0M7QUFDdEMsNEJBQTRCO0FBQzVCLHVCQUF1QjtBQUN2QixrQkFBa0I7QUFDbEIsbUJBQW1CO0FBQ25CLHdCQUF3QjtBQUN4QiwwQkFBMEI7QUFDMUIsYUFBYTtBQUNiLE9BQU87QUFDUCxLQUFLO0FBRUwsMEJBQTBCO0FBRXlCO0FBRVk7QUFDYjtBQUMrQjtBQUVqRixNQUFNLE9BQU8sR0FBRyxDQUFDLEtBQWlDLEVBQUUsRUFBRTtJQUNwRCxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxHQUFHLCtDQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekMsTUFBTSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsR0FBRywrQ0FBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEdBQUcsK0NBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqRCxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxHQUFHLCtDQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekMsTUFBTSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsR0FBRywrQ0FBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUcsK0NBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxNQUFNLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxHQUFHLCtDQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkQsTUFBTSxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLCtDQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdkQsTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsR0FBRywrQ0FBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEdBQUcsK0NBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUV6QyxnREFBUyxDQUFDLEdBQUcsRUFBRTtRQUNiLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzQixVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUIsS0FBSyxDQUFDLDRCQUE0QixDQUFDO2FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixLQUFLLENBQUMsZUFBZSxDQUFDO2dCQUNwQixFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ1osTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7YUFDekMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDO2FBQ0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVQLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNyQyxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN2QyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QixXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFekIscUNBQXFDO1FBQ3JDLEtBQUssQ0FBQyxHQUFHLFdBQVcsU0FBUyxDQUFDO2FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDWCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFFaEIsMEJBQTBCO2dCQUMxQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUsscUJBQXFCLENBQUMsQ0FBQztnQkFDckYsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELENBQUM7aUJBQU0sQ0FBQztnQkFDTixTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUNuRCxDQUFDO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQztRQUFBLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQztJQUVGLDhFQUE4RTtJQUM5RSx1Q0FBdUM7SUFDdkMsS0FBSztJQUVMLE1BQU0sZUFBZSxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDaEMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0lBRUYsTUFBTSxlQUFlLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNoQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7SUFFRixNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUU7UUFDeEIsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNiLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUNsSCxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkIsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hCLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVsQixLQUFLLENBQUMsZUFBZSxDQUFDO2dCQUNwQixFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ1osTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7YUFDNUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDcEIsS0FBSyxDQUFDLDZCQUE2QixFQUFFO2dCQUNuQyxNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUU7b0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjtpQkFDbkM7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO2FBQzlCLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakUsQ0FBQztJQUNILENBQUMsQ0FBQztJQUVGLE1BQU0sWUFBWSxHQUFHLENBQUMsV0FBbUIsRUFBRSxFQUFFO1FBQzNDLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLFdBQVcsQ0FBQyxDQUFDO1FBQ2xFLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2QixLQUFLLENBQUMsZUFBZSxDQUFDO1lBQ3BCLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtZQUNaLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDO1NBQ2hELENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyw2QkFBNkIsRUFBRTtZQUNuQyxNQUFNLEVBQUUsTUFBTTtZQUNkLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsa0JBQWtCO2FBQ25DO1lBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1NBQ2xDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQyxDQUFDO0lBRUYsT0FBTyxDQUNMLHFFQUFLLFNBQVMsRUFBQyxxQkFBcUI7UUFDbEMsNERBQUMsK0VBQWMsSUFBQyxTQUFTLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFDLGFBQWE7WUFDOUQsNERBQUMsMkVBQVU7Z0JBQ1QscUVBQUssU0FBUyxFQUFDLFlBQVk7b0JBQ3pCLDREQUFDLDBDQUFLLGtCQUFnQjtvQkFDdEIsNERBQUMsMkNBQU0sSUFDTCxXQUFXLEVBQUMsWUFBWSxFQUN4QixLQUFLLEVBQUUsUUFBUSxFQUNmLFFBQVEsRUFBRSxvQkFBb0IsRUFDOUIsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxJQUU5QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FDOUIsNERBQUMsMkNBQU0sSUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxJQUNsQyxNQUFNLENBQUMsS0FBSyxDQUNOLENBQ1YsQ0FBQyxDQUNLO29CQWNULDREQUFDLDBDQUFLLDJCQUF5QjtvQkFDL0IsNERBQUMsMkNBQU0sSUFDTCxXQUFXLEVBQUMsd0JBQXdCLEVBQ3BDLEtBQUssRUFBRSxNQUFNLEVBQ2IsUUFBUSxFQUFFLGVBQWUsRUFDekIsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxJQUU5QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FDNUIsNERBQUMsMkNBQU0sSUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxJQUNsQyxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQ25CLENBQ1YsQ0FBQyxDQUNLO29CQUNULDREQUFDLDBDQUFLLHlCQUF1QjtvQkFDN0IsNERBQUMsMkNBQU0sSUFDTCxXQUFXLEVBQUMsc0JBQXNCLEVBQ2xDLEtBQUssRUFBRSxNQUFNLEVBQ2IsUUFBUSxFQUFFLGVBQWUsRUFDekIsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxJQUU5QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FDNUIsNERBQUMsMkNBQU0sSUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxJQUNsQyxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQ25CLENBQ1YsQ0FBQyxDQUNLO29CQUNULDREQUFDLDJDQUFNLElBQ0wsSUFBSSxFQUFDLFNBQVMsRUFDZCxPQUFPLEVBQUUsWUFBWSxFQUNyQixRQUFRLEVBQUUsQ0FBQyxRQUFRLGNBR1osQ0FDTCxDQUNLO1lBRWIsNERBQUMsMkVBQVU7Z0JBQ1QscUVBQUssU0FBUyxFQUFDLGFBQWEsSUFDekIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FDeEIscUVBQUssR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7b0JBQzVGLDREQUFDLDJDQUFNLElBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUUsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFO3dCQUNyRCx5RUFBTSxRQUFRLENBQUMsS0FBSyxJQUFJLFVBQVUsQ0FBTzt3QkFDekMseUVBQU0sUUFBUSxDQUFDLGVBQWUsQ0FBTzt3QkFDckMseUVBQU0sUUFBUSxDQUFDLGFBQWEsQ0FBTyxDQUkxQjtvQkFDVCw0REFBQywyQ0FBTSxJQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO3dCQUMvRCw0REFBQyx5REFBYSxPQUFHLENBQ1YsQ0FDTCxDQUNQLENBQUMsQ0FDRSxDQUNLLENBQ0UsQ0FDYixDQUNQLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixpRUFBZSxPQUFPLEVBQUM7QUFFZixTQUFTLDJCQUEyQixDQUFDLEdBQUcsSUFBSSxxQkFBdUIsR0FBRyxHQUFHLEVBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGFudC1kZXNpZ24vY29sb3JzL2VzL2dlbmVyYXRlLmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGFudC1kZXNpZ24vY29sb3JzL2VzL2luZGV4LmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGFudC1kZXNpZ24vY29sb3JzL2VzL3ByZXNldHMuanMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL25vZGVfbW9kdWxlcy9AYW50LWRlc2lnbi9pY29ucy1zdmcvZXMvYXNuL0Nsb3NlT3V0bGluZWQuanMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL25vZGVfbW9kdWxlcy9AYW50LWRlc2lnbi9pY29ucy9lcy9jb21wb25lbnRzL0FudGRJY29uLmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGFudC1kZXNpZ24vaWNvbnMvZXMvY29tcG9uZW50cy9Db250ZXh0LmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGFudC1kZXNpZ24vaWNvbnMvZXMvY29tcG9uZW50cy9JY29uQmFzZS5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BhbnQtZGVzaWduL2ljb25zL2VzL2NvbXBvbmVudHMvdHdvVG9uZVByaW1hcnlDb2xvci5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BhbnQtZGVzaWduL2ljb25zL2VzL2ljb25zL0Nsb3NlT3V0bGluZWQuanMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL25vZGVfbW9kdWxlcy9AYW50LWRlc2lnbi9pY29ucy9lcy91dGlscy5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BjdHJsL3Rpbnljb2xvci9kaXN0L21vZHVsZS9jb252ZXJzaW9uLmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGN0cmwvdGlueWNvbG9yL2Rpc3QvbW9kdWxlL2Nzcy1jb2xvci1uYW1lcy5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BjdHJsL3Rpbnljb2xvci9kaXN0L21vZHVsZS9mb3JtYXQtaW5wdXQuanMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL25vZGVfbW9kdWxlcy9AY3RybC90aW55Y29sb3IvZGlzdC9tb2R1bGUvdXRpbC5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL3JjLXV0aWwvZXMvRG9tL2NhblVzZURvbS5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL3JjLXV0aWwvZXMvRG9tL2NvbnRhaW5zLmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvcmMtdXRpbC9lcy9Eb20vZHluYW1pY0NTUy5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL3JjLXV0aWwvZXMvRG9tL3NoYWRvdy5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL3JjLXV0aWwvZXMvd2FybmluZy5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50L2V4dGVybmFsIHN5c3RlbSBcImppbXUtY29yZS9yZWFjdFwiIiwid2VicGFjazovL2V4Yi1jbGllbnQvZXh0ZXJuYWwgc3lzdGVtIFwiamltdS11aVwiIiwid2VicGFjazovL2V4Yi1jbGllbnQvZXh0ZXJuYWwgc3lzdGVtIFwiamltdS11aS9hZHZhbmNlZC9zZXR0aW5nLWNvbXBvbmVudHNcIiIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL25vZGVfbW9kdWxlcy9AYW50LWRlc2lnbi9pY29ucy9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXJyYXlMaWtlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BhbnQtZGVzaWduL2ljb25zL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hcnJheVdpdGhIb2xlcy5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BhbnQtZGVzaWduL2ljb25zL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BhbnQtZGVzaWduL2ljb25zL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzLmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGFudC1kZXNpZ24vaWNvbnMvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2l0ZXJhYmxlVG9BcnJheUxpbWl0LmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGFudC1kZXNpZ24vaWNvbnMvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL25vbkl0ZXJhYmxlUmVzdC5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BhbnQtZGVzaWduL2ljb25zL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RTcHJlYWQyLmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGFudC1kZXNpZ24vaWNvbnMvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGFudC1kZXNpZ24vaWNvbnMvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UuanMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL25vZGVfbW9kdWxlcy9AYW50LWRlc2lnbi9pY29ucy9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BhbnQtZGVzaWduL2ljb25zL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1ByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BhbnQtZGVzaWduL2ljb25zL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1Byb3BlcnR5S2V5LmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGFudC1kZXNpZ24vaWNvbnMvbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BhbnQtZGVzaWduL2ljb25zL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0U3ByZWFkMi5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3RvUHJpbWl0aXZlLmpzIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Qcm9wZXJ0eUtleS5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9leGItY2xpZW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4Yi1jbGllbnQvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2V4Yi1jbGllbnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leGItY2xpZW50L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2V4Yi1jbGllbnQvLi9qaW11LWNvcmUvbGliL3NldC1wdWJsaWMtcGF0aC50cyIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4veW91ci1leHRlbnNpb25zL3dpZGdldHMvc2ltcGxlL3NyYy9zZXR0aW5nL3NldHRpbmcudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlucHV0VG9SR0IsIHJnYlRvSGV4LCByZ2JUb0hzdiB9IGZyb20gJ0BjdHJsL3Rpbnljb2xvcic7XG52YXIgaHVlU3RlcCA9IDI7IC8vIOiJsuebuOmYtuair1xudmFyIHNhdHVyYXRpb25TdGVwID0gMC4xNjsgLy8g6aWx5ZKM5bqm6Zi25qKv77yM5rWF6Imy6YOo5YiGXG52YXIgc2F0dXJhdGlvblN0ZXAyID0gMC4wNTsgLy8g6aWx5ZKM5bqm6Zi25qKv77yM5rex6Imy6YOo5YiGXG52YXIgYnJpZ2h0bmVzc1N0ZXAxID0gMC4wNTsgLy8g5Lqu5bqm6Zi25qKv77yM5rWF6Imy6YOo5YiGXG52YXIgYnJpZ2h0bmVzc1N0ZXAyID0gMC4xNTsgLy8g5Lqu5bqm6Zi25qKv77yM5rex6Imy6YOo5YiGXG52YXIgbGlnaHRDb2xvckNvdW50ID0gNTsgLy8g5rWF6Imy5pWw6YeP77yM5Li76Imy5LiKXG52YXIgZGFya0NvbG9yQ291bnQgPSA0OyAvLyDmt7HoibLmlbDph4/vvIzkuLvoibLkuItcbi8vIOaal+iJsuS4u+mimOminOiJsuaYoOWwhOWFs+ezu+ihqFxudmFyIGRhcmtDb2xvck1hcCA9IFt7XG4gIGluZGV4OiA3LFxuICBvcGFjaXR5OiAwLjE1XG59LCB7XG4gIGluZGV4OiA2LFxuICBvcGFjaXR5OiAwLjI1XG59LCB7XG4gIGluZGV4OiA1LFxuICBvcGFjaXR5OiAwLjNcbn0sIHtcbiAgaW5kZXg6IDUsXG4gIG9wYWNpdHk6IDAuNDVcbn0sIHtcbiAgaW5kZXg6IDUsXG4gIG9wYWNpdHk6IDAuNjVcbn0sIHtcbiAgaW5kZXg6IDUsXG4gIG9wYWNpdHk6IDAuODVcbn0sIHtcbiAgaW5kZXg6IDQsXG4gIG9wYWNpdHk6IDAuOVxufSwge1xuICBpbmRleDogMyxcbiAgb3BhY2l0eTogMC45NVxufSwge1xuICBpbmRleDogMixcbiAgb3BhY2l0eTogMC45N1xufSwge1xuICBpbmRleDogMSxcbiAgb3BhY2l0eTogMC45OFxufV07XG4vLyBXcmFwcGVyIGZ1bmN0aW9uIHBvcnRlZCBmcm9tIFRpbnlDb2xvci5wcm90b3R5cGUudG9Ic3Zcbi8vIEtlZXAgaXQgaGVyZSBiZWNhdXNlIG9mIGBoc3YuaCAqIDM2MGBcbmZ1bmN0aW9uIHRvSHN2KF9yZWYpIHtcbiAgdmFyIHIgPSBfcmVmLnIsXG4gICAgZyA9IF9yZWYuZyxcbiAgICBiID0gX3JlZi5iO1xuICB2YXIgaHN2ID0gcmdiVG9Ic3YociwgZywgYik7XG4gIHJldHVybiB7XG4gICAgaDogaHN2LmggKiAzNjAsXG4gICAgczogaHN2LnMsXG4gICAgdjogaHN2LnZcbiAgfTtcbn1cblxuLy8gV3JhcHBlciBmdW5jdGlvbiBwb3J0ZWQgZnJvbSBUaW55Q29sb3IucHJvdG90eXBlLnRvSGV4U3RyaW5nXG4vLyBLZWVwIGl0IGhlcmUgYmVjYXVzZSBvZiB0aGUgcHJlZml4IGAjYFxuZnVuY3Rpb24gdG9IZXgoX3JlZjIpIHtcbiAgdmFyIHIgPSBfcmVmMi5yLFxuICAgIGcgPSBfcmVmMi5nLFxuICAgIGIgPSBfcmVmMi5iO1xuICByZXR1cm4gXCIjXCIuY29uY2F0KHJnYlRvSGV4KHIsIGcsIGIsIGZhbHNlKSk7XG59XG5cbi8vIFdyYXBwZXIgZnVuY3Rpb24gcG9ydGVkIGZyb20gVGlueUNvbG9yLnByb3RvdHlwZS5taXgsIG5vdCB0cmVlc2hha2FibGUuXG4vLyBBbW91bnQgaW4gcmFuZ2UgWzAsIDFdXG4vLyBBc3N1bWUgY29sb3IxICYgY29sb3IyIGhhcyBubyBhbHBoYSwgc2luY2UgdGhlIGZvbGxvd2luZyBzcmMgY29kZSBkaWQgc28uXG5mdW5jdGlvbiBtaXgocmdiMSwgcmdiMiwgYW1vdW50KSB7XG4gIHZhciBwID0gYW1vdW50IC8gMTAwO1xuICB2YXIgcmdiID0ge1xuICAgIHI6IChyZ2IyLnIgLSByZ2IxLnIpICogcCArIHJnYjEucixcbiAgICBnOiAocmdiMi5nIC0gcmdiMS5nKSAqIHAgKyByZ2IxLmcsXG4gICAgYjogKHJnYjIuYiAtIHJnYjEuYikgKiBwICsgcmdiMS5iXG4gIH07XG4gIHJldHVybiByZ2I7XG59XG5mdW5jdGlvbiBnZXRIdWUoaHN2LCBpLCBsaWdodCkge1xuICB2YXIgaHVlO1xuICAvLyDmoLnmja7oibLnm7jkuI3lkIzvvIzoibLnm7jovazlkJHkuI3lkIxcbiAgaWYgKE1hdGgucm91bmQoaHN2LmgpID49IDYwICYmIE1hdGgucm91bmQoaHN2LmgpIDw9IDI0MCkge1xuICAgIGh1ZSA9IGxpZ2h0ID8gTWF0aC5yb3VuZChoc3YuaCkgLSBodWVTdGVwICogaSA6IE1hdGgucm91bmQoaHN2LmgpICsgaHVlU3RlcCAqIGk7XG4gIH0gZWxzZSB7XG4gICAgaHVlID0gbGlnaHQgPyBNYXRoLnJvdW5kKGhzdi5oKSArIGh1ZVN0ZXAgKiBpIDogTWF0aC5yb3VuZChoc3YuaCkgLSBodWVTdGVwICogaTtcbiAgfVxuICBpZiAoaHVlIDwgMCkge1xuICAgIGh1ZSArPSAzNjA7XG4gIH0gZWxzZSBpZiAoaHVlID49IDM2MCkge1xuICAgIGh1ZSAtPSAzNjA7XG4gIH1cbiAgcmV0dXJuIGh1ZTtcbn1cbmZ1bmN0aW9uIGdldFNhdHVyYXRpb24oaHN2LCBpLCBsaWdodCkge1xuICAvLyBncmV5IGNvbG9yIGRvbid0IGNoYW5nZSBzYXR1cmF0aW9uXG4gIGlmIChoc3YuaCA9PT0gMCAmJiBoc3YucyA9PT0gMCkge1xuICAgIHJldHVybiBoc3YucztcbiAgfVxuICB2YXIgc2F0dXJhdGlvbjtcbiAgaWYgKGxpZ2h0KSB7XG4gICAgc2F0dXJhdGlvbiA9IGhzdi5zIC0gc2F0dXJhdGlvblN0ZXAgKiBpO1xuICB9IGVsc2UgaWYgKGkgPT09IGRhcmtDb2xvckNvdW50KSB7XG4gICAgc2F0dXJhdGlvbiA9IGhzdi5zICsgc2F0dXJhdGlvblN0ZXA7XG4gIH0gZWxzZSB7XG4gICAgc2F0dXJhdGlvbiA9IGhzdi5zICsgc2F0dXJhdGlvblN0ZXAyICogaTtcbiAgfVxuICAvLyDovrnnlYzlgLzkv67mraNcbiAgaWYgKHNhdHVyYXRpb24gPiAxKSB7XG4gICAgc2F0dXJhdGlvbiA9IDE7XG4gIH1cbiAgLy8g56ys5LiA5qC855qEIHMg6ZmQ5Yi25ZyoIDAuMDYtMC4xIOS5i+mXtFxuICBpZiAobGlnaHQgJiYgaSA9PT0gbGlnaHRDb2xvckNvdW50ICYmIHNhdHVyYXRpb24gPiAwLjEpIHtcbiAgICBzYXR1cmF0aW9uID0gMC4xO1xuICB9XG4gIGlmIChzYXR1cmF0aW9uIDwgMC4wNikge1xuICAgIHNhdHVyYXRpb24gPSAwLjA2O1xuICB9XG4gIHJldHVybiBOdW1iZXIoc2F0dXJhdGlvbi50b0ZpeGVkKDIpKTtcbn1cbmZ1bmN0aW9uIGdldFZhbHVlKGhzdiwgaSwgbGlnaHQpIHtcbiAgdmFyIHZhbHVlO1xuICBpZiAobGlnaHQpIHtcbiAgICB2YWx1ZSA9IGhzdi52ICsgYnJpZ2h0bmVzc1N0ZXAxICogaTtcbiAgfSBlbHNlIHtcbiAgICB2YWx1ZSA9IGhzdi52IC0gYnJpZ2h0bmVzc1N0ZXAyICogaTtcbiAgfVxuICBpZiAodmFsdWUgPiAxKSB7XG4gICAgdmFsdWUgPSAxO1xuICB9XG4gIHJldHVybiBOdW1iZXIodmFsdWUudG9GaXhlZCgyKSk7XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZW5lcmF0ZShjb2xvcikge1xuICB2YXIgb3B0cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gIHZhciBwYXR0ZXJucyA9IFtdO1xuICB2YXIgcENvbG9yID0gaW5wdXRUb1JHQihjb2xvcik7XG4gIGZvciAodmFyIGkgPSBsaWdodENvbG9yQ291bnQ7IGkgPiAwOyBpIC09IDEpIHtcbiAgICB2YXIgaHN2ID0gdG9Ic3YocENvbG9yKTtcbiAgICB2YXIgY29sb3JTdHJpbmcgPSB0b0hleChpbnB1dFRvUkdCKHtcbiAgICAgIGg6IGdldEh1ZShoc3YsIGksIHRydWUpLFxuICAgICAgczogZ2V0U2F0dXJhdGlvbihoc3YsIGksIHRydWUpLFxuICAgICAgdjogZ2V0VmFsdWUoaHN2LCBpLCB0cnVlKVxuICAgIH0pKTtcbiAgICBwYXR0ZXJucy5wdXNoKGNvbG9yU3RyaW5nKTtcbiAgfVxuICBwYXR0ZXJucy5wdXNoKHRvSGV4KHBDb2xvcikpO1xuICBmb3IgKHZhciBfaSA9IDE7IF9pIDw9IGRhcmtDb2xvckNvdW50OyBfaSArPSAxKSB7XG4gICAgdmFyIF9oc3YgPSB0b0hzdihwQ29sb3IpO1xuICAgIHZhciBfY29sb3JTdHJpbmcgPSB0b0hleChpbnB1dFRvUkdCKHtcbiAgICAgIGg6IGdldEh1ZShfaHN2LCBfaSksXG4gICAgICBzOiBnZXRTYXR1cmF0aW9uKF9oc3YsIF9pKSxcbiAgICAgIHY6IGdldFZhbHVlKF9oc3YsIF9pKVxuICAgIH0pKTtcbiAgICBwYXR0ZXJucy5wdXNoKF9jb2xvclN0cmluZyk7XG4gIH1cblxuICAvLyBkYXJrIHRoZW1lIHBhdHRlcm5zXG4gIGlmIChvcHRzLnRoZW1lID09PSAnZGFyaycpIHtcbiAgICByZXR1cm4gZGFya0NvbG9yTWFwLm1hcChmdW5jdGlvbiAoX3JlZjMpIHtcbiAgICAgIHZhciBpbmRleCA9IF9yZWYzLmluZGV4LFxuICAgICAgICBvcGFjaXR5ID0gX3JlZjMub3BhY2l0eTtcbiAgICAgIHZhciBkYXJrQ29sb3JTdHJpbmcgPSB0b0hleChtaXgoaW5wdXRUb1JHQihvcHRzLmJhY2tncm91bmRDb2xvciB8fCAnIzE0MTQxNCcpLCBpbnB1dFRvUkdCKHBhdHRlcm5zW2luZGV4XSksIG9wYWNpdHkgKiAxMDApKTtcbiAgICAgIHJldHVybiBkYXJrQ29sb3JTdHJpbmc7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHBhdHRlcm5zO1xufSIsImV4cG9ydCB7IGRlZmF1bHQgYXMgZ2VuZXJhdGUgfSBmcm9tIFwiLi9nZW5lcmF0ZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vcHJlc2V0c1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vdHlwZXNcIjsiLCIvLyBHZW5lcmF0ZWQgYnkgc2NyaXB0LiBEbyBOT1QgbW9kaWZ5IVxuXG5leHBvcnQgdmFyIHByZXNldFByaW1hcnlDb2xvcnMgPSB7XG4gIFwicmVkXCI6IFwiI0Y1MjIyRFwiLFxuICBcInZvbGNhbm9cIjogXCIjRkE1NDFDXCIsXG4gIFwib3JhbmdlXCI6IFwiI0ZBOEMxNlwiLFxuICBcImdvbGRcIjogXCIjRkFBRDE0XCIsXG4gIFwieWVsbG93XCI6IFwiI0ZBREIxNFwiLFxuICBcImxpbWVcIjogXCIjQTBEOTExXCIsXG4gIFwiZ3JlZW5cIjogXCIjNTJDNDFBXCIsXG4gIFwiY3lhblwiOiBcIiMxM0MyQzJcIixcbiAgXCJibHVlXCI6IFwiIzE2NzdGRlwiLFxuICBcImdlZWtibHVlXCI6IFwiIzJGNTRFQlwiLFxuICBcInB1cnBsZVwiOiBcIiM3MjJFRDFcIixcbiAgXCJtYWdlbnRhXCI6IFwiI0VCMkY5NlwiLFxuICBcImdyZXlcIjogXCIjNjY2NjY2XCJcbn07XG5leHBvcnQgdmFyIHJlZCA9IFtcIiNmZmYxZjBcIiwgXCIjZmZjY2M3XCIsIFwiI2ZmYTM5ZVwiLCBcIiNmZjc4NzVcIiwgXCIjZmY0ZDRmXCIsIFwiI2Y1MjIyZFwiLCBcIiNjZjEzMjJcIiwgXCIjYTgwNzFhXCIsIFwiIzgyMDAxNFwiLCBcIiM1YzAwMTFcIl07XG5yZWQucHJpbWFyeSA9IHJlZFs1XTtcbmV4cG9ydCB2YXIgdm9sY2FubyA9IFtcIiNmZmYyZThcIiwgXCIjZmZkOGJmXCIsIFwiI2ZmYmI5NlwiLCBcIiNmZjljNmVcIiwgXCIjZmY3YTQ1XCIsIFwiI2ZhNTQxY1wiLCBcIiNkNDM4MGRcIiwgXCIjYWQyMTAyXCIsIFwiIzg3MTQwMFwiLCBcIiM2MTBiMDBcIl07XG52b2xjYW5vLnByaW1hcnkgPSB2b2xjYW5vWzVdO1xuZXhwb3J0IHZhciBvcmFuZ2UgPSBbXCIjZmZmN2U2XCIsIFwiI2ZmZTdiYVwiLCBcIiNmZmQ1OTFcIiwgXCIjZmZjMDY5XCIsIFwiI2ZmYTk0MFwiLCBcIiNmYThjMTZcIiwgXCIjZDQ2YjA4XCIsIFwiI2FkNGUwMFwiLCBcIiM4NzM4MDBcIiwgXCIjNjEyNTAwXCJdO1xub3JhbmdlLnByaW1hcnkgPSBvcmFuZ2VbNV07XG5leHBvcnQgdmFyIGdvbGQgPSBbXCIjZmZmYmU2XCIsIFwiI2ZmZjFiOFwiLCBcIiNmZmU1OGZcIiwgXCIjZmZkNjY2XCIsIFwiI2ZmYzUzZFwiLCBcIiNmYWFkMTRcIiwgXCIjZDQ4ODA2XCIsIFwiI2FkNjgwMFwiLCBcIiM4NzRkMDBcIiwgXCIjNjEzNDAwXCJdO1xuZ29sZC5wcmltYXJ5ID0gZ29sZFs1XTtcbmV4cG9ydCB2YXIgeWVsbG93ID0gW1wiI2ZlZmZlNlwiLCBcIiNmZmZmYjhcIiwgXCIjZmZmYjhmXCIsIFwiI2ZmZjU2NlwiLCBcIiNmZmVjM2RcIiwgXCIjZmFkYjE0XCIsIFwiI2Q0YjEwNlwiLCBcIiNhZDhiMDBcIiwgXCIjODc2ODAwXCIsIFwiIzYxNDcwMFwiXTtcbnllbGxvdy5wcmltYXJ5ID0geWVsbG93WzVdO1xuZXhwb3J0IHZhciBsaW1lID0gW1wiI2ZjZmZlNlwiLCBcIiNmNGZmYjhcIiwgXCIjZWFmZjhmXCIsIFwiI2QzZjI2MVwiLCBcIiNiYWU2MzdcIiwgXCIjYTBkOTExXCIsIFwiIzdjYjMwNVwiLCBcIiM1YjhjMDBcIiwgXCIjM2Y2NjAwXCIsIFwiIzI1NDAwMFwiXTtcbmxpbWUucHJpbWFyeSA9IGxpbWVbNV07XG5leHBvcnQgdmFyIGdyZWVuID0gW1wiI2Y2ZmZlZFwiLCBcIiNkOWY3YmVcIiwgXCIjYjdlYjhmXCIsIFwiIzk1ZGU2NFwiLCBcIiM3M2QxM2RcIiwgXCIjNTJjNDFhXCIsIFwiIzM4OWUwZFwiLCBcIiMyMzc4MDRcIiwgXCIjMTM1MjAwXCIsIFwiIzA5MmIwMFwiXTtcbmdyZWVuLnByaW1hcnkgPSBncmVlbls1XTtcbmV4cG9ydCB2YXIgY3lhbiA9IFtcIiNlNmZmZmJcIiwgXCIjYjVmNWVjXCIsIFwiIzg3ZThkZVwiLCBcIiM1Y2RiZDNcIiwgXCIjMzZjZmM5XCIsIFwiIzEzYzJjMlwiLCBcIiMwODk3OWNcIiwgXCIjMDA2ZDc1XCIsIFwiIzAwNDc0ZlwiLCBcIiMwMDIzMjlcIl07XG5jeWFuLnByaW1hcnkgPSBjeWFuWzVdO1xuZXhwb3J0IHZhciBibHVlID0gW1wiI2U2ZjRmZlwiLCBcIiNiYWUwZmZcIiwgXCIjOTFjYWZmXCIsIFwiIzY5YjFmZlwiLCBcIiM0MDk2ZmZcIiwgXCIjMTY3N2ZmXCIsIFwiIzA5NThkOVwiLCBcIiMwMDNlYjNcIiwgXCIjMDAyYzhjXCIsIFwiIzAwMWQ2NlwiXTtcbmJsdWUucHJpbWFyeSA9IGJsdWVbNV07XG5leHBvcnQgdmFyIGdlZWtibHVlID0gW1wiI2YwZjVmZlwiLCBcIiNkNmU0ZmZcIiwgXCIjYWRjNmZmXCIsIFwiIzg1YTVmZlwiLCBcIiM1OTdlZjdcIiwgXCIjMmY1NGViXCIsIFwiIzFkMzljNFwiLCBcIiMxMDIzOWVcIiwgXCIjMDYxMTc4XCIsIFwiIzAzMDg1MlwiXTtcbmdlZWtibHVlLnByaW1hcnkgPSBnZWVrYmx1ZVs1XTtcbmV4cG9ydCB2YXIgcHVycGxlID0gW1wiI2Y5ZjBmZlwiLCBcIiNlZmRiZmZcIiwgXCIjZDNhZGY3XCIsIFwiI2IzN2ZlYlwiLCBcIiM5MjU0ZGVcIiwgXCIjNzIyZWQxXCIsIFwiIzUzMWRhYlwiLCBcIiMzOTEwODVcIiwgXCIjMjIwNzVlXCIsIFwiIzEyMDMzOFwiXTtcbnB1cnBsZS5wcmltYXJ5ID0gcHVycGxlWzVdO1xuZXhwb3J0IHZhciBtYWdlbnRhID0gW1wiI2ZmZjBmNlwiLCBcIiNmZmQ2ZTdcIiwgXCIjZmZhZGQyXCIsIFwiI2ZmODVjMFwiLCBcIiNmNzU5YWJcIiwgXCIjZWIyZjk2XCIsIFwiI2M0MWQ3ZlwiLCBcIiM5ZTEwNjhcIiwgXCIjNzgwNjUwXCIsIFwiIzUyMDMzOVwiXTtcbm1hZ2VudGEucHJpbWFyeSA9IG1hZ2VudGFbNV07XG5leHBvcnQgdmFyIGdyZXkgPSBbXCIjYTZhNmE2XCIsIFwiIzk5OTk5OVwiLCBcIiM4YzhjOGNcIiwgXCIjODA4MDgwXCIsIFwiIzczNzM3M1wiLCBcIiM2NjY2NjZcIiwgXCIjNDA0MDQwXCIsIFwiIzFhMWExYVwiLCBcIiMwMDAwMDBcIiwgXCIjMDAwMDAwXCJdO1xuZ3JleS5wcmltYXJ5ID0gZ3JleVs1XTtcbmV4cG9ydCB2YXIgZ3JheSA9IGdyZXk7XG5leHBvcnQgdmFyIHByZXNldFBhbGV0dGVzID0ge1xuICByZWQ6IHJlZCxcbiAgdm9sY2Fubzogdm9sY2FubyxcbiAgb3JhbmdlOiBvcmFuZ2UsXG4gIGdvbGQ6IGdvbGQsXG4gIHllbGxvdzogeWVsbG93LFxuICBsaW1lOiBsaW1lLFxuICBncmVlbjogZ3JlZW4sXG4gIGN5YW46IGN5YW4sXG4gIGJsdWU6IGJsdWUsXG4gIGdlZWtibHVlOiBnZWVrYmx1ZSxcbiAgcHVycGxlOiBwdXJwbGUsXG4gIG1hZ2VudGE6IG1hZ2VudGEsXG4gIGdyZXk6IGdyZXlcbn07XG5leHBvcnQgdmFyIHJlZERhcmsgPSBbXCIjMmExMjE1XCIsIFwiIzQzMTQxOFwiLCBcIiM1ODE4MWNcIiwgXCIjNzkxYTFmXCIsIFwiI2E2MWQyNFwiLCBcIiNkMzIwMjlcIiwgXCIjZTg0NzQ5XCIsIFwiI2YzNzM3MFwiLCBcIiNmODlmOWFcIiwgXCIjZmFjOGMzXCJdO1xucmVkRGFyay5wcmltYXJ5ID0gcmVkRGFya1s1XTtcbmV4cG9ydCB2YXIgdm9sY2Fub0RhcmsgPSBbXCIjMmIxNjExXCIsIFwiIzQ0MWQxMlwiLCBcIiM1OTI3MTZcIiwgXCIjN2MzMTE4XCIsIFwiI2FhM2UxOVwiLCBcIiNkODRhMWJcIiwgXCIjZTg3MDQwXCIsIFwiI2YzOTU2YVwiLCBcIiNmOGI2OTJcIiwgXCIjZmFkNGJjXCJdO1xudm9sY2Fub0RhcmsucHJpbWFyeSA9IHZvbGNhbm9EYXJrWzVdO1xuZXhwb3J0IHZhciBvcmFuZ2VEYXJrID0gW1wiIzJiMWQxMVwiLCBcIiM0NDJhMTFcIiwgXCIjNTkzODE1XCIsIFwiIzdjNGExNVwiLCBcIiNhYTYyMTVcIiwgXCIjZDg3YTE2XCIsIFwiI2U4OWEzY1wiLCBcIiNmM2I3NjVcIiwgXCIjZjhjZjhkXCIsIFwiI2ZhZTNiN1wiXTtcbm9yYW5nZURhcmsucHJpbWFyeSA9IG9yYW5nZURhcmtbNV07XG5leHBvcnQgdmFyIGdvbGREYXJrID0gW1wiIzJiMjExMVwiLCBcIiM0NDMxMTFcIiwgXCIjNTk0MjE0XCIsIFwiIzdjNTkxNFwiLCBcIiNhYTc3MTRcIiwgXCIjZDg5NjE0XCIsIFwiI2U4YjMzOVwiLCBcIiNmM2NjNjJcIiwgXCIjZjhkZjhiXCIsIFwiI2ZhZWRiNVwiXTtcbmdvbGREYXJrLnByaW1hcnkgPSBnb2xkRGFya1s1XTtcbmV4cG9ydCB2YXIgeWVsbG93RGFyayA9IFtcIiMyYjI2MTFcIiwgXCIjNDQzYjExXCIsIFwiIzU5NTAxNFwiLCBcIiM3YzZlMTRcIiwgXCIjYWE5NTE0XCIsIFwiI2Q4YmQxNFwiLCBcIiNlOGQ2MzlcIiwgXCIjZjNlYTYyXCIsIFwiI2Y4ZjQ4YlwiLCBcIiNmYWZhYjVcIl07XG55ZWxsb3dEYXJrLnByaW1hcnkgPSB5ZWxsb3dEYXJrWzVdO1xuZXhwb3J0IHZhciBsaW1lRGFyayA9IFtcIiMxZjI2MTFcIiwgXCIjMmUzYzEwXCIsIFwiIzNlNGYxM1wiLCBcIiM1MzZkMTNcIiwgXCIjNmY5NDEyXCIsIFwiIzhiYmIxMVwiLCBcIiNhOWQxMzRcIiwgXCIjYzllNzVkXCIsIFwiI2U0Zjg4YlwiLCBcIiNmMGZhYjVcIl07XG5saW1lRGFyay5wcmltYXJ5ID0gbGltZURhcmtbNV07XG5leHBvcnQgdmFyIGdyZWVuRGFyayA9IFtcIiMxNjIzMTJcIiwgXCIjMWQzNzEyXCIsIFwiIzI3NDkxNlwiLCBcIiMzMDYzMTdcIiwgXCIjM2M4NjE4XCIsIFwiIzQ5YWExOVwiLCBcIiM2YWJlMzlcIiwgXCIjOGZkNDYwXCIsIFwiI2IyZTU4YlwiLCBcIiNkNWYyYmJcIl07XG5ncmVlbkRhcmsucHJpbWFyeSA9IGdyZWVuRGFya1s1XTtcbmV4cG9ydCB2YXIgY3lhbkRhcmsgPSBbXCIjMTEyMTIzXCIsIFwiIzExMzUzNlwiLCBcIiMxNDQ4NDhcIiwgXCIjMTQ2MjYyXCIsIFwiIzEzODU4NVwiLCBcIiMxM2E4YThcIiwgXCIjMzNiY2I3XCIsIFwiIzU4ZDFjOVwiLCBcIiM4NGUyZDhcIiwgXCIjYjJmMWU4XCJdO1xuY3lhbkRhcmsucHJpbWFyeSA9IGN5YW5EYXJrWzVdO1xuZXhwb3J0IHZhciBibHVlRGFyayA9IFtcIiMxMTFhMmNcIiwgXCIjMTEyNTQ1XCIsIFwiIzE1MzI1YlwiLCBcIiMxNTQxN2VcIiwgXCIjMTU1NGFkXCIsIFwiIzE2NjhkY1wiLCBcIiMzYzg5ZThcIiwgXCIjNjVhOWYzXCIsIFwiIzhkYzVmOFwiLCBcIiNiN2RjZmFcIl07XG5ibHVlRGFyay5wcmltYXJ5ID0gYmx1ZURhcmtbNV07XG5leHBvcnQgdmFyIGdlZWtibHVlRGFyayA9IFtcIiMxMzE2MjlcIiwgXCIjMTYxZDQwXCIsIFwiIzFjMjc1NVwiLCBcIiMyMDMxNzVcIiwgXCIjMjYzZWEwXCIsIFwiIzJiNGFjYlwiLCBcIiM1MjczZTBcIiwgXCIjN2Y5ZWYzXCIsIFwiI2E4YzFmOFwiLCBcIiNkMmUwZmFcIl07XG5nZWVrYmx1ZURhcmsucHJpbWFyeSA9IGdlZWtibHVlRGFya1s1XTtcbmV4cG9ydCB2YXIgcHVycGxlRGFyayA9IFtcIiMxYTEzMjVcIiwgXCIjMjQxNjNhXCIsIFwiIzMwMWM0ZFwiLCBcIiMzZTIwNjlcIiwgXCIjNTEyNThmXCIsIFwiIzY0MmFiNVwiLCBcIiM4NTRlY2FcIiwgXCIjYWI3YWUwXCIsIFwiI2NkYThmMFwiLCBcIiNlYmQ3ZmFcIl07XG5wdXJwbGVEYXJrLnByaW1hcnkgPSBwdXJwbGVEYXJrWzVdO1xuZXhwb3J0IHZhciBtYWdlbnRhRGFyayA9IFtcIiMyOTEzMjFcIiwgXCIjNDAxNjJmXCIsIFwiIzU1MWMzYlwiLCBcIiM3NTIwNGZcIiwgXCIjYTAyNjY5XCIsIFwiI2NiMmI4M1wiLCBcIiNlMDUyOWNcIiwgXCIjZjM3ZmI3XCIsIFwiI2Y4YThjY1wiLCBcIiNmYWQyZTNcIl07XG5tYWdlbnRhRGFyay5wcmltYXJ5ID0gbWFnZW50YURhcmtbNV07XG5leHBvcnQgdmFyIGdyZXlEYXJrID0gW1wiIzE1MTUxNVwiLCBcIiMxZjFmMWZcIiwgXCIjMmQyZDJkXCIsIFwiIzM5MzkzOVwiLCBcIiM0OTQ5NDlcIiwgXCIjNWE1YTVhXCIsIFwiIzZhNmE2YVwiLCBcIiM3YjdiN2JcIiwgXCIjODg4ODg4XCIsIFwiIzk2OTY5NlwiXTtcbmdyZXlEYXJrLnByaW1hcnkgPSBncmV5RGFya1s1XTtcbmV4cG9ydCB2YXIgcHJlc2V0RGFya1BhbGV0dGVzID0ge1xuICByZWQ6IHJlZERhcmssXG4gIHZvbGNhbm86IHZvbGNhbm9EYXJrLFxuICBvcmFuZ2U6IG9yYW5nZURhcmssXG4gIGdvbGQ6IGdvbGREYXJrLFxuICB5ZWxsb3c6IHllbGxvd0RhcmssXG4gIGxpbWU6IGxpbWVEYXJrLFxuICBncmVlbjogZ3JlZW5EYXJrLFxuICBjeWFuOiBjeWFuRGFyayxcbiAgYmx1ZTogYmx1ZURhcmssXG4gIGdlZWtibHVlOiBnZWVrYmx1ZURhcmssXG4gIHB1cnBsZTogcHVycGxlRGFyayxcbiAgbWFnZW50YTogbWFnZW50YURhcmssXG4gIGdyZXk6IGdyZXlEYXJrXG59OyIsIi8vIFRoaXMgaWNvbiBmaWxlIGlzIGdlbmVyYXRlZCBhdXRvbWF0aWNhbGx5LlxudmFyIENsb3NlT3V0bGluZWQgPSB7IFwiaWNvblwiOiB7IFwidGFnXCI6IFwic3ZnXCIsIFwiYXR0cnNcIjogeyBcImZpbGwtcnVsZVwiOiBcImV2ZW5vZGRcIiwgXCJ2aWV3Qm94XCI6IFwiNjQgNjQgODk2IDg5NlwiLCBcImZvY3VzYWJsZVwiOiBcImZhbHNlXCIgfSwgXCJjaGlsZHJlblwiOiBbeyBcInRhZ1wiOiBcInBhdGhcIiwgXCJhdHRyc1wiOiB7IFwiZFwiOiBcIk03OTkuODYgMTY2LjMxYy4wMiAwIC4wNC4wMi4wOC4wNmw1Ny42OSA1Ny43Yy4wNC4wMy4wNS4wNS4wNi4wOGEuMTIuMTIgMCAwMTAgLjA2YzAgLjAzLS4wMi4wNS0uMDYuMDlMNTY5LjkzIDUxMmwyODcuNyAyODcuN2MuMDQuMDQuMDUuMDYuMDYuMDlhLjEyLjEyIDAgMDEwIC4wN2MwIC4wMi0uMDIuMDQtLjA2LjA4bC01Ny43IDU3LjY5Yy0uMDMuMDQtLjA1LjA1LS4wNy4wNmEuMTIuMTIgMCAwMS0uMDcgMGMtLjAzIDAtLjA1LS4wMi0uMDktLjA2TDUxMiA1NjkuOTNsLTI4Ny43IDI4Ny43Yy0uMDQuMDQtLjA2LjA1LS4wOS4wNmEuMTIuMTIgMCAwMS0uMDcgMGMtLjAyIDAtLjA0LS4wMi0uMDgtLjA2bC01Ny42OS01Ny43Yy0uMDQtLjAzLS4wNS0uMDUtLjA2LS4wN2EuMTIuMTIgMCAwMTAtLjA3YzAtLjAzLjAyLS4wNS4wNi0uMDlMNDU0LjA3IDUxMmwtMjg3LjctMjg3LjdjLS4wNC0uMDQtLjA1LS4wNi0uMDYtLjA5YS4xMi4xMiAwIDAxMC0uMDdjMC0uMDIuMDItLjA0LjA2LS4wOGw1Ny43LTU3LjY5Yy4wMy0uMDQuMDUtLjA1LjA3LS4wNmEuMTIuMTIgMCAwMS4wNyAwYy4wMyAwIC4wNS4wMi4wOS4wNkw1MTIgNDU0LjA3bDI4Ny43LTI4Ny43Yy4wNC0uMDQuMDYtLjA1LjA5LS4wNmEuMTIuMTIgMCAwMS4wNyAwelwiIH0gfV0gfSwgXCJuYW1lXCI6IFwiY2xvc2VcIiwgXCJ0aGVtZVwiOiBcIm91dGxpbmVkXCIgfTtcbmV4cG9ydCBkZWZhdWx0IENsb3NlT3V0bGluZWQ7XG4iLCIndXNlIGNsaWVudCc7XG5cbmltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kc1wiO1xuaW1wb3J0IF9zbGljZWRUb0FycmF5IGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9zbGljZWRUb0FycmF5XCI7XG5pbXBvcnQgX2RlZmluZVByb3BlcnR5IGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9kZWZpbmVQcm9wZXJ0eVwiO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNcIjtcbnZhciBfZXhjbHVkZWQgPSBbXCJjbGFzc05hbWVcIiwgXCJpY29uXCIsIFwic3BpblwiLCBcInJvdGF0ZVwiLCBcInRhYkluZGV4XCIsIFwib25DbGlja1wiLCBcInR3b1RvbmVDb2xvclwiXTtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgYmx1ZSB9IGZyb20gJ0BhbnQtZGVzaWduL2NvbG9ycyc7XG5pbXBvcnQgQ29udGV4dCBmcm9tIFwiLi9Db250ZXh0XCI7XG5pbXBvcnQgUmVhY3RJY29uIGZyb20gXCIuL0ljb25CYXNlXCI7XG5pbXBvcnQgeyBnZXRUd29Ub25lQ29sb3IsIHNldFR3b1RvbmVDb2xvciB9IGZyb20gXCIuL3R3b1RvbmVQcmltYXJ5Q29sb3JcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZVR3b1RvbmVDb2xvcnMgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbi8vIEluaXRpYWwgc2V0dGluZ1xuLy8gc2hvdWxkIG1vdmUgaXQgdG8gYW50ZCBtYWluIHJlcG8/XG5zZXRUd29Ub25lQ29sb3IoYmx1ZS5wcmltYXJ5KTtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL0RlZmluaXRlbHlUeXBlZC9EZWZpbml0ZWx5VHlwZWQvaXNzdWVzLzM0NzU3I2lzc3VlY29tbWVudC00ODg4NDg3MjBcblxudmFyIEljb24gPSAvKiNfX1BVUkVfXyovUmVhY3QuZm9yd2FyZFJlZihmdW5jdGlvbiAocHJvcHMsIHJlZikge1xuICB2YXIgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLFxuICAgIGljb24gPSBwcm9wcy5pY29uLFxuICAgIHNwaW4gPSBwcm9wcy5zcGluLFxuICAgIHJvdGF0ZSA9IHByb3BzLnJvdGF0ZSxcbiAgICB0YWJJbmRleCA9IHByb3BzLnRhYkluZGV4LFxuICAgIG9uQ2xpY2sgPSBwcm9wcy5vbkNsaWNrLFxuICAgIHR3b1RvbmVDb2xvciA9IHByb3BzLnR3b1RvbmVDb2xvcixcbiAgICByZXN0UHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMocHJvcHMsIF9leGNsdWRlZCk7XG4gIHZhciBfUmVhY3QkdXNlQ29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoQ29udGV4dCksXG4gICAgX1JlYWN0JHVzZUNvbnRleHQkcHJlID0gX1JlYWN0JHVzZUNvbnRleHQucHJlZml4Q2xzLFxuICAgIHByZWZpeENscyA9IF9SZWFjdCR1c2VDb250ZXh0JHByZSA9PT0gdm9pZCAwID8gJ2FudGljb24nIDogX1JlYWN0JHVzZUNvbnRleHQkcHJlLFxuICAgIHJvb3RDbGFzc05hbWUgPSBfUmVhY3QkdXNlQ29udGV4dC5yb290Q2xhc3NOYW1lO1xuICB2YXIgY2xhc3NTdHJpbmcgPSBjbGFzc05hbWVzKHJvb3RDbGFzc05hbWUsIHByZWZpeENscywgX2RlZmluZVByb3BlcnR5KF9kZWZpbmVQcm9wZXJ0eSh7fSwgXCJcIi5jb25jYXQocHJlZml4Q2xzLCBcIi1cIikuY29uY2F0KGljb24ubmFtZSksICEhaWNvbi5uYW1lKSwgXCJcIi5jb25jYXQocHJlZml4Q2xzLCBcIi1zcGluXCIpLCAhIXNwaW4gfHwgaWNvbi5uYW1lID09PSAnbG9hZGluZycpLCBjbGFzc05hbWUpO1xuICB2YXIgaWNvblRhYkluZGV4ID0gdGFiSW5kZXg7XG4gIGlmIChpY29uVGFiSW5kZXggPT09IHVuZGVmaW5lZCAmJiBvbkNsaWNrKSB7XG4gICAgaWNvblRhYkluZGV4ID0gLTE7XG4gIH1cbiAgdmFyIHN2Z1N0eWxlID0gcm90YXRlID8ge1xuICAgIG1zVHJhbnNmb3JtOiBcInJvdGF0ZShcIi5jb25jYXQocm90YXRlLCBcImRlZylcIiksXG4gICAgdHJhbnNmb3JtOiBcInJvdGF0ZShcIi5jb25jYXQocm90YXRlLCBcImRlZylcIilcbiAgfSA6IHVuZGVmaW5lZDtcbiAgdmFyIF9ub3JtYWxpemVUd29Ub25lQ29sbyA9IG5vcm1hbGl6ZVR3b1RvbmVDb2xvcnModHdvVG9uZUNvbG9yKSxcbiAgICBfbm9ybWFsaXplVHdvVG9uZUNvbG8yID0gX3NsaWNlZFRvQXJyYXkoX25vcm1hbGl6ZVR3b1RvbmVDb2xvLCAyKSxcbiAgICBwcmltYXJ5Q29sb3IgPSBfbm9ybWFsaXplVHdvVG9uZUNvbG8yWzBdLFxuICAgIHNlY29uZGFyeUNvbG9yID0gX25vcm1hbGl6ZVR3b1RvbmVDb2xvMlsxXTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCBfZXh0ZW5kcyh7XG4gICAgcm9sZTogXCJpbWdcIixcbiAgICBcImFyaWEtbGFiZWxcIjogaWNvbi5uYW1lXG4gIH0sIHJlc3RQcm9wcywge1xuICAgIHJlZjogcmVmLFxuICAgIHRhYkluZGV4OiBpY29uVGFiSW5kZXgsXG4gICAgb25DbGljazogb25DbGljayxcbiAgICBjbGFzc05hbWU6IGNsYXNzU3RyaW5nXG4gIH0pLCAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdEljb24sIHtcbiAgICBpY29uOiBpY29uLFxuICAgIHByaW1hcnlDb2xvcjogcHJpbWFyeUNvbG9yLFxuICAgIHNlY29uZGFyeUNvbG9yOiBzZWNvbmRhcnlDb2xvcixcbiAgICBzdHlsZTogc3ZnU3R5bGVcbiAgfSkpO1xufSk7XG5JY29uLmRpc3BsYXlOYW1lID0gJ0FudGRJY29uJztcbkljb24uZ2V0VHdvVG9uZUNvbG9yID0gZ2V0VHdvVG9uZUNvbG9yO1xuSWNvbi5zZXRUd29Ub25lQ29sb3IgPSBzZXRUd29Ub25lQ29sb3I7XG5leHBvcnQgZGVmYXVsdCBJY29uOyIsImltcG9ydCB7IGNyZWF0ZUNvbnRleHQgfSBmcm9tICdyZWFjdCc7XG52YXIgSWNvbkNvbnRleHQgPSAvKiNfX1BVUkVfXyovY3JlYXRlQ29udGV4dCh7fSk7XG5leHBvcnQgZGVmYXVsdCBJY29uQ29udGV4dDsiLCJpbXBvcnQgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc1wiO1xuaW1wb3J0IF9vYmplY3RTcHJlYWQgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL29iamVjdFNwcmVhZDJcIjtcbnZhciBfZXhjbHVkZWQgPSBbXCJpY29uXCIsIFwiY2xhc3NOYW1lXCIsIFwib25DbGlja1wiLCBcInN0eWxlXCIsIFwicHJpbWFyeUNvbG9yXCIsIFwic2Vjb25kYXJ5Q29sb3JcIl07XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBnZW5lcmF0ZSwgZ2V0U2Vjb25kYXJ5Q29sb3IsIGlzSWNvbkRlZmluaXRpb24sIHdhcm5pbmcsIHVzZUluc2VydFN0eWxlcyB9IGZyb20gXCIuLi91dGlsc1wiO1xudmFyIHR3b1RvbmVDb2xvclBhbGV0dGUgPSB7XG4gIHByaW1hcnlDb2xvcjogJyMzMzMnLFxuICBzZWNvbmRhcnlDb2xvcjogJyNFNkU2RTYnLFxuICBjYWxjdWxhdGVkOiBmYWxzZVxufTtcbmZ1bmN0aW9uIHNldFR3b1RvbmVDb2xvcnMoX3JlZikge1xuICB2YXIgcHJpbWFyeUNvbG9yID0gX3JlZi5wcmltYXJ5Q29sb3IsXG4gICAgc2Vjb25kYXJ5Q29sb3IgPSBfcmVmLnNlY29uZGFyeUNvbG9yO1xuICB0d29Ub25lQ29sb3JQYWxldHRlLnByaW1hcnlDb2xvciA9IHByaW1hcnlDb2xvcjtcbiAgdHdvVG9uZUNvbG9yUGFsZXR0ZS5zZWNvbmRhcnlDb2xvciA9IHNlY29uZGFyeUNvbG9yIHx8IGdldFNlY29uZGFyeUNvbG9yKHByaW1hcnlDb2xvcik7XG4gIHR3b1RvbmVDb2xvclBhbGV0dGUuY2FsY3VsYXRlZCA9ICEhc2Vjb25kYXJ5Q29sb3I7XG59XG5mdW5jdGlvbiBnZXRUd29Ub25lQ29sb3JzKCkge1xuICByZXR1cm4gX29iamVjdFNwcmVhZCh7fSwgdHdvVG9uZUNvbG9yUGFsZXR0ZSk7XG59XG52YXIgSWNvbkJhc2UgPSBmdW5jdGlvbiBJY29uQmFzZShwcm9wcykge1xuICB2YXIgaWNvbiA9IHByb3BzLmljb24sXG4gICAgY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lLFxuICAgIG9uQ2xpY2sgPSBwcm9wcy5vbkNsaWNrLFxuICAgIHN0eWxlID0gcHJvcHMuc3R5bGUsXG4gICAgcHJpbWFyeUNvbG9yID0gcHJvcHMucHJpbWFyeUNvbG9yLFxuICAgIHNlY29uZGFyeUNvbG9yID0gcHJvcHMuc2Vjb25kYXJ5Q29sb3IsXG4gICAgcmVzdFByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHByb3BzLCBfZXhjbHVkZWQpO1xuICB2YXIgc3ZnUmVmID0gUmVhY3QudXNlUmVmKCk7XG4gIHZhciBjb2xvcnMgPSB0d29Ub25lQ29sb3JQYWxldHRlO1xuICBpZiAocHJpbWFyeUNvbG9yKSB7XG4gICAgY29sb3JzID0ge1xuICAgICAgcHJpbWFyeUNvbG9yOiBwcmltYXJ5Q29sb3IsXG4gICAgICBzZWNvbmRhcnlDb2xvcjogc2Vjb25kYXJ5Q29sb3IgfHwgZ2V0U2Vjb25kYXJ5Q29sb3IocHJpbWFyeUNvbG9yKVxuICAgIH07XG4gIH1cbiAgdXNlSW5zZXJ0U3R5bGVzKHN2Z1JlZik7XG4gIHdhcm5pbmcoaXNJY29uRGVmaW5pdGlvbihpY29uKSwgXCJpY29uIHNob3VsZCBiZSBpY29uIGRlZmluaXRvbiwgYnV0IGdvdCBcIi5jb25jYXQoaWNvbikpO1xuICBpZiAoIWlzSWNvbkRlZmluaXRpb24oaWNvbikpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2YXIgdGFyZ2V0ID0gaWNvbjtcbiAgaWYgKHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0Lmljb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICB0YXJnZXQgPSBfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIHRhcmdldCksIHt9LCB7XG4gICAgICBpY29uOiB0YXJnZXQuaWNvbihjb2xvcnMucHJpbWFyeUNvbG9yLCBjb2xvcnMuc2Vjb25kYXJ5Q29sb3IpXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGdlbmVyYXRlKHRhcmdldC5pY29uLCBcInN2Zy1cIi5jb25jYXQodGFyZ2V0Lm5hbWUpLCBfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe1xuICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgIG9uQ2xpY2s6IG9uQ2xpY2ssXG4gICAgc3R5bGU6IHN0eWxlLFxuICAgICdkYXRhLWljb24nOiB0YXJnZXQubmFtZSxcbiAgICB3aWR0aDogJzFlbScsXG4gICAgaGVpZ2h0OiAnMWVtJyxcbiAgICBmaWxsOiAnY3VycmVudENvbG9yJyxcbiAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgfSwgcmVzdFByb3BzKSwge30sIHtcbiAgICByZWY6IHN2Z1JlZlxuICB9KSk7XG59O1xuSWNvbkJhc2UuZGlzcGxheU5hbWUgPSAnSWNvblJlYWN0Jztcbkljb25CYXNlLmdldFR3b1RvbmVDb2xvcnMgPSBnZXRUd29Ub25lQ29sb3JzO1xuSWNvbkJhc2Uuc2V0VHdvVG9uZUNvbG9ycyA9IHNldFR3b1RvbmVDb2xvcnM7XG5leHBvcnQgZGVmYXVsdCBJY29uQmFzZTsiLCJpbXBvcnQgX3NsaWNlZFRvQXJyYXkgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3NsaWNlZFRvQXJyYXlcIjtcbmltcG9ydCBSZWFjdEljb24gZnJvbSBcIi4vSWNvbkJhc2VcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZVR3b1RvbmVDb2xvcnMgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmV4cG9ydCBmdW5jdGlvbiBzZXRUd29Ub25lQ29sb3IodHdvVG9uZUNvbG9yKSB7XG4gIHZhciBfbm9ybWFsaXplVHdvVG9uZUNvbG8gPSBub3JtYWxpemVUd29Ub25lQ29sb3JzKHR3b1RvbmVDb2xvciksXG4gICAgX25vcm1hbGl6ZVR3b1RvbmVDb2xvMiA9IF9zbGljZWRUb0FycmF5KF9ub3JtYWxpemVUd29Ub25lQ29sbywgMiksXG4gICAgcHJpbWFyeUNvbG9yID0gX25vcm1hbGl6ZVR3b1RvbmVDb2xvMlswXSxcbiAgICBzZWNvbmRhcnlDb2xvciA9IF9ub3JtYWxpemVUd29Ub25lQ29sbzJbMV07XG4gIHJldHVybiBSZWFjdEljb24uc2V0VHdvVG9uZUNvbG9ycyh7XG4gICAgcHJpbWFyeUNvbG9yOiBwcmltYXJ5Q29sb3IsXG4gICAgc2Vjb25kYXJ5Q29sb3I6IHNlY29uZGFyeUNvbG9yXG4gIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldFR3b1RvbmVDb2xvcigpIHtcbiAgdmFyIGNvbG9ycyA9IFJlYWN0SWNvbi5nZXRUd29Ub25lQ29sb3JzKCk7XG4gIGlmICghY29sb3JzLmNhbGN1bGF0ZWQpIHtcbiAgICByZXR1cm4gY29sb3JzLnByaW1hcnlDb2xvcjtcbiAgfVxuICByZXR1cm4gW2NvbG9ycy5wcmltYXJ5Q29sb3IsIGNvbG9ycy5zZWNvbmRhcnlDb2xvcl07XG59IiwiaW1wb3J0IF9leHRlbmRzIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzXCI7XG4vLyBHRU5FUkFURSBCWSAuL3NjcmlwdHMvZ2VuZXJhdGUudHNcbi8vIERPTiBOT1QgRURJVCBJVCBNQU5VQUxMWVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQ2xvc2VPdXRsaW5lZFN2ZyBmcm9tIFwiQGFudC1kZXNpZ24vaWNvbnMtc3ZnL2VzL2Fzbi9DbG9zZU91dGxpbmVkXCI7XG5pbXBvcnQgQW50ZEljb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvQW50ZEljb25cIjtcbnZhciBDbG9zZU91dGxpbmVkID0gZnVuY3Rpb24gQ2xvc2VPdXRsaW5lZChwcm9wcywgcmVmKSB7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChBbnRkSWNvbiwgX2V4dGVuZHMoe30sIHByb3BzLCB7XG4gICAgcmVmOiByZWYsXG4gICAgaWNvbjogQ2xvc2VPdXRsaW5lZFN2Z1xuICB9KSk7XG59O1xuXG4vKiohW2Nsb3NlXShkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOVEFpSUdobGFXZG9kRDBpTlRBaUlHWnBiR3c5SWlOallXTmhZMkVpSUdacGJHd3RjblZzWlQwaVpYWmxibTlrWkNJZ2RtbGxkMEp2ZUQwaU5qUWdOalFnT0RrMklEZzVOaUlnWm05amRYTmhZbXhsUFNKbVlXeHpaU0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JajQ4Y0dGMGFDQmtQU0pOTnprNUxqZzJJREUyTmk0ek1XTXVNRElnTUNBdU1EUXVNREl1TURndU1EWnNOVGN1TmprZ05UY3VOMk11TURRdU1ETXVNRFV1TURVdU1EWXVNRGhoTGpFeUxqRXlJREFnTURFd0lDNHdObU13SUM0d015MHVNREl1TURVdExqQTJMakE1VERVMk9TNDVNeUExTVRKc01qZzNMamNnTWpnM0xqZGpMakEwTGpBMExqQTFMakEyTGpBMkxqQTVZUzR4TWk0eE1pQXdJREF4TUNBdU1EZGpNQ0F1TURJdExqQXlMakEwTFM0d05pNHdPR3d0TlRjdU55QTFOeTQyT1dNdExqQXpMakEwTFM0d05TNHdOUzB1TURjdU1EWmhMakV5TGpFeUlEQWdNREV0TGpBM0lEQmpMUzR3TXlBd0xTNHdOUzB1TURJdExqQTVMUzR3Tmt3MU1USWdOVFk1TGpremJDMHlPRGN1TnlBeU9EY3VOMk10TGpBMExqQTBMUzR3Tmk0d05TMHVNRGt1TURaaExqRXlMakV5SURBZ01ERXRMakEzSURCakxTNHdNaUF3TFM0d05DMHVNREl0TGpBNExTNHdObXd0TlRjdU5qa3ROVGN1TjJNdExqQTBMUzR3TXkwdU1EVXRMakExTFM0d05pMHVNRGRoTGpFeUxqRXlJREFnTURFd0xTNHdOMk13TFM0d015NHdNaTB1TURVdU1EWXRMakE1VERRMU5DNHdOeUExTVRKc0xUSTROeTQzTFRJNE55NDNZeTB1TURRdExqQTBMUzR3TlMwdU1EWXRMakEyTFM0d09XRXVNVEl1TVRJZ01DQXdNVEF0TGpBM1l6QXRMakF5TGpBeUxTNHdOQzR3TmkwdU1EaHNOVGN1TnkwMU55NDJPV011TURNdExqQTBMakExTFM0d05TNHdOeTB1TURaaExqRXlMakV5SURBZ01ERXVNRGNnTUdNdU1ETWdNQ0F1TURVdU1ESXVNRGt1TURaTU5URXlJRFExTkM0d04yd3lPRGN1TnkweU9EY3VOMk11TURRdExqQTBMakEyTFM0d05TNHdPUzB1TURaaExqRXlMakV5SURBZ01ERXVNRGNnTUhvaUlDOCtQQzl6ZG1jKykgKi9cbnZhciBSZWZJY29uID0gLyojX19QVVJFX18qL1JlYWN0LmZvcndhcmRSZWYoQ2xvc2VPdXRsaW5lZCk7XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBSZWZJY29uLmRpc3BsYXlOYW1lID0gJ0Nsb3NlT3V0bGluZWQnO1xufVxuZXhwb3J0IGRlZmF1bHQgUmVmSWNvbjsiLCJpbXBvcnQgX29iamVjdFNwcmVhZCBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0U3ByZWFkMlwiO1xuaW1wb3J0IF90eXBlb2YgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZlwiO1xuaW1wb3J0IHsgZ2VuZXJhdGUgYXMgZ2VuZXJhdGVDb2xvciB9IGZyb20gJ0BhbnQtZGVzaWduL2NvbG9ycyc7XG5pbXBvcnQgeyB1cGRhdGVDU1MgfSBmcm9tIFwicmMtdXRpbC9lcy9Eb20vZHluYW1pY0NTU1wiO1xuaW1wb3J0IHsgZ2V0U2hhZG93Um9vdCB9IGZyb20gXCJyYy11dGlsL2VzL0RvbS9zaGFkb3dcIjtcbmltcG9ydCB3YXJuIGZyb20gXCJyYy11dGlsL2VzL3dhcm5pbmdcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0LCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSWNvbkNvbnRleHQgZnJvbSBcIi4vY29tcG9uZW50cy9Db250ZXh0XCI7XG5mdW5jdGlvbiBjYW1lbENhc2UoaW5wdXQpIHtcbiAgcmV0dXJuIGlucHV0LnJlcGxhY2UoLy0oLikvZywgZnVuY3Rpb24gKG1hdGNoLCBnKSB7XG4gICAgcmV0dXJuIGcudG9VcHBlckNhc2UoKTtcbiAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gd2FybmluZyh2YWxpZCwgbWVzc2FnZSkge1xuICB3YXJuKHZhbGlkLCBcIltAYW50LWRlc2lnbi9pY29uc10gXCIuY29uY2F0KG1lc3NhZ2UpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0ljb25EZWZpbml0aW9uKHRhcmdldCkge1xuICByZXR1cm4gX3R5cGVvZih0YXJnZXQpID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdGFyZ2V0Lm5hbWUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiB0YXJnZXQudGhlbWUgPT09ICdzdHJpbmcnICYmIChfdHlwZW9mKHRhcmdldC5pY29uKSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHRhcmdldC5pY29uID09PSAnZnVuY3Rpb24nKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVBdHRycygpIHtcbiAgdmFyIGF0dHJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGF0dHJzKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgdmFyIHZhbCA9IGF0dHJzW2tleV07XG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgJ2NsYXNzJzpcbiAgICAgICAgYWNjLmNsYXNzTmFtZSA9IHZhbDtcbiAgICAgICAgZGVsZXRlIGFjYy5jbGFzcztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBkZWxldGUgYWNjW2tleV07XG4gICAgICAgIGFjY1tjYW1lbENhc2Uoa2V5KV0gPSB2YWw7XG4gICAgfVxuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZShub2RlLCBrZXksIHJvb3RQcm9wcykge1xuICBpZiAoIXJvb3RQcm9wcykge1xuICAgIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChub2RlLnRhZywgX29iamVjdFNwcmVhZCh7XG4gICAgICBrZXk6IGtleVxuICAgIH0sIG5vcm1hbGl6ZUF0dHJzKG5vZGUuYXR0cnMpKSwgKG5vZGUuY2hpbGRyZW4gfHwgW10pLm1hcChmdW5jdGlvbiAoY2hpbGQsIGluZGV4KSB7XG4gICAgICByZXR1cm4gZ2VuZXJhdGUoY2hpbGQsIFwiXCIuY29uY2F0KGtleSwgXCItXCIpLmNvbmNhdChub2RlLnRhZywgXCItXCIpLmNvbmNhdChpbmRleCkpO1xuICAgIH0pKTtcbiAgfVxuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQobm9kZS50YWcsIF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7XG4gICAga2V5OiBrZXlcbiAgfSwgbm9ybWFsaXplQXR0cnMobm9kZS5hdHRycykpLCByb290UHJvcHMpLCAobm9kZS5jaGlsZHJlbiB8fCBbXSkubWFwKGZ1bmN0aW9uIChjaGlsZCwgaW5kZXgpIHtcbiAgICByZXR1cm4gZ2VuZXJhdGUoY2hpbGQsIFwiXCIuY29uY2F0KGtleSwgXCItXCIpLmNvbmNhdChub2RlLnRhZywgXCItXCIpLmNvbmNhdChpbmRleCkpO1xuICB9KSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Vjb25kYXJ5Q29sb3IocHJpbWFyeUNvbG9yKSB7XG4gIC8vIGNob29zZSB0aGUgc2Vjb25kIGNvbG9yXG4gIHJldHVybiBnZW5lcmF0ZUNvbG9yKHByaW1hcnlDb2xvcilbMF07XG59XG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVHdvVG9uZUNvbG9ycyh0d29Ub25lQ29sb3IpIHtcbiAgaWYgKCF0d29Ub25lQ29sb3IpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodHdvVG9uZUNvbG9yKSA/IHR3b1RvbmVDb2xvciA6IFt0d29Ub25lQ29sb3JdO1xufVxuXG4vLyBUaGVzZSBwcm9wcyBtYWtlIHN1cmUgdGhhdCB0aGUgU1ZHIGJlaGF2aW91cnMgbGlrZSBnZW5lcmFsIHRleHQuXG4vLyBSZWZlcmVuY2U6IGh0dHBzOi8vYmxvZy5wcm90b3R5cHIuaW8vYWxpZ24tc3ZnLWljb25zLXRvLXRleHQtYW5kLXNheS1nb29kYnllLXRvLWZvbnQtaWNvbnMtZDQ0YjNkN2IyNmI0XG5leHBvcnQgdmFyIHN2Z0Jhc2VQcm9wcyA9IHtcbiAgd2lkdGg6ICcxZW0nLFxuICBoZWlnaHQ6ICcxZW0nLFxuICBmaWxsOiAnY3VycmVudENvbG9yJyxcbiAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICBmb2N1c2FibGU6ICdmYWxzZSdcbn07XG5leHBvcnQgdmFyIGljb25TdHlsZXMgPSBcIlxcbi5hbnRpY29uIHtcXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgbGluZS1oZWlnaHQ6IDA7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG4gIHZlcnRpY2FsLWFsaWduOiAtMC4xMjVlbTtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxufVxcblxcbi5hbnRpY29uID4gKiB7XFxuICBsaW5lLWhlaWdodDogMTtcXG59XFxuXFxuLmFudGljb24gc3ZnIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuXFxuLmFudGljb246OmJlZm9yZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uYW50aWNvbiAuYW50aWNvbi1pY29uIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4uYW50aWNvblt0YWJpbmRleF0ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uYW50aWNvbi1zcGluOjpiZWZvcmUsXFxuLmFudGljb24tc3BpbiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogbG9hZGluZ0NpcmNsZSAxcyBpbmZpbml0ZSBsaW5lYXI7XFxuICBhbmltYXRpb246IGxvYWRpbmdDaXJjbGUgMXMgaW5maW5pdGUgbGluZWFyO1xcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgbG9hZGluZ0NpcmNsZSB7XFxuICAxMDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIGxvYWRpbmdDaXJjbGUge1xcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gIH1cXG59XFxuXCI7XG5leHBvcnQgdmFyIHVzZUluc2VydFN0eWxlcyA9IGZ1bmN0aW9uIHVzZUluc2VydFN0eWxlcyhlbGVSZWYpIHtcbiAgdmFyIF91c2VDb250ZXh0ID0gdXNlQ29udGV4dChJY29uQ29udGV4dCksXG4gICAgY3NwID0gX3VzZUNvbnRleHQuY3NwLFxuICAgIHByZWZpeENscyA9IF91c2VDb250ZXh0LnByZWZpeENscztcbiAgdmFyIG1lcmdlZFN0eWxlU3RyID0gaWNvblN0eWxlcztcbiAgaWYgKHByZWZpeENscykge1xuICAgIG1lcmdlZFN0eWxlU3RyID0gbWVyZ2VkU3R5bGVTdHIucmVwbGFjZSgvYW50aWNvbi9nLCBwcmVmaXhDbHMpO1xuICB9XG4gIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGVsZSA9IGVsZVJlZi5jdXJyZW50O1xuICAgIHZhciBzaGFkb3dSb290ID0gZ2V0U2hhZG93Um9vdChlbGUpO1xuICAgIHVwZGF0ZUNTUyhtZXJnZWRTdHlsZVN0ciwgJ0BhbnQtZGVzaWduLWljb25zJywge1xuICAgICAgcHJlcGVuZDogdHJ1ZSxcbiAgICAgIGNzcDogY3NwLFxuICAgICAgYXR0YWNoVG86IHNoYWRvd1Jvb3RcbiAgICB9KTtcbiAgfSwgW10pO1xufTsiLCJpbXBvcnQgeyBib3VuZDAxLCBwYWQyIH0gZnJvbSAnLi91dGlsLmpzJztcbi8vIGByZ2JUb0hzbGAsIGByZ2JUb0hzdmAsIGBoc2xUb1JnYmAsIGBoc3ZUb1JnYmAgbW9kaWZpZWQgZnJvbTpcbi8vIDxodHRwOi8vbWppamFja3Nvbi5jb20vMjAwOC8wMi9yZ2ItdG8taHNsLWFuZC1yZ2ItdG8taHN2LWNvbG9yLW1vZGVsLWNvbnZlcnNpb24tYWxnb3JpdGhtcy1pbi1qYXZhc2NyaXB0PlxuLyoqXG4gKiBIYW5kbGUgYm91bmRzIC8gcGVyY2VudGFnZSBjaGVja2luZyB0byBjb25mb3JtIHRvIENTUyBjb2xvciBzcGVjXG4gKiA8aHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1jb2xvci8+XG4gKiAqQXNzdW1lczoqIHIsIGcsIGIgaW4gWzAsIDI1NV0gb3IgWzAsIDFdXG4gKiAqUmV0dXJuczoqIHsgciwgZywgYiB9IGluIFswLCAyNTVdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZ2JUb1JnYihyLCBnLCBiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcjogYm91bmQwMShyLCAyNTUpICogMjU1LFxuICAgICAgICBnOiBib3VuZDAxKGcsIDI1NSkgKiAyNTUsXG4gICAgICAgIGI6IGJvdW5kMDEoYiwgMjU1KSAqIDI1NSxcbiAgICB9O1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhbiBSR0IgY29sb3IgdmFsdWUgdG8gSFNMLlxuICogKkFzc3VtZXM6KiByLCBnLCBhbmQgYiBhcmUgY29udGFpbmVkIGluIFswLCAyNTVdIG9yIFswLCAxXVxuICogKlJldHVybnM6KiB7IGgsIHMsIGwgfSBpbiBbMCwxXVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmdiVG9Ic2wociwgZywgYikge1xuICAgIHIgPSBib3VuZDAxKHIsIDI1NSk7XG4gICAgZyA9IGJvdW5kMDEoZywgMjU1KTtcbiAgICBiID0gYm91bmQwMShiLCAyNTUpO1xuICAgIHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcbiAgICB2YXIgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgdmFyIGggPSAwO1xuICAgIHZhciBzID0gMDtcbiAgICB2YXIgbCA9IChtYXggKyBtaW4pIC8gMjtcbiAgICBpZiAobWF4ID09PSBtaW4pIHtcbiAgICAgICAgcyA9IDA7XG4gICAgICAgIGggPSAwOyAvLyBhY2hyb21hdGljXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgICAgICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pO1xuICAgICAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgICAgICAgY2FzZSByOlxuICAgICAgICAgICAgICAgIGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZzpcbiAgICAgICAgICAgICAgICBoID0gKGIgLSByKSAvIGQgKyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBiOlxuICAgICAgICAgICAgICAgIGggPSAociAtIGcpIC8gZCArIDQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGggLz0gNjtcbiAgICB9XG4gICAgcmV0dXJuIHsgaDogaCwgczogcywgbDogbCB9O1xufVxuZnVuY3Rpb24gaHVlMnJnYihwLCBxLCB0KSB7XG4gICAgaWYgKHQgPCAwKSB7XG4gICAgICAgIHQgKz0gMTtcbiAgICB9XG4gICAgaWYgKHQgPiAxKSB7XG4gICAgICAgIHQgLT0gMTtcbiAgICB9XG4gICAgaWYgKHQgPCAxIC8gNikge1xuICAgICAgICByZXR1cm4gcCArIChxIC0gcCkgKiAoNiAqIHQpO1xuICAgIH1cbiAgICBpZiAodCA8IDEgLyAyKSB7XG4gICAgICAgIHJldHVybiBxO1xuICAgIH1cbiAgICBpZiAodCA8IDIgLyAzKSB7XG4gICAgICAgIHJldHVybiBwICsgKHEgLSBwKSAqICgyIC8gMyAtIHQpICogNjtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG59XG4vKipcbiAqIENvbnZlcnRzIGFuIEhTTCBjb2xvciB2YWx1ZSB0byBSR0IuXG4gKlxuICogKkFzc3VtZXM6KiBoIGlzIGNvbnRhaW5lZCBpbiBbMCwgMV0gb3IgWzAsIDM2MF0gYW5kIHMgYW5kIGwgYXJlIGNvbnRhaW5lZCBbMCwgMV0gb3IgWzAsIDEwMF1cbiAqICpSZXR1cm5zOiogeyByLCBnLCBiIH0gaW4gdGhlIHNldCBbMCwgMjU1XVxuICovXG5leHBvcnQgZnVuY3Rpb24gaHNsVG9SZ2IoaCwgcywgbCkge1xuICAgIHZhciByO1xuICAgIHZhciBnO1xuICAgIHZhciBiO1xuICAgIGggPSBib3VuZDAxKGgsIDM2MCk7XG4gICAgcyA9IGJvdW5kMDEocywgMTAwKTtcbiAgICBsID0gYm91bmQwMShsLCAxMDApO1xuICAgIGlmIChzID09PSAwKSB7XG4gICAgICAgIC8vIGFjaHJvbWF0aWNcbiAgICAgICAgZyA9IGw7XG4gICAgICAgIGIgPSBsO1xuICAgICAgICByID0gbDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBxID0gbCA8IDAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogcztcbiAgICAgICAgdmFyIHAgPSAyICogbCAtIHE7XG4gICAgICAgIHIgPSBodWUycmdiKHAsIHEsIGggKyAxIC8gMyk7XG4gICAgICAgIGcgPSBodWUycmdiKHAsIHEsIGgpO1xuICAgICAgICBiID0gaHVlMnJnYihwLCBxLCBoIC0gMSAvIDMpO1xuICAgIH1cbiAgICByZXR1cm4geyByOiByICogMjU1LCBnOiBnICogMjU1LCBiOiBiICogMjU1IH07XG59XG4vKipcbiAqIENvbnZlcnRzIGFuIFJHQiBjb2xvciB2YWx1ZSB0byBIU1ZcbiAqXG4gKiAqQXNzdW1lczoqIHIsIGcsIGFuZCBiIGFyZSBjb250YWluZWQgaW4gdGhlIHNldCBbMCwgMjU1XSBvciBbMCwgMV1cbiAqICpSZXR1cm5zOiogeyBoLCBzLCB2IH0gaW4gWzAsMV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJnYlRvSHN2KHIsIGcsIGIpIHtcbiAgICByID0gYm91bmQwMShyLCAyNTUpO1xuICAgIGcgPSBib3VuZDAxKGcsIDI1NSk7XG4gICAgYiA9IGJvdW5kMDEoYiwgMjU1KTtcbiAgICB2YXIgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG4gICAgdmFyIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgIHZhciBoID0gMDtcbiAgICB2YXIgdiA9IG1heDtcbiAgICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgICB2YXIgcyA9IG1heCA9PT0gMCA/IDAgOiBkIC8gbWF4O1xuICAgIGlmIChtYXggPT09IG1pbikge1xuICAgICAgICBoID0gMDsgLy8gYWNocm9tYXRpY1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3dpdGNoIChtYXgpIHtcbiAgICAgICAgICAgIGNhc2UgcjpcbiAgICAgICAgICAgICAgICBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGc6XG4gICAgICAgICAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYjpcbiAgICAgICAgICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBoIC89IDY7XG4gICAgfVxuICAgIHJldHVybiB7IGg6IGgsIHM6IHMsIHY6IHYgfTtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gSFNWIGNvbG9yIHZhbHVlIHRvIFJHQi5cbiAqXG4gKiAqQXNzdW1lczoqIGggaXMgY29udGFpbmVkIGluIFswLCAxXSBvciBbMCwgMzYwXSBhbmQgcyBhbmQgdiBhcmUgY29udGFpbmVkIGluIFswLCAxXSBvciBbMCwgMTAwXVxuICogKlJldHVybnM6KiB7IHIsIGcsIGIgfSBpbiB0aGUgc2V0IFswLCAyNTVdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoc3ZUb1JnYihoLCBzLCB2KSB7XG4gICAgaCA9IGJvdW5kMDEoaCwgMzYwKSAqIDY7XG4gICAgcyA9IGJvdW5kMDEocywgMTAwKTtcbiAgICB2ID0gYm91bmQwMSh2LCAxMDApO1xuICAgIHZhciBpID0gTWF0aC5mbG9vcihoKTtcbiAgICB2YXIgZiA9IGggLSBpO1xuICAgIHZhciBwID0gdiAqICgxIC0gcyk7XG4gICAgdmFyIHEgPSB2ICogKDEgLSBmICogcyk7XG4gICAgdmFyIHQgPSB2ICogKDEgLSAoMSAtIGYpICogcyk7XG4gICAgdmFyIG1vZCA9IGkgJSA2O1xuICAgIHZhciByID0gW3YsIHEsIHAsIHAsIHQsIHZdW21vZF07XG4gICAgdmFyIGcgPSBbdCwgdiwgdiwgcSwgcCwgcF1bbW9kXTtcbiAgICB2YXIgYiA9IFtwLCBwLCB0LCB2LCB2LCBxXVttb2RdO1xuICAgIHJldHVybiB7IHI6IHIgKiAyNTUsIGc6IGcgKiAyNTUsIGI6IGIgKiAyNTUgfTtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gUkdCIGNvbG9yIHRvIGhleFxuICpcbiAqIEFzc3VtZXMgciwgZywgYW5kIGIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAyNTVdXG4gKiBSZXR1cm5zIGEgMyBvciA2IGNoYXJhY3RlciBoZXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJnYlRvSGV4KHIsIGcsIGIsIGFsbG93M0NoYXIpIHtcbiAgICB2YXIgaGV4ID0gW1xuICAgICAgICBwYWQyKE1hdGgucm91bmQocikudG9TdHJpbmcoMTYpKSxcbiAgICAgICAgcGFkMihNYXRoLnJvdW5kKGcpLnRvU3RyaW5nKDE2KSksXG4gICAgICAgIHBhZDIoTWF0aC5yb3VuZChiKS50b1N0cmluZygxNikpLFxuICAgIF07XG4gICAgLy8gUmV0dXJuIGEgMyBjaGFyYWN0ZXIgaGV4IGlmIHBvc3NpYmxlXG4gICAgaWYgKGFsbG93M0NoYXIgJiZcbiAgICAgICAgaGV4WzBdLnN0YXJ0c1dpdGgoaGV4WzBdLmNoYXJBdCgxKSkgJiZcbiAgICAgICAgaGV4WzFdLnN0YXJ0c1dpdGgoaGV4WzFdLmNoYXJBdCgxKSkgJiZcbiAgICAgICAgaGV4WzJdLnN0YXJ0c1dpdGgoaGV4WzJdLmNoYXJBdCgxKSkpIHtcbiAgICAgICAgcmV0dXJuIGhleFswXS5jaGFyQXQoMCkgKyBoZXhbMV0uY2hhckF0KDApICsgaGV4WzJdLmNoYXJBdCgwKTtcbiAgICB9XG4gICAgcmV0dXJuIGhleC5qb2luKCcnKTtcbn1cbi8qKlxuICogQ29udmVydHMgYW4gUkdCQSBjb2xvciBwbHVzIGFscGhhIHRyYW5zcGFyZW5jeSB0byBoZXhcbiAqXG4gKiBBc3N1bWVzIHIsIGcsIGIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAyNTVdIGFuZFxuICogYSBpbiBbMCwgMV0uIFJldHVybnMgYSA0IG9yIDggY2hhcmFjdGVyIHJnYmEgaGV4XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXG5leHBvcnQgZnVuY3Rpb24gcmdiYVRvSGV4KHIsIGcsIGIsIGEsIGFsbG93NENoYXIpIHtcbiAgICB2YXIgaGV4ID0gW1xuICAgICAgICBwYWQyKE1hdGgucm91bmQocikudG9TdHJpbmcoMTYpKSxcbiAgICAgICAgcGFkMihNYXRoLnJvdW5kKGcpLnRvU3RyaW5nKDE2KSksXG4gICAgICAgIHBhZDIoTWF0aC5yb3VuZChiKS50b1N0cmluZygxNikpLFxuICAgICAgICBwYWQyKGNvbnZlcnREZWNpbWFsVG9IZXgoYSkpLFxuICAgIF07XG4gICAgLy8gUmV0dXJuIGEgNCBjaGFyYWN0ZXIgaGV4IGlmIHBvc3NpYmxlXG4gICAgaWYgKGFsbG93NENoYXIgJiZcbiAgICAgICAgaGV4WzBdLnN0YXJ0c1dpdGgoaGV4WzBdLmNoYXJBdCgxKSkgJiZcbiAgICAgICAgaGV4WzFdLnN0YXJ0c1dpdGgoaGV4WzFdLmNoYXJBdCgxKSkgJiZcbiAgICAgICAgaGV4WzJdLnN0YXJ0c1dpdGgoaGV4WzJdLmNoYXJBdCgxKSkgJiZcbiAgICAgICAgaGV4WzNdLnN0YXJ0c1dpdGgoaGV4WzNdLmNoYXJBdCgxKSkpIHtcbiAgICAgICAgcmV0dXJuIGhleFswXS5jaGFyQXQoMCkgKyBoZXhbMV0uY2hhckF0KDApICsgaGV4WzJdLmNoYXJBdCgwKSArIGhleFszXS5jaGFyQXQoMCk7XG4gICAgfVxuICAgIHJldHVybiBoZXguam9pbignJyk7XG59XG4vKipcbiAqIENvbnZlcnRzIGFuIFJHQkEgY29sb3IgdG8gYW4gQVJHQiBIZXg4IHN0cmluZ1xuICogUmFyZWx5IHVzZWQsIGJ1dCByZXF1aXJlZCBmb3IgXCJ0b0ZpbHRlcigpXCJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJnYmFUb0FyZ2JIZXgociwgZywgYiwgYSkge1xuICAgIHZhciBoZXggPSBbXG4gICAgICAgIHBhZDIoY29udmVydERlY2ltYWxUb0hleChhKSksXG4gICAgICAgIHBhZDIoTWF0aC5yb3VuZChyKS50b1N0cmluZygxNikpLFxuICAgICAgICBwYWQyKE1hdGgucm91bmQoZykudG9TdHJpbmcoMTYpKSxcbiAgICAgICAgcGFkMihNYXRoLnJvdW5kKGIpLnRvU3RyaW5nKDE2KSksXG4gICAgXTtcbiAgICByZXR1cm4gaGV4LmpvaW4oJycpO1xufVxuLyoqIENvbnZlcnRzIGEgZGVjaW1hbCB0byBhIGhleCB2YWx1ZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnREZWNpbWFsVG9IZXgoZCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoZCkgKiAyNTUpLnRvU3RyaW5nKDE2KTtcbn1cbi8qKiBDb252ZXJ0cyBhIGhleCB2YWx1ZSB0byBhIGRlY2ltYWwgKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0SGV4VG9EZWNpbWFsKGgpIHtcbiAgICByZXR1cm4gcGFyc2VJbnRGcm9tSGV4KGgpIC8gMjU1O1xufVxuLyoqIFBhcnNlIGEgYmFzZS0xNiBoZXggdmFsdWUgaW50byBhIGJhc2UtMTAgaW50ZWdlciAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSW50RnJvbUhleCh2YWwpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQodmFsLCAxNik7XG59XG5leHBvcnQgZnVuY3Rpb24gbnVtYmVySW5wdXRUb09iamVjdChjb2xvcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHI6IGNvbG9yID4+IDE2LFxuICAgICAgICBnOiAoY29sb3IgJiAweGZmMDApID4+IDgsXG4gICAgICAgIGI6IGNvbG9yICYgMHhmZixcbiAgICB9O1xufVxuIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL2JhaGFtYXMxMC9jc3MtY29sb3ItbmFtZXMvYmxvYi9tYXN0ZXIvY3NzLWNvbG9yLW5hbWVzLmpzb25cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgdmFyIG5hbWVzID0ge1xuICAgIGFsaWNlYmx1ZTogJyNmMGY4ZmYnLFxuICAgIGFudGlxdWV3aGl0ZTogJyNmYWViZDcnLFxuICAgIGFxdWE6ICcjMDBmZmZmJyxcbiAgICBhcXVhbWFyaW5lOiAnIzdmZmZkNCcsXG4gICAgYXp1cmU6ICcjZjBmZmZmJyxcbiAgICBiZWlnZTogJyNmNWY1ZGMnLFxuICAgIGJpc3F1ZTogJyNmZmU0YzQnLFxuICAgIGJsYWNrOiAnIzAwMDAwMCcsXG4gICAgYmxhbmNoZWRhbG1vbmQ6ICcjZmZlYmNkJyxcbiAgICBibHVlOiAnIzAwMDBmZicsXG4gICAgYmx1ZXZpb2xldDogJyM4YTJiZTInLFxuICAgIGJyb3duOiAnI2E1MmEyYScsXG4gICAgYnVybHl3b29kOiAnI2RlYjg4NycsXG4gICAgY2FkZXRibHVlOiAnIzVmOWVhMCcsXG4gICAgY2hhcnRyZXVzZTogJyM3ZmZmMDAnLFxuICAgIGNob2NvbGF0ZTogJyNkMjY5MWUnLFxuICAgIGNvcmFsOiAnI2ZmN2Y1MCcsXG4gICAgY29ybmZsb3dlcmJsdWU6ICcjNjQ5NWVkJyxcbiAgICBjb3Juc2lsazogJyNmZmY4ZGMnLFxuICAgIGNyaW1zb246ICcjZGMxNDNjJyxcbiAgICBjeWFuOiAnIzAwZmZmZicsXG4gICAgZGFya2JsdWU6ICcjMDAwMDhiJyxcbiAgICBkYXJrY3lhbjogJyMwMDhiOGInLFxuICAgIGRhcmtnb2xkZW5yb2Q6ICcjYjg4NjBiJyxcbiAgICBkYXJrZ3JheTogJyNhOWE5YTknLFxuICAgIGRhcmtncmVlbjogJyMwMDY0MDAnLFxuICAgIGRhcmtncmV5OiAnI2E5YTlhOScsXG4gICAgZGFya2toYWtpOiAnI2JkYjc2YicsXG4gICAgZGFya21hZ2VudGE6ICcjOGIwMDhiJyxcbiAgICBkYXJrb2xpdmVncmVlbjogJyM1NTZiMmYnLFxuICAgIGRhcmtvcmFuZ2U6ICcjZmY4YzAwJyxcbiAgICBkYXJrb3JjaGlkOiAnIzk5MzJjYycsXG4gICAgZGFya3JlZDogJyM4YjAwMDAnLFxuICAgIGRhcmtzYWxtb246ICcjZTk5NjdhJyxcbiAgICBkYXJrc2VhZ3JlZW46ICcjOGZiYzhmJyxcbiAgICBkYXJrc2xhdGVibHVlOiAnIzQ4M2Q4YicsXG4gICAgZGFya3NsYXRlZ3JheTogJyMyZjRmNGYnLFxuICAgIGRhcmtzbGF0ZWdyZXk6ICcjMmY0ZjRmJyxcbiAgICBkYXJrdHVycXVvaXNlOiAnIzAwY2VkMScsXG4gICAgZGFya3Zpb2xldDogJyM5NDAwZDMnLFxuICAgIGRlZXBwaW5rOiAnI2ZmMTQ5MycsXG4gICAgZGVlcHNreWJsdWU6ICcjMDBiZmZmJyxcbiAgICBkaW1ncmF5OiAnIzY5Njk2OScsXG4gICAgZGltZ3JleTogJyM2OTY5NjknLFxuICAgIGRvZGdlcmJsdWU6ICcjMWU5MGZmJyxcbiAgICBmaXJlYnJpY2s6ICcjYjIyMjIyJyxcbiAgICBmbG9yYWx3aGl0ZTogJyNmZmZhZjAnLFxuICAgIGZvcmVzdGdyZWVuOiAnIzIyOGIyMicsXG4gICAgZnVjaHNpYTogJyNmZjAwZmYnLFxuICAgIGdhaW5zYm9ybzogJyNkY2RjZGMnLFxuICAgIGdob3N0d2hpdGU6ICcjZjhmOGZmJyxcbiAgICBnb2xkZW5yb2Q6ICcjZGFhNTIwJyxcbiAgICBnb2xkOiAnI2ZmZDcwMCcsXG4gICAgZ3JheTogJyM4MDgwODAnLFxuICAgIGdyZWVuOiAnIzAwODAwMCcsXG4gICAgZ3JlZW55ZWxsb3c6ICcjYWRmZjJmJyxcbiAgICBncmV5OiAnIzgwODA4MCcsXG4gICAgaG9uZXlkZXc6ICcjZjBmZmYwJyxcbiAgICBob3RwaW5rOiAnI2ZmNjliNCcsXG4gICAgaW5kaWFucmVkOiAnI2NkNWM1YycsXG4gICAgaW5kaWdvOiAnIzRiMDA4MicsXG4gICAgaXZvcnk6ICcjZmZmZmYwJyxcbiAgICBraGFraTogJyNmMGU2OGMnLFxuICAgIGxhdmVuZGVyYmx1c2g6ICcjZmZmMGY1JyxcbiAgICBsYXZlbmRlcjogJyNlNmU2ZmEnLFxuICAgIGxhd25ncmVlbjogJyM3Y2ZjMDAnLFxuICAgIGxlbW9uY2hpZmZvbjogJyNmZmZhY2QnLFxuICAgIGxpZ2h0Ymx1ZTogJyNhZGQ4ZTYnLFxuICAgIGxpZ2h0Y29yYWw6ICcjZjA4MDgwJyxcbiAgICBsaWdodGN5YW46ICcjZTBmZmZmJyxcbiAgICBsaWdodGdvbGRlbnJvZHllbGxvdzogJyNmYWZhZDInLFxuICAgIGxpZ2h0Z3JheTogJyNkM2QzZDMnLFxuICAgIGxpZ2h0Z3JlZW46ICcjOTBlZTkwJyxcbiAgICBsaWdodGdyZXk6ICcjZDNkM2QzJyxcbiAgICBsaWdodHBpbms6ICcjZmZiNmMxJyxcbiAgICBsaWdodHNhbG1vbjogJyNmZmEwN2EnLFxuICAgIGxpZ2h0c2VhZ3JlZW46ICcjMjBiMmFhJyxcbiAgICBsaWdodHNreWJsdWU6ICcjODdjZWZhJyxcbiAgICBsaWdodHNsYXRlZ3JheTogJyM3Nzg4OTknLFxuICAgIGxpZ2h0c2xhdGVncmV5OiAnIzc3ODg5OScsXG4gICAgbGlnaHRzdGVlbGJsdWU6ICcjYjBjNGRlJyxcbiAgICBsaWdodHllbGxvdzogJyNmZmZmZTAnLFxuICAgIGxpbWU6ICcjMDBmZjAwJyxcbiAgICBsaW1lZ3JlZW46ICcjMzJjZDMyJyxcbiAgICBsaW5lbjogJyNmYWYwZTYnLFxuICAgIG1hZ2VudGE6ICcjZmYwMGZmJyxcbiAgICBtYXJvb246ICcjODAwMDAwJyxcbiAgICBtZWRpdW1hcXVhbWFyaW5lOiAnIzY2Y2RhYScsXG4gICAgbWVkaXVtYmx1ZTogJyMwMDAwY2QnLFxuICAgIG1lZGl1bW9yY2hpZDogJyNiYTU1ZDMnLFxuICAgIG1lZGl1bXB1cnBsZTogJyM5MzcwZGInLFxuICAgIG1lZGl1bXNlYWdyZWVuOiAnIzNjYjM3MScsXG4gICAgbWVkaXVtc2xhdGVibHVlOiAnIzdiNjhlZScsXG4gICAgbWVkaXVtc3ByaW5nZ3JlZW46ICcjMDBmYTlhJyxcbiAgICBtZWRpdW10dXJxdW9pc2U6ICcjNDhkMWNjJyxcbiAgICBtZWRpdW12aW9sZXRyZWQ6ICcjYzcxNTg1JyxcbiAgICBtaWRuaWdodGJsdWU6ICcjMTkxOTcwJyxcbiAgICBtaW50Y3JlYW06ICcjZjVmZmZhJyxcbiAgICBtaXN0eXJvc2U6ICcjZmZlNGUxJyxcbiAgICBtb2NjYXNpbjogJyNmZmU0YjUnLFxuICAgIG5hdmFqb3doaXRlOiAnI2ZmZGVhZCcsXG4gICAgbmF2eTogJyMwMDAwODAnLFxuICAgIG9sZGxhY2U6ICcjZmRmNWU2JyxcbiAgICBvbGl2ZTogJyM4MDgwMDAnLFxuICAgIG9saXZlZHJhYjogJyM2YjhlMjMnLFxuICAgIG9yYW5nZTogJyNmZmE1MDAnLFxuICAgIG9yYW5nZXJlZDogJyNmZjQ1MDAnLFxuICAgIG9yY2hpZDogJyNkYTcwZDYnLFxuICAgIHBhbGVnb2xkZW5yb2Q6ICcjZWVlOGFhJyxcbiAgICBwYWxlZ3JlZW46ICcjOThmYjk4JyxcbiAgICBwYWxldHVycXVvaXNlOiAnI2FmZWVlZScsXG4gICAgcGFsZXZpb2xldHJlZDogJyNkYjcwOTMnLFxuICAgIHBhcGF5YXdoaXA6ICcjZmZlZmQ1JyxcbiAgICBwZWFjaHB1ZmY6ICcjZmZkYWI5JyxcbiAgICBwZXJ1OiAnI2NkODUzZicsXG4gICAgcGluazogJyNmZmMwY2InLFxuICAgIHBsdW06ICcjZGRhMGRkJyxcbiAgICBwb3dkZXJibHVlOiAnI2IwZTBlNicsXG4gICAgcHVycGxlOiAnIzgwMDA4MCcsXG4gICAgcmViZWNjYXB1cnBsZTogJyM2NjMzOTknLFxuICAgIHJlZDogJyNmZjAwMDAnLFxuICAgIHJvc3licm93bjogJyNiYzhmOGYnLFxuICAgIHJveWFsYmx1ZTogJyM0MTY5ZTEnLFxuICAgIHNhZGRsZWJyb3duOiAnIzhiNDUxMycsXG4gICAgc2FsbW9uOiAnI2ZhODA3MicsXG4gICAgc2FuZHlicm93bjogJyNmNGE0NjAnLFxuICAgIHNlYWdyZWVuOiAnIzJlOGI1NycsXG4gICAgc2Vhc2hlbGw6ICcjZmZmNWVlJyxcbiAgICBzaWVubmE6ICcjYTA1MjJkJyxcbiAgICBzaWx2ZXI6ICcjYzBjMGMwJyxcbiAgICBza3libHVlOiAnIzg3Y2VlYicsXG4gICAgc2xhdGVibHVlOiAnIzZhNWFjZCcsXG4gICAgc2xhdGVncmF5OiAnIzcwODA5MCcsXG4gICAgc2xhdGVncmV5OiAnIzcwODA5MCcsXG4gICAgc25vdzogJyNmZmZhZmEnLFxuICAgIHNwcmluZ2dyZWVuOiAnIzAwZmY3ZicsXG4gICAgc3RlZWxibHVlOiAnIzQ2ODJiNCcsXG4gICAgdGFuOiAnI2QyYjQ4YycsXG4gICAgdGVhbDogJyMwMDgwODAnLFxuICAgIHRoaXN0bGU6ICcjZDhiZmQ4JyxcbiAgICB0b21hdG86ICcjZmY2MzQ3JyxcbiAgICB0dXJxdW9pc2U6ICcjNDBlMGQwJyxcbiAgICB2aW9sZXQ6ICcjZWU4MmVlJyxcbiAgICB3aGVhdDogJyNmNWRlYjMnLFxuICAgIHdoaXRlOiAnI2ZmZmZmZicsXG4gICAgd2hpdGVzbW9rZTogJyNmNWY1ZjUnLFxuICAgIHllbGxvdzogJyNmZmZmMDAnLFxuICAgIHllbGxvd2dyZWVuOiAnIzlhY2QzMicsXG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlZHVuZGFudC10eXBlLWNvbnN0aXR1ZW50cyAqL1xuaW1wb3J0IHsgY29udmVydEhleFRvRGVjaW1hbCwgaHNsVG9SZ2IsIGhzdlRvUmdiLCBwYXJzZUludEZyb21IZXgsIHJnYlRvUmdiLCB9IGZyb20gJy4vY29udmVyc2lvbi5qcyc7XG5pbXBvcnQgeyBuYW1lcyB9IGZyb20gJy4vY3NzLWNvbG9yLW5hbWVzLmpzJztcbmltcG9ydCB7IGJvdW5kQWxwaGEsIGNvbnZlcnRUb1BlcmNlbnRhZ2UgfSBmcm9tICcuL3V0aWwuanMnO1xuLyoqXG4gKiBHaXZlbiBhIHN0cmluZyBvciBvYmplY3QsIGNvbnZlcnQgdGhhdCBpbnB1dCB0byBSR0JcbiAqXG4gKiBQb3NzaWJsZSBzdHJpbmcgaW5wdXRzOlxuICogYGBgXG4gKiBcInJlZFwiXG4gKiBcIiNmMDBcIiBvciBcImYwMFwiXG4gKiBcIiNmZjAwMDBcIiBvciBcImZmMDAwMFwiXG4gKiBcIiNmZjAwMDAwMFwiIG9yIFwiZmYwMDAwMDBcIlxuICogXCJyZ2IgMjU1IDAgMFwiIG9yIFwicmdiICgyNTUsIDAsIDApXCJcbiAqIFwicmdiIDEuMCAwIDBcIiBvciBcInJnYiAoMSwgMCwgMClcIlxuICogXCJyZ2JhICgyNTUsIDAsIDAsIDEpXCIgb3IgXCJyZ2JhIDI1NSwgMCwgMCwgMVwiXG4gKiBcInJnYmEgKDEuMCwgMCwgMCwgMSlcIiBvciBcInJnYmEgMS4wLCAwLCAwLCAxXCJcbiAqIFwiaHNsKDAsIDEwMCUsIDUwJSlcIiBvciBcImhzbCAwIDEwMCUgNTAlXCJcbiAqIFwiaHNsYSgwLCAxMDAlLCA1MCUsIDEpXCIgb3IgXCJoc2xhIDAgMTAwJSA1MCUsIDFcIlxuICogXCJoc3YoMCwgMTAwJSwgMTAwJSlcIiBvciBcImhzdiAwIDEwMCUgMTAwJVwiXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlucHV0VG9SR0IoY29sb3IpIHtcbiAgICB2YXIgcmdiID0geyByOiAwLCBnOiAwLCBiOiAwIH07XG4gICAgdmFyIGEgPSAxO1xuICAgIHZhciBzID0gbnVsbDtcbiAgICB2YXIgdiA9IG51bGw7XG4gICAgdmFyIGwgPSBudWxsO1xuICAgIHZhciBvayA9IGZhbHNlO1xuICAgIHZhciBmb3JtYXQgPSBmYWxzZTtcbiAgICBpZiAodHlwZW9mIGNvbG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb2xvciA9IHN0cmluZ0lucHV0VG9PYmplY3QoY29sb3IpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNvbG9yID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoaXNWYWxpZENTU1VuaXQoY29sb3IucikgJiYgaXNWYWxpZENTU1VuaXQoY29sb3IuZykgJiYgaXNWYWxpZENTU1VuaXQoY29sb3IuYikpIHtcbiAgICAgICAgICAgIHJnYiA9IHJnYlRvUmdiKGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIpO1xuICAgICAgICAgICAgb2sgPSB0cnVlO1xuICAgICAgICAgICAgZm9ybWF0ID0gU3RyaW5nKGNvbG9yLnIpLnN1YnN0cigtMSkgPT09ICclJyA/ICdwcmdiJyA6ICdyZ2InO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzVmFsaWRDU1NVbml0KGNvbG9yLmgpICYmIGlzVmFsaWRDU1NVbml0KGNvbG9yLnMpICYmIGlzVmFsaWRDU1NVbml0KGNvbG9yLnYpKSB7XG4gICAgICAgICAgICBzID0gY29udmVydFRvUGVyY2VudGFnZShjb2xvci5zKTtcbiAgICAgICAgICAgIHYgPSBjb252ZXJ0VG9QZXJjZW50YWdlKGNvbG9yLnYpO1xuICAgICAgICAgICAgcmdiID0gaHN2VG9SZ2IoY29sb3IuaCwgcywgdik7XG4gICAgICAgICAgICBvayA9IHRydWU7XG4gICAgICAgICAgICBmb3JtYXQgPSAnaHN2JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc1ZhbGlkQ1NTVW5pdChjb2xvci5oKSAmJiBpc1ZhbGlkQ1NTVW5pdChjb2xvci5zKSAmJiBpc1ZhbGlkQ1NTVW5pdChjb2xvci5sKSkge1xuICAgICAgICAgICAgcyA9IGNvbnZlcnRUb1BlcmNlbnRhZ2UoY29sb3Iucyk7XG4gICAgICAgICAgICBsID0gY29udmVydFRvUGVyY2VudGFnZShjb2xvci5sKTtcbiAgICAgICAgICAgIHJnYiA9IGhzbFRvUmdiKGNvbG9yLmgsIHMsIGwpO1xuICAgICAgICAgICAgb2sgPSB0cnVlO1xuICAgICAgICAgICAgZm9ybWF0ID0gJ2hzbCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb2xvciwgJ2EnKSkge1xuICAgICAgICAgICAgYSA9IGNvbG9yLmE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYSA9IGJvdW5kQWxwaGEoYSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb2s6IG9rLFxuICAgICAgICBmb3JtYXQ6IGNvbG9yLmZvcm1hdCB8fCBmb3JtYXQsXG4gICAgICAgIHI6IE1hdGgubWluKDI1NSwgTWF0aC5tYXgocmdiLnIsIDApKSxcbiAgICAgICAgZzogTWF0aC5taW4oMjU1LCBNYXRoLm1heChyZ2IuZywgMCkpLFxuICAgICAgICBiOiBNYXRoLm1pbigyNTUsIE1hdGgubWF4KHJnYi5iLCAwKSksXG4gICAgICAgIGE6IGEsXG4gICAgfTtcbn1cbi8vIDxodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLXZhbHVlcy8jaW50ZWdlcnM+XG52YXIgQ1NTX0lOVEVHRVIgPSAnWy1cXFxcK10/XFxcXGQrJT8nO1xuLy8gPGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtdmFsdWVzLyNudW1iZXItdmFsdWU+XG52YXIgQ1NTX05VTUJFUiA9ICdbLVxcXFwrXT9cXFxcZCpcXFxcLlxcXFxkKyU/Jztcbi8vIEFsbG93IHBvc2l0aXZlL25lZ2F0aXZlIGludGVnZXIvbnVtYmVyLiAgRG9uJ3QgY2FwdHVyZSB0aGUgZWl0aGVyL29yLCBqdXN0IHRoZSBlbnRpcmUgb3V0Y29tZS5cbnZhciBDU1NfVU5JVCA9IFwiKD86XCIuY29uY2F0KENTU19OVU1CRVIsIFwiKXwoPzpcIikuY29uY2F0KENTU19JTlRFR0VSLCBcIilcIik7XG4vLyBBY3R1YWwgbWF0Y2hpbmcuXG4vLyBQYXJlbnRoZXNlcyBhbmQgY29tbWFzIGFyZSBvcHRpb25hbCwgYnV0IG5vdCByZXF1aXJlZC5cbi8vIFdoaXRlc3BhY2UgY2FuIHRha2UgdGhlIHBsYWNlIG9mIGNvbW1hcyBvciBvcGVuaW5nIHBhcmVuXG52YXIgUEVSTUlTU0lWRV9NQVRDSDMgPSBcIltcXFxcc3xcXFxcKF0rKFwiLmNvbmNhdChDU1NfVU5JVCwgXCIpWyx8XFxcXHNdKyhcIikuY29uY2F0KENTU19VTklULCBcIilbLHxcXFxcc10rKFwiKS5jb25jYXQoQ1NTX1VOSVQsIFwiKVxcXFxzKlxcXFwpP1wiKTtcbnZhciBQRVJNSVNTSVZFX01BVENINCA9IFwiW1xcXFxzfFxcXFwoXSsoXCIuY29uY2F0KENTU19VTklULCBcIilbLHxcXFxcc10rKFwiKS5jb25jYXQoQ1NTX1VOSVQsIFwiKVssfFxcXFxzXSsoXCIpLmNvbmNhdChDU1NfVU5JVCwgXCIpWyx8XFxcXHNdKyhcIikuY29uY2F0KENTU19VTklULCBcIilcXFxccypcXFxcKT9cIik7XG52YXIgbWF0Y2hlcnMgPSB7XG4gICAgQ1NTX1VOSVQ6IG5ldyBSZWdFeHAoQ1NTX1VOSVQpLFxuICAgIHJnYjogbmV3IFJlZ0V4cCgncmdiJyArIFBFUk1JU1NJVkVfTUFUQ0gzKSxcbiAgICByZ2JhOiBuZXcgUmVnRXhwKCdyZ2JhJyArIFBFUk1JU1NJVkVfTUFUQ0g0KSxcbiAgICBoc2w6IG5ldyBSZWdFeHAoJ2hzbCcgKyBQRVJNSVNTSVZFX01BVENIMyksXG4gICAgaHNsYTogbmV3IFJlZ0V4cCgnaHNsYScgKyBQRVJNSVNTSVZFX01BVENINCksXG4gICAgaHN2OiBuZXcgUmVnRXhwKCdoc3YnICsgUEVSTUlTU0lWRV9NQVRDSDMpLFxuICAgIGhzdmE6IG5ldyBSZWdFeHAoJ2hzdmEnICsgUEVSTUlTU0lWRV9NQVRDSDQpLFxuICAgIGhleDM6IC9eIz8oWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KShbMC05YS1mQS1GXXsxfSkkLyxcbiAgICBoZXg2OiAvXiM/KFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkoWzAtOWEtZkEtRl17Mn0pJC8sXG4gICAgaGV4NDogL14jPyhbMC05YS1mQS1GXXsxfSkoWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KShbMC05YS1mQS1GXXsxfSkkLyxcbiAgICBoZXg4OiAvXiM/KFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkoWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KSQvLFxufTtcbi8qKlxuICogUGVybWlzc2l2ZSBzdHJpbmcgcGFyc2luZy4gIFRha2UgaW4gYSBudW1iZXIgb2YgZm9ybWF0cywgYW5kIG91dHB1dCBhbiBvYmplY3RcbiAqIGJhc2VkIG9uIGRldGVjdGVkIGZvcm1hdC4gIFJldHVybnMgYHsgciwgZywgYiB9YCBvciBgeyBoLCBzLCBsIH1gIG9yIGB7IGgsIHMsIHZ9YFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nSW5wdXRUb09iamVjdChjb2xvcikge1xuICAgIGNvbG9yID0gY29sb3IudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGNvbG9yLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBuYW1lZCA9IGZhbHNlO1xuICAgIGlmIChuYW1lc1tjb2xvcl0pIHtcbiAgICAgICAgY29sb3IgPSBuYW1lc1tjb2xvcl07XG4gICAgICAgIG5hbWVkID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29sb3IgPT09ICd0cmFuc3BhcmVudCcpIHtcbiAgICAgICAgcmV0dXJuIHsgcjogMCwgZzogMCwgYjogMCwgYTogMCwgZm9ybWF0OiAnbmFtZScgfTtcbiAgICB9XG4gICAgLy8gVHJ5IHRvIG1hdGNoIHN0cmluZyBpbnB1dCB1c2luZyByZWd1bGFyIGV4cHJlc3Npb25zLlxuICAgIC8vIEtlZXAgbW9zdCBvZiB0aGUgbnVtYmVyIGJvdW5kaW5nIG91dCBvZiB0aGlzIGZ1bmN0aW9uIC0gZG9uJ3Qgd29ycnkgYWJvdXQgWzAsMV0gb3IgWzAsMTAwXSBvciBbMCwzNjBdXG4gICAgLy8gSnVzdCByZXR1cm4gYW4gb2JqZWN0IGFuZCBsZXQgdGhlIGNvbnZlcnNpb24gZnVuY3Rpb25zIGhhbmRsZSB0aGF0LlxuICAgIC8vIFRoaXMgd2F5IHRoZSByZXN1bHQgd2lsbCBiZSB0aGUgc2FtZSB3aGV0aGVyIHRoZSB0aW55Y29sb3IgaXMgaW5pdGlhbGl6ZWQgd2l0aCBzdHJpbmcgb3Igb2JqZWN0LlxuICAgIHZhciBtYXRjaCA9IG1hdGNoZXJzLnJnYi5leGVjKGNvbG9yKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHsgcjogbWF0Y2hbMV0sIGc6IG1hdGNoWzJdLCBiOiBtYXRjaFszXSB9O1xuICAgIH1cbiAgICBtYXRjaCA9IG1hdGNoZXJzLnJnYmEuZXhlYyhjb2xvcik7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7IHI6IG1hdGNoWzFdLCBnOiBtYXRjaFsyXSwgYjogbWF0Y2hbM10sIGE6IG1hdGNoWzRdIH07XG4gICAgfVxuICAgIG1hdGNoID0gbWF0Y2hlcnMuaHNsLmV4ZWMoY29sb3IpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4geyBoOiBtYXRjaFsxXSwgczogbWF0Y2hbMl0sIGw6IG1hdGNoWzNdIH07XG4gICAgfVxuICAgIG1hdGNoID0gbWF0Y2hlcnMuaHNsYS5leGVjKGNvbG9yKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHsgaDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCBsOiBtYXRjaFszXSwgYTogbWF0Y2hbNF0gfTtcbiAgICB9XG4gICAgbWF0Y2ggPSBtYXRjaGVycy5oc3YuZXhlYyhjb2xvcik7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7IGg6IG1hdGNoWzFdLCBzOiBtYXRjaFsyXSwgdjogbWF0Y2hbM10gfTtcbiAgICB9XG4gICAgbWF0Y2ggPSBtYXRjaGVycy5oc3ZhLmV4ZWMoY29sb3IpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4geyBoOiBtYXRjaFsxXSwgczogbWF0Y2hbMl0sIHY6IG1hdGNoWzNdLCBhOiBtYXRjaFs0XSB9O1xuICAgIH1cbiAgICBtYXRjaCA9IG1hdGNoZXJzLmhleDguZXhlYyhjb2xvcik7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMV0pLFxuICAgICAgICAgICAgZzogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzJdKSxcbiAgICAgICAgICAgIGI6IHBhcnNlSW50RnJvbUhleChtYXRjaFszXSksXG4gICAgICAgICAgICBhOiBjb252ZXJ0SGV4VG9EZWNpbWFsKG1hdGNoWzRdKSxcbiAgICAgICAgICAgIGZvcm1hdDogbmFtZWQgPyAnbmFtZScgOiAnaGV4OCcsXG4gICAgICAgIH07XG4gICAgfVxuICAgIG1hdGNoID0gbWF0Y2hlcnMuaGV4Ni5leGVjKGNvbG9yKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHI6IHBhcnNlSW50RnJvbUhleChtYXRjaFsxXSksXG4gICAgICAgICAgICBnOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMl0pLFxuICAgICAgICAgICAgYjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzNdKSxcbiAgICAgICAgICAgIGZvcm1hdDogbmFtZWQgPyAnbmFtZScgOiAnaGV4JyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgbWF0Y2ggPSBtYXRjaGVycy5oZXg0LmV4ZWMoY29sb3IpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzFdICsgbWF0Y2hbMV0pLFxuICAgICAgICAgICAgZzogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzJdICsgbWF0Y2hbMl0pLFxuICAgICAgICAgICAgYjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzNdICsgbWF0Y2hbM10pLFxuICAgICAgICAgICAgYTogY29udmVydEhleFRvRGVjaW1hbChtYXRjaFs0XSArIG1hdGNoWzRdKSxcbiAgICAgICAgICAgIGZvcm1hdDogbmFtZWQgPyAnbmFtZScgOiAnaGV4OCcsXG4gICAgICAgIH07XG4gICAgfVxuICAgIG1hdGNoID0gbWF0Y2hlcnMuaGV4My5leGVjKGNvbG9yKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHI6IHBhcnNlSW50RnJvbUhleChtYXRjaFsxXSArIG1hdGNoWzFdKSxcbiAgICAgICAgICAgIGc6IHBhcnNlSW50RnJvbUhleChtYXRjaFsyXSArIG1hdGNoWzJdKSxcbiAgICAgICAgICAgIGI6IHBhcnNlSW50RnJvbUhleChtYXRjaFszXSArIG1hdGNoWzNdKSxcbiAgICAgICAgICAgIGZvcm1hdDogbmFtZWQgPyAnbmFtZScgOiAnaGV4JyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuLyoqXG4gKiBDaGVjayB0byBzZWUgaWYgaXQgbG9va3MgbGlrZSBhIENTUyB1bml0XG4gKiAoc2VlIGBtYXRjaGVyc2AgYWJvdmUgZm9yIGRlZmluaXRpb24pLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNWYWxpZENTU1VuaXQoY29sb3IpIHtcbiAgICByZXR1cm4gQm9vbGVhbihtYXRjaGVycy5DU1NfVU5JVC5leGVjKFN0cmluZyhjb2xvcikpKTtcbn1cbiIsIi8qKlxuICogVGFrZSBpbnB1dCBmcm9tIFswLCBuXSBhbmQgcmV0dXJuIGl0IGFzIFswLCAxXVxuICogQGhpZGRlblxuICovXG5leHBvcnQgZnVuY3Rpb24gYm91bmQwMShuLCBtYXgpIHtcbiAgICBpZiAoaXNPbmVQb2ludFplcm8obikpIHtcbiAgICAgICAgbiA9ICcxMDAlJztcbiAgICB9XG4gICAgdmFyIGlzUGVyY2VudCA9IGlzUGVyY2VudGFnZShuKTtcbiAgICBuID0gbWF4ID09PSAzNjAgPyBuIDogTWF0aC5taW4obWF4LCBNYXRoLm1heCgwLCBwYXJzZUZsb2F0KG4pKSk7XG4gICAgLy8gQXV0b21hdGljYWxseSBjb252ZXJ0IHBlcmNlbnRhZ2UgaW50byBudW1iZXJcbiAgICBpZiAoaXNQZXJjZW50KSB7XG4gICAgICAgIG4gPSBwYXJzZUludChTdHJpbmcobiAqIG1heCksIDEwKSAvIDEwMDtcbiAgICB9XG4gICAgLy8gSGFuZGxlIGZsb2F0aW5nIHBvaW50IHJvdW5kaW5nIGVycm9yc1xuICAgIGlmIChNYXRoLmFicyhuIC0gbWF4KSA8IDAuMDAwMDAxKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICAvLyBDb252ZXJ0IGludG8gWzAsIDFdIHJhbmdlIGlmIGl0IGlzbid0IGFscmVhZHlcbiAgICBpZiAobWF4ID09PSAzNjApIHtcbiAgICAgICAgLy8gSWYgbiBpcyBhIGh1ZSBnaXZlbiBpbiBkZWdyZWVzLFxuICAgICAgICAvLyB3cmFwIGFyb3VuZCBvdXQtb2YtcmFuZ2UgdmFsdWVzIGludG8gWzAsIDM2MF0gcmFuZ2VcbiAgICAgICAgLy8gdGhlbiBjb252ZXJ0IGludG8gWzAsIDFdLlxuICAgICAgICBuID0gKG4gPCAwID8gKG4gJSBtYXgpICsgbWF4IDogbiAlIG1heCkgLyBwYXJzZUZsb2F0KFN0cmluZyhtYXgpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIElmIG4gbm90IGEgaHVlIGdpdmVuIGluIGRlZ3JlZXNcbiAgICAgICAgLy8gQ29udmVydCBpbnRvIFswLCAxXSByYW5nZSBpZiBpdCBpc24ndCBhbHJlYWR5LlxuICAgICAgICBuID0gKG4gJSBtYXgpIC8gcGFyc2VGbG9hdChTdHJpbmcobWF4KSk7XG4gICAgfVxuICAgIHJldHVybiBuO1xufVxuLyoqXG4gKiBGb3JjZSBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDFcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsYW1wMDEodmFsKSB7XG4gICAgcmV0dXJuIE1hdGgubWluKDEsIE1hdGgubWF4KDAsIHZhbCkpO1xufVxuLyoqXG4gKiBOZWVkIHRvIGhhbmRsZSAxLjAgYXMgMTAwJSwgc2luY2Ugb25jZSBpdCBpcyBhIG51bWJlciwgdGhlcmUgaXMgbm8gZGlmZmVyZW5jZSBiZXR3ZWVuIGl0IGFuZCAxXG4gKiA8aHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy83NDIyMDcyL2phdmFzY3JpcHQtaG93LXRvLWRldGVjdC1udW1iZXItYXMtYS1kZWNpbWFsLWluY2x1ZGluZy0xLTA+XG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09uZVBvaW50WmVybyhuKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBuID09PSAnc3RyaW5nJyAmJiBuLmluZGV4T2YoJy4nKSAhPT0gLTEgJiYgcGFyc2VGbG9hdChuKSA9PT0gMTtcbn1cbi8qKlxuICogQ2hlY2sgdG8gc2VlIGlmIHN0cmluZyBwYXNzZWQgaW4gaXMgYSBwZXJjZW50YWdlXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1BlcmNlbnRhZ2Uobikge1xuICAgIHJldHVybiB0eXBlb2YgbiA9PT0gJ3N0cmluZycgJiYgbi5pbmRleE9mKCclJykgIT09IC0xO1xufVxuLyoqXG4gKiBSZXR1cm4gYSB2YWxpZCBhbHBoYSB2YWx1ZSBbMCwxXSB3aXRoIGFsbCBpbnZhbGlkIHZhbHVlcyBiZWluZyBzZXQgdG8gMVxuICogQGhpZGRlblxuICovXG5leHBvcnQgZnVuY3Rpb24gYm91bmRBbHBoYShhKSB7XG4gICAgYSA9IHBhcnNlRmxvYXQoYSk7XG4gICAgaWYgKGlzTmFOKGEpIHx8IGEgPCAwIHx8IGEgPiAxKSB7XG4gICAgICAgIGEgPSAxO1xuICAgIH1cbiAgICByZXR1cm4gYTtcbn1cbi8qKlxuICogUmVwbGFjZSBhIGRlY2ltYWwgd2l0aCBpdCdzIHBlcmNlbnRhZ2UgdmFsdWVcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb1BlcmNlbnRhZ2Uobikge1xuICAgIGlmIChuIDw9IDEpIHtcbiAgICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KE51bWJlcihuKSAqIDEwMCwgXCIlXCIpO1xuICAgIH1cbiAgICByZXR1cm4gbjtcbn1cbi8qKlxuICogRm9yY2UgYSBoZXggdmFsdWUgdG8gaGF2ZSAyIGNoYXJhY3RlcnNcbiAqIEBoaWRkZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhZDIoYykge1xuICAgIHJldHVybiBjLmxlbmd0aCA9PT0gMSA/ICcwJyArIGMgOiBTdHJpbmcoYyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjYW5Vc2VEb20oKSB7XG4gIHJldHVybiAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnRhaW5zKHJvb3QsIG4pIHtcbiAgaWYgKCFyb290KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gVXNlIG5hdGl2ZSBpZiBzdXBwb3J0XG4gIGlmIChyb290LmNvbnRhaW5zKSB7XG4gICAgcmV0dXJuIHJvb3QuY29udGFpbnMobik7XG4gIH1cblxuICAvLyBgZG9jdW1lbnQuY29udGFpbnNgIG5vdCBzdXBwb3J0IHdpdGggSUUxMVxuICB2YXIgbm9kZSA9IG47XG4gIHdoaWxlIChub2RlKSB7XG4gICAgaWYgKG5vZGUgPT09IHJvb3QpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn0iLCJpbXBvcnQgX29iamVjdFNwcmVhZCBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vb2JqZWN0U3ByZWFkMlwiO1xuaW1wb3J0IGNhblVzZURvbSBmcm9tIFwiLi9jYW5Vc2VEb21cIjtcbmltcG9ydCBjb250YWlucyBmcm9tIFwiLi9jb250YWluc1wiO1xudmFyIEFQUEVORF9PUkRFUiA9ICdkYXRhLXJjLW9yZGVyJztcbnZhciBBUFBFTkRfUFJJT1JJVFkgPSAnZGF0YS1yYy1wcmlvcml0eSc7XG52YXIgTUFSS19LRVkgPSBcInJjLXV0aWwta2V5XCI7XG52YXIgY29udGFpbmVyQ2FjaGUgPSBuZXcgTWFwKCk7XG5mdW5jdGlvbiBnZXRNYXJrKCkge1xuICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge30sXG4gICAgbWFyayA9IF9yZWYubWFyaztcbiAgaWYgKG1hcmspIHtcbiAgICByZXR1cm4gbWFyay5zdGFydHNXaXRoKCdkYXRhLScpID8gbWFyayA6IFwiZGF0YS1cIi5jb25jYXQobWFyayk7XG4gIH1cbiAgcmV0dXJuIE1BUktfS0VZO1xufVxuZnVuY3Rpb24gZ2V0Q29udGFpbmVyKG9wdGlvbikge1xuICBpZiAob3B0aW9uLmF0dGFjaFRvKSB7XG4gICAgcmV0dXJuIG9wdGlvbi5hdHRhY2hUbztcbiAgfVxuICB2YXIgaGVhZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKTtcbiAgcmV0dXJuIGhlYWQgfHwgZG9jdW1lbnQuYm9keTtcbn1cbmZ1bmN0aW9uIGdldE9yZGVyKHByZXBlbmQpIHtcbiAgaWYgKHByZXBlbmQgPT09ICdxdWV1ZScpIHtcbiAgICByZXR1cm4gJ3ByZXBlbmRRdWV1ZSc7XG4gIH1cbiAgcmV0dXJuIHByZXBlbmQgPyAncHJlcGVuZCcgOiAnYXBwZW5kJztcbn1cblxuLyoqXG4gKiBGaW5kIHN0eWxlIHdoaWNoIGluamVjdCBieSByYy11dGlsXG4gKi9cbmZ1bmN0aW9uIGZpbmRTdHlsZXMoY29udGFpbmVyKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKChjb250YWluZXJDYWNoZS5nZXQoY29udGFpbmVyKSB8fCBjb250YWluZXIpLmNoaWxkcmVuKS5maWx0ZXIoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS50YWdOYW1lID09PSAnU1RZTEUnO1xuICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RDU1MoY3NzKSB7XG4gIHZhciBvcHRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICBpZiAoIWNhblVzZURvbSgpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmFyIGNzcCA9IG9wdGlvbi5jc3AsXG4gICAgcHJlcGVuZCA9IG9wdGlvbi5wcmVwZW5kLFxuICAgIF9vcHRpb24kcHJpb3JpdHkgPSBvcHRpb24ucHJpb3JpdHksXG4gICAgcHJpb3JpdHkgPSBfb3B0aW9uJHByaW9yaXR5ID09PSB2b2lkIDAgPyAwIDogX29wdGlvbiRwcmlvcml0eTtcbiAgdmFyIG1lcmdlZE9yZGVyID0gZ2V0T3JkZXIocHJlcGVuZCk7XG4gIHZhciBpc1ByZXBlbmRRdWV1ZSA9IG1lcmdlZE9yZGVyID09PSAncHJlcGVuZFF1ZXVlJztcbiAgdmFyIHN0eWxlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHN0eWxlTm9kZS5zZXRBdHRyaWJ1dGUoQVBQRU5EX09SREVSLCBtZXJnZWRPcmRlcik7XG4gIGlmIChpc1ByZXBlbmRRdWV1ZSAmJiBwcmlvcml0eSkge1xuICAgIHN0eWxlTm9kZS5zZXRBdHRyaWJ1dGUoQVBQRU5EX1BSSU9SSVRZLCBcIlwiLmNvbmNhdChwcmlvcml0eSkpO1xuICB9XG4gIGlmIChjc3AgIT09IG51bGwgJiYgY3NwICE9PSB2b2lkIDAgJiYgY3NwLm5vbmNlKSB7XG4gICAgc3R5bGVOb2RlLm5vbmNlID0gY3NwID09PSBudWxsIHx8IGNzcCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3NwLm5vbmNlO1xuICB9XG4gIHN0eWxlTm9kZS5pbm5lckhUTUwgPSBjc3M7XG4gIHZhciBjb250YWluZXIgPSBnZXRDb250YWluZXIob3B0aW9uKTtcbiAgdmFyIGZpcnN0Q2hpbGQgPSBjb250YWluZXIuZmlyc3RDaGlsZDtcbiAgaWYgKHByZXBlbmQpIHtcbiAgICAvLyBJZiBpcyBxdWV1ZSBgcHJlcGVuZGAsIGl0IHdpbGwgcHJlcGVuZCBmaXJzdCBzdHlsZSBhbmQgdGhlbiBhcHBlbmQgcmVzdCBzdHlsZVxuICAgIGlmIChpc1ByZXBlbmRRdWV1ZSkge1xuICAgICAgdmFyIGV4aXN0U3R5bGUgPSAob3B0aW9uLnN0eWxlcyB8fCBmaW5kU3R5bGVzKGNvbnRhaW5lcikpLmZpbHRlcihmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAvLyBJZ25vcmUgc3R5bGUgd2hpY2ggbm90IGluamVjdGVkIGJ5IHJjLXV0aWwgd2l0aCBwcmVwZW5kXG4gICAgICAgIGlmICghWydwcmVwZW5kJywgJ3ByZXBlbmRRdWV1ZSddLmluY2x1ZGVzKG5vZGUuZ2V0QXR0cmlidXRlKEFQUEVORF9PUkRFUikpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWdub3JlIHN0eWxlIHdoaWNoIHByaW9yaXR5IGxlc3MgdGhlbiBuZXcgc3R5bGVcbiAgICAgICAgdmFyIG5vZGVQcmlvcml0eSA9IE51bWJlcihub2RlLmdldEF0dHJpYnV0ZShBUFBFTkRfUFJJT1JJVFkpIHx8IDApO1xuICAgICAgICByZXR1cm4gcHJpb3JpdHkgPj0gbm9kZVByaW9yaXR5O1xuICAgICAgfSk7XG4gICAgICBpZiAoZXhpc3RTdHlsZS5sZW5ndGgpIHtcbiAgICAgICAgY29udGFpbmVyLmluc2VydEJlZm9yZShzdHlsZU5vZGUsIGV4aXN0U3R5bGVbZXhpc3RTdHlsZS5sZW5ndGggLSAxXS5uZXh0U2libGluZyk7XG4gICAgICAgIHJldHVybiBzdHlsZU5vZGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVXNlIGBpbnNlcnRCZWZvcmVgIGFzIGBwcmVwZW5kYFxuICAgIGNvbnRhaW5lci5pbnNlcnRCZWZvcmUoc3R5bGVOb2RlLCBmaXJzdENoaWxkKTtcbiAgfSBlbHNlIHtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3R5bGVOb2RlKTtcbiAgfVxuICByZXR1cm4gc3R5bGVOb2RlO1xufVxuZnVuY3Rpb24gZmluZEV4aXN0Tm9kZShrZXkpIHtcbiAgdmFyIG9wdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gIHZhciBjb250YWluZXIgPSBnZXRDb250YWluZXIob3B0aW9uKTtcbiAgcmV0dXJuIChvcHRpb24uc3R5bGVzIHx8IGZpbmRTdHlsZXMoY29udGFpbmVyKSkuZmluZChmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBub2RlLmdldEF0dHJpYnV0ZShnZXRNYXJrKG9wdGlvbikpID09PSBrZXk7XG4gIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNTUyhrZXkpIHtcbiAgdmFyIG9wdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gIHZhciBleGlzdE5vZGUgPSBmaW5kRXhpc3ROb2RlKGtleSwgb3B0aW9uKTtcbiAgaWYgKGV4aXN0Tm9kZSkge1xuICAgIHZhciBjb250YWluZXIgPSBnZXRDb250YWluZXIob3B0aW9uKTtcbiAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQoZXhpc3ROb2RlKTtcbiAgfVxufVxuXG4vKipcbiAqIHFpYW5rdW4gd2lsbCBpbmplY3QgYGFwcGVuZENoaWxkYCB0byBpbnNlcnQgaW50byBvdGhlclxuICovXG5mdW5jdGlvbiBzeW5jUmVhbENvbnRhaW5lcihjb250YWluZXIsIG9wdGlvbikge1xuICB2YXIgY2FjaGVkUmVhbENvbnRhaW5lciA9IGNvbnRhaW5lckNhY2hlLmdldChjb250YWluZXIpO1xuXG4gIC8vIEZpbmQgcmVhbCBjb250YWluZXIgd2hlbiBub3QgY2FjaGVkIG9yIGNhY2hlZCBjb250YWluZXIgcmVtb3ZlZFxuICBpZiAoIWNhY2hlZFJlYWxDb250YWluZXIgfHwgIWNvbnRhaW5zKGRvY3VtZW50LCBjYWNoZWRSZWFsQ29udGFpbmVyKSkge1xuICAgIHZhciBwbGFjZWhvbGRlclN0eWxlID0gaW5qZWN0Q1NTKCcnLCBvcHRpb24pO1xuICAgIHZhciBwYXJlbnROb2RlID0gcGxhY2Vob2xkZXJTdHlsZS5wYXJlbnROb2RlO1xuICAgIGNvbnRhaW5lckNhY2hlLnNldChjb250YWluZXIsIHBhcmVudE5vZGUpO1xuICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChwbGFjZWhvbGRlclN0eWxlKTtcbiAgfVxufVxuXG4vKipcbiAqIG1hbnVhbGx5IGNsZWFyIGNvbnRhaW5lciBjYWNoZSB0byBhdm9pZCBnbG9iYWwgY2FjaGUgaW4gdW5pdCB0ZXN0ZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ29udGFpbmVyQ2FjaGUoKSB7XG4gIGNvbnRhaW5lckNhY2hlLmNsZWFyKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQ1NTKGNzcywga2V5KSB7XG4gIHZhciBvcmlnaW5PcHRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICB2YXIgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKG9yaWdpbk9wdGlvbik7XG4gIHZhciBzdHlsZXMgPSBmaW5kU3R5bGVzKGNvbnRhaW5lcik7XG4gIHZhciBvcHRpb24gPSBfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoe30sIG9yaWdpbk9wdGlvbiksIHt9LCB7XG4gICAgc3R5bGVzOiBzdHlsZXNcbiAgfSk7XG5cbiAgLy8gU3luYyByZWFsIHBhcmVudFxuICBzeW5jUmVhbENvbnRhaW5lcihjb250YWluZXIsIG9wdGlvbik7XG4gIHZhciBleGlzdE5vZGUgPSBmaW5kRXhpc3ROb2RlKGtleSwgb3B0aW9uKTtcbiAgaWYgKGV4aXN0Tm9kZSkge1xuICAgIHZhciBfb3B0aW9uJGNzcCwgX29wdGlvbiRjc3AyO1xuICAgIGlmICgoX29wdGlvbiRjc3AgPSBvcHRpb24uY3NwKSAhPT0gbnVsbCAmJiBfb3B0aW9uJGNzcCAhPT0gdm9pZCAwICYmIF9vcHRpb24kY3NwLm5vbmNlICYmIGV4aXN0Tm9kZS5ub25jZSAhPT0gKChfb3B0aW9uJGNzcDIgPSBvcHRpb24uY3NwKSA9PT0gbnVsbCB8fCBfb3B0aW9uJGNzcDIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vcHRpb24kY3NwMi5ub25jZSkpIHtcbiAgICAgIHZhciBfb3B0aW9uJGNzcDM7XG4gICAgICBleGlzdE5vZGUubm9uY2UgPSAoX29wdGlvbiRjc3AzID0gb3B0aW9uLmNzcCkgPT09IG51bGwgfHwgX29wdGlvbiRjc3AzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfb3B0aW9uJGNzcDMubm9uY2U7XG4gICAgfVxuICAgIGlmIChleGlzdE5vZGUuaW5uZXJIVE1MICE9PSBjc3MpIHtcbiAgICAgIGV4aXN0Tm9kZS5pbm5lckhUTUwgPSBjc3M7XG4gICAgfVxuICAgIHJldHVybiBleGlzdE5vZGU7XG4gIH1cbiAgdmFyIG5ld05vZGUgPSBpbmplY3RDU1MoY3NzLCBvcHRpb24pO1xuICBuZXdOb2RlLnNldEF0dHJpYnV0ZShnZXRNYXJrKG9wdGlvbiksIGtleSk7XG4gIHJldHVybiBuZXdOb2RlO1xufSIsImZ1bmN0aW9uIGdldFJvb3QoZWxlKSB7XG4gIHZhciBfZWxlJGdldFJvb3ROb2RlO1xuICByZXR1cm4gZWxlID09PSBudWxsIHx8IGVsZSA9PT0gdm9pZCAwIHx8IChfZWxlJGdldFJvb3ROb2RlID0gZWxlLmdldFJvb3ROb2RlKSA9PT0gbnVsbCB8fCBfZWxlJGdldFJvb3ROb2RlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZWxlJGdldFJvb3ROb2RlLmNhbGwoZWxlKTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBpcyBpbiBzaGFkb3dSb290XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpblNoYWRvdyhlbGUpIHtcbiAgcmV0dXJuIGdldFJvb3QoZWxlKSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3Q7XG59XG5cbi8qKlxuICogUmV0dXJuIHNoYWRvd1Jvb3QgaWYgcG9zc2libGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNoYWRvd1Jvb3QoZWxlKSB7XG4gIHJldHVybiBpblNoYWRvdyhlbGUpID8gZ2V0Um9vdChlbGUpIDogbnVsbDtcbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG52YXIgd2FybmVkID0ge307XG52YXIgcHJlV2FybmluZ0ZucyA9IFtdO1xuXG4vKipcbiAqIFByZSB3YXJuaW5nIGVuYWJsZSB5b3UgdG8gcGFyc2UgY29udGVudCBiZWZvcmUgY29uc29sZS5lcnJvci5cbiAqIE1vZGlmeSB0byBudWxsIHdpbGwgcHJldmVudCB3YXJuaW5nLlxuICovXG5leHBvcnQgdmFyIHByZU1lc3NhZ2UgPSBmdW5jdGlvbiBwcmVNZXNzYWdlKGZuKSB7XG4gIHByZVdhcm5pbmdGbnMucHVzaChmbik7XG59O1xuXG4vKipcbiAqIFdhcm5pbmcgaWYgY29uZGl0aW9uIG5vdCBtYXRjaC5cbiAqIEBwYXJhbSB2YWxpZCBDb25kaXRpb25cbiAqIEBwYXJhbSBtZXNzYWdlIFdhcm5pbmcgbWVzc2FnZVxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiB3YXJuaW5nKGZhbHNlLCAnc29tZSBlcnJvcicpOyAvLyBwcmludCBzb21lIGVycm9yXG4gKiB3YXJuaW5nKHRydWUsICdzb21lIGVycm9yJyk7IC8vIHByaW50IG5vdGhpbmdcbiAqIHdhcm5pbmcoMSA9PT0gMiwgJ3NvbWUgZXJyb3InKTsgLy8gcHJpbnQgc29tZSBlcnJvclxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3YXJuaW5nKHZhbGlkLCBtZXNzYWdlKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmICF2YWxpZCAmJiBjb25zb2xlICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZmluYWxNZXNzYWdlID0gcHJlV2FybmluZ0Zucy5yZWR1Y2UoZnVuY3Rpb24gKG1zZywgcHJlTWVzc2FnZUZuKSB7XG4gICAgICByZXR1cm4gcHJlTWVzc2FnZUZuKG1zZyAhPT0gbnVsbCAmJiBtc2cgIT09IHZvaWQgMCA/IG1zZyA6ICcnLCAnd2FybmluZycpO1xuICAgIH0sIG1lc3NhZ2UpO1xuICAgIGlmIChmaW5hbE1lc3NhZ2UpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJXYXJuaW5nOiBcIi5jb25jYXQoZmluYWxNZXNzYWdlKSk7XG4gICAgfVxuICB9XG59XG5cbi8qKiBAc2VlIFNpbWlsYXIgdG8ge0BsaW5rIHdhcm5pbmd9ICovXG5leHBvcnQgZnVuY3Rpb24gbm90ZSh2YWxpZCwgbWVzc2FnZSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiAhdmFsaWQgJiYgY29uc29sZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGZpbmFsTWVzc2FnZSA9IHByZVdhcm5pbmdGbnMucmVkdWNlKGZ1bmN0aW9uIChtc2csIHByZU1lc3NhZ2VGbikge1xuICAgICAgcmV0dXJuIHByZU1lc3NhZ2VGbihtc2cgIT09IG51bGwgJiYgbXNnICE9PSB2b2lkIDAgPyBtc2cgOiAnJywgJ25vdGUnKTtcbiAgICB9LCBtZXNzYWdlKTtcbiAgICBpZiAoZmluYWxNZXNzYWdlKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJOb3RlOiBcIi5jb25jYXQoZmluYWxNZXNzYWdlKSk7XG4gICAgfVxuICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcmVzZXRXYXJuZWQoKSB7XG4gIHdhcm5lZCA9IHt9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNhbGwobWV0aG9kLCB2YWxpZCwgbWVzc2FnZSkge1xuICBpZiAoIXZhbGlkICYmICF3YXJuZWRbbWVzc2FnZV0pIHtcbiAgICBtZXRob2QoZmFsc2UsIG1lc3NhZ2UpO1xuICAgIHdhcm5lZFttZXNzYWdlXSA9IHRydWU7XG4gIH1cbn1cblxuLyoqIEBzZWUgU2FtZSBhcyB7QGxpbmsgd2FybmluZ30sIGJ1dCBvbmx5IHdhcm4gb25jZSBmb3IgdGhlIHNhbWUgbWVzc2FnZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdhcm5pbmdPbmNlKHZhbGlkLCBtZXNzYWdlKSB7XG4gIGNhbGwod2FybmluZywgdmFsaWQsIG1lc3NhZ2UpO1xufVxuXG4vKiogQHNlZSBTYW1lIGFzIHtAbGluayB3YXJuaW5nfSwgYnV0IG9ubHkgd2FybiBvbmNlIGZvciB0aGUgc2FtZSBtZXNzYWdlICovXG5leHBvcnQgZnVuY3Rpb24gbm90ZU9uY2UodmFsaWQsIG1lc3NhZ2UpIHtcbiAgY2FsbChub3RlLCB2YWxpZCwgbWVzc2FnZSk7XG59XG53YXJuaW5nT25jZS5wcmVNZXNzYWdlID0gcHJlTWVzc2FnZTtcbndhcm5pbmdPbmNlLnJlc2V0V2FybmVkID0gcmVzZXRXYXJuZWQ7XG53YXJuaW5nT25jZS5ub3RlT25jZSA9IG5vdGVPbmNlO1xuZXhwb3J0IGRlZmF1bHQgd2FybmluZ09uY2U7IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3JlYWN0X187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2ppbXVfdWlfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfamltdV91aV9hZHZhbmNlZF9zZXR0aW5nX2NvbXBvbmVudHNfXzsiLCIvKiFcblx0Q29weXJpZ2h0IChjKSAyMDE4IEplZCBXYXRzb24uXG5cdExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG5cdGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSAnJztcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKGFyZykge1xuXHRcdFx0XHRjbGFzc2VzID0gYXBwZW5kQ2xhc3MoY2xhc3NlcywgcGFyc2VWYWx1ZShhcmcpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcztcblx0fVxuXG5cdGZ1bmN0aW9uIHBhcnNlVmFsdWUgKGFyZykge1xuXHRcdGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuXHRcdFx0cmV0dXJuIGFyZztcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIGFyZyAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXHRcdH1cblxuXHRcdGlmIChhcmcudG9TdHJpbmcgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgJiYgIWFyZy50b1N0cmluZy50b1N0cmluZygpLmluY2x1ZGVzKCdbbmF0aXZlIGNvZGVdJykpIHtcblx0XHRcdHJldHVybiBhcmcudG9TdHJpbmcoKTtcblx0XHR9XG5cblx0XHR2YXIgY2xhc3NlcyA9ICcnO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRjbGFzc2VzID0gYXBwZW5kQ2xhc3MoY2xhc3Nlcywga2V5KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcztcblx0fVxuXG5cdGZ1bmN0aW9uIGFwcGVuZENsYXNzICh2YWx1ZSwgbmV3Q2xhc3MpIHtcblx0XHRpZiAoIW5ld0NsYXNzKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXHRcblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdHJldHVybiB2YWx1ZSArICcgJyArIG5ld0NsYXNzO1xuXHRcdH1cblx0XG5cdFx0cmV0dXJuIHZhbHVlICsgbmV3Q2xhc3M7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRjbGFzc05hbWVzLmRlZmF1bHQgPSBjbGFzc05hbWVzO1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCJmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShyLCBhKSB7XG4gIChudWxsID09IGEgfHwgYSA+IHIubGVuZ3RoKSAmJiAoYSA9IHIubGVuZ3RoKTtcbiAgZm9yICh2YXIgZSA9IDAsIG4gPSBBcnJheShhKTsgZSA8IGE7IGUrKykgbltlXSA9IHJbZV07XG4gIHJldHVybiBuO1xufVxuZXhwb3J0IHsgX2FycmF5TGlrZVRvQXJyYXkgYXMgZGVmYXVsdCB9OyIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHIpKSByZXR1cm4gcjtcbn1cbmV4cG9ydCB7IF9hcnJheVdpdGhIb2xlcyBhcyBkZWZhdWx0IH07IiwiaW1wb3J0IHRvUHJvcGVydHlLZXkgZnJvbSBcIi4vdG9Qcm9wZXJ0eUtleS5qc1wiO1xuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KGUsIHIsIHQpIHtcbiAgcmV0dXJuIChyID0gdG9Qcm9wZXJ0eUtleShyKSkgaW4gZSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCByLCB7XG4gICAgdmFsdWU6IHQsXG4gICAgZW51bWVyYWJsZTogITAsXG4gICAgY29uZmlndXJhYmxlOiAhMCxcbiAgICB3cml0YWJsZTogITBcbiAgfSkgOiBlW3JdID0gdCwgZTtcbn1cbmV4cG9ydCB7IF9kZWZpbmVQcm9wZXJ0eSBhcyBkZWZhdWx0IH07IiwiZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIHJldHVybiBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gPyBPYmplY3QuYXNzaWduLmJpbmQoKSA6IGZ1bmN0aW9uIChuKSB7XG4gICAgZm9yICh2YXIgZSA9IDE7IGUgPCBhcmd1bWVudHMubGVuZ3RoOyBlKyspIHtcbiAgICAgIHZhciB0ID0gYXJndW1lbnRzW2VdO1xuICAgICAgZm9yICh2YXIgciBpbiB0KSAoe30pLmhhc093blByb3BlcnR5LmNhbGwodCwgcikgJiYgKG5bcl0gPSB0W3JdKTtcbiAgICB9XG4gICAgcmV0dXJuIG47XG4gIH0sIF9leHRlbmRzLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59XG5leHBvcnQgeyBfZXh0ZW5kcyBhcyBkZWZhdWx0IH07IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KHIsIGwpIHtcbiAgdmFyIHQgPSBudWxsID09IHIgPyBudWxsIDogXCJ1bmRlZmluZWRcIiAhPSB0eXBlb2YgU3ltYm9sICYmIHJbU3ltYm9sLml0ZXJhdG9yXSB8fCByW1wiQEBpdGVyYXRvclwiXTtcbiAgaWYgKG51bGwgIT0gdCkge1xuICAgIHZhciBlLFxuICAgICAgbixcbiAgICAgIGksXG4gICAgICB1LFxuICAgICAgYSA9IFtdLFxuICAgICAgZiA9ICEwLFxuICAgICAgbyA9ICExO1xuICAgIHRyeSB7XG4gICAgICBpZiAoaSA9ICh0ID0gdC5jYWxsKHIpKS5uZXh0LCAwID09PSBsKSB7XG4gICAgICAgIGlmIChPYmplY3QodCkgIT09IHQpIHJldHVybjtcbiAgICAgICAgZiA9ICExO1xuICAgICAgfSBlbHNlIGZvciAoOyAhKGYgPSAoZSA9IGkuY2FsbCh0KSkuZG9uZSkgJiYgKGEucHVzaChlLnZhbHVlKSwgYS5sZW5ndGggIT09IGwpOyBmID0gITApO1xuICAgIH0gY2F0Y2ggKHIpIHtcbiAgICAgIG8gPSAhMCwgbiA9IHI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghZiAmJiBudWxsICE9IHRbXCJyZXR1cm5cIl0gJiYgKHUgPSB0W1wicmV0dXJuXCJdKCksIE9iamVjdCh1KSAhPT0gdSkpIHJldHVybjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChvKSB0aHJvdyBuO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYTtcbiAgfVxufVxuZXhwb3J0IHsgX2l0ZXJhYmxlVG9BcnJheUxpbWl0IGFzIGRlZmF1bHQgfTsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuZXhwb3J0IHsgX25vbkl0ZXJhYmxlUmVzdCBhcyBkZWZhdWx0IH07IiwiaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gXCIuL2RlZmluZVByb3BlcnR5LmpzXCI7XG5mdW5jdGlvbiBvd25LZXlzKGUsIHIpIHtcbiAgdmFyIHQgPSBPYmplY3Qua2V5cyhlKTtcbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgbyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSk7XG4gICAgciAmJiAobyA9IG8uZmlsdGVyKGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlLCByKS5lbnVtZXJhYmxlO1xuICAgIH0pKSwgdC5wdXNoLmFwcGx5KHQsIG8pO1xuICB9XG4gIHJldHVybiB0O1xufVxuZnVuY3Rpb24gX29iamVjdFNwcmVhZDIoZSkge1xuICBmb3IgKHZhciByID0gMTsgciA8IGFyZ3VtZW50cy5sZW5ndGg7IHIrKykge1xuICAgIHZhciB0ID0gbnVsbCAhPSBhcmd1bWVudHNbcl0gPyBhcmd1bWVudHNbcl0gOiB7fTtcbiAgICByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikge1xuICAgICAgZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7XG4gICAgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHQpKSA6IG93bktleXMoT2JqZWN0KHQpKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGU7XG59XG5leHBvcnQgeyBfb2JqZWN0U3ByZWFkMiBhcyBkZWZhdWx0IH07IiwiaW1wb3J0IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UgZnJvbSBcIi4vb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZS5qc1wiO1xuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKGUsIHQpIHtcbiAgaWYgKG51bGwgPT0gZSkgcmV0dXJuIHt9O1xuICB2YXIgbyxcbiAgICByLFxuICAgIGkgPSBvYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKGUsIHQpO1xuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHZhciBzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTtcbiAgICBmb3IgKHIgPSAwOyByIDwgcy5sZW5ndGg7IHIrKykgbyA9IHNbcl0sIHQuaW5jbHVkZXMobykgfHwge30ucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChlLCBvKSAmJiAoaVtvXSA9IGVbb10pO1xuICB9XG4gIHJldHVybiBpO1xufVxuZXhwb3J0IHsgX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIGFzIGRlZmF1bHQgfTsiLCJmdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShyLCBlKSB7XG4gIGlmIChudWxsID09IHIpIHJldHVybiB7fTtcbiAgdmFyIHQgPSB7fTtcbiAgZm9yICh2YXIgbiBpbiByKSBpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChyLCBuKSkge1xuICAgIGlmIChlLmluY2x1ZGVzKG4pKSBjb250aW51ZTtcbiAgICB0W25dID0gcltuXTtcbiAgfVxuICByZXR1cm4gdDtcbn1cbmV4cG9ydCB7IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIGFzIGRlZmF1bHQgfTsiLCJpbXBvcnQgYXJyYXlXaXRoSG9sZXMgZnJvbSBcIi4vYXJyYXlXaXRoSG9sZXMuanNcIjtcbmltcG9ydCBpdGVyYWJsZVRvQXJyYXlMaW1pdCBmcm9tIFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qc1wiO1xuaW1wb3J0IHVuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IGZyb20gXCIuL3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5LmpzXCI7XG5pbXBvcnQgbm9uSXRlcmFibGVSZXN0IGZyb20gXCIuL25vbkl0ZXJhYmxlUmVzdC5qc1wiO1xuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkociwgZSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMocikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQociwgZSkgfHwgdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkociwgZSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5leHBvcnQgeyBfc2xpY2VkVG9BcnJheSBhcyBkZWZhdWx0IH07IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5mdW5jdGlvbiB0b1ByaW1pdGl2ZSh0LCByKSB7XG4gIGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YodCkgfHwgIXQpIHJldHVybiB0O1xuICB2YXIgZSA9IHRbU3ltYm9sLnRvUHJpbWl0aXZlXTtcbiAgaWYgKHZvaWQgMCAhPT0gZSkge1xuICAgIHZhciBpID0gZS5jYWxsKHQsIHIgfHwgXCJkZWZhdWx0XCIpO1xuICAgIGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YoaSkpIHJldHVybiBpO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTtcbiAgfVxuICByZXR1cm4gKFwic3RyaW5nXCIgPT09IHIgPyBTdHJpbmcgOiBOdW1iZXIpKHQpO1xufVxuZXhwb3J0IHsgdG9QcmltaXRpdmUgYXMgZGVmYXVsdCB9OyIsImltcG9ydCBfdHlwZW9mIGZyb20gXCIuL3R5cGVvZi5qc1wiO1xuaW1wb3J0IHRvUHJpbWl0aXZlIGZyb20gXCIuL3RvUHJpbWl0aXZlLmpzXCI7XG5mdW5jdGlvbiB0b1Byb3BlcnR5S2V5KHQpIHtcbiAgdmFyIGkgPSB0b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIFwic3ltYm9sXCIgPT0gX3R5cGVvZihpKSA/IGkgOiBpICsgXCJcIjtcbn1cbmV4cG9ydCB7IHRvUHJvcGVydHlLZXkgYXMgZGVmYXVsdCB9OyIsImZ1bmN0aW9uIF90eXBlb2Yobykge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykge1xuICAgIHJldHVybiB0eXBlb2YgbztcbiAgfSA6IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIG8gJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgby5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG8gIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG87XG4gIH0sIF90eXBlb2Yobyk7XG59XG5leHBvcnQgeyBfdHlwZW9mIGFzIGRlZmF1bHQgfTsiLCJpbXBvcnQgYXJyYXlMaWtlVG9BcnJheSBmcm9tIFwiLi9hcnJheUxpa2VUb0FycmF5LmpzXCI7XG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkociwgYSkge1xuICBpZiAocikge1xuICAgIGlmIChcInN0cmluZ1wiID09IHR5cGVvZiByKSByZXR1cm4gYXJyYXlMaWtlVG9BcnJheShyLCBhKTtcbiAgICB2YXIgdCA9IHt9LnRvU3RyaW5nLmNhbGwocikuc2xpY2UoOCwgLTEpO1xuICAgIHJldHVybiBcIk9iamVjdFwiID09PSB0ICYmIHIuY29uc3RydWN0b3IgJiYgKHQgPSByLmNvbnN0cnVjdG9yLm5hbWUpLCBcIk1hcFwiID09PSB0IHx8IFwiU2V0XCIgPT09IHQgPyBBcnJheS5mcm9tKHIpIDogXCJBcmd1bWVudHNcIiA9PT0gdCB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdCh0KSA/IGFycmF5TGlrZVRvQXJyYXkociwgYSkgOiB2b2lkIDA7XG4gIH1cbn1cbmV4cG9ydCB7IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSBhcyBkZWZhdWx0IH07IiwiaW1wb3J0IHRvUHJvcGVydHlLZXkgZnJvbSBcIi4vdG9Qcm9wZXJ0eUtleS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBrZXkgPSB0b1Byb3BlcnR5S2V5KGtleSk7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBvYmo7XG59IiwiaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gXCIuL2RlZmluZVByb3BlcnR5LmpzXCI7XG5mdW5jdGlvbiBvd25LZXlzKGUsIHIpIHtcbiAgdmFyIHQgPSBPYmplY3Qua2V5cyhlKTtcbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgbyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSk7XG4gICAgciAmJiAobyA9IG8uZmlsdGVyKGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihlLCByKS5lbnVtZXJhYmxlO1xuICAgIH0pKSwgdC5wdXNoLmFwcGx5KHQsIG8pO1xuICB9XG4gIHJldHVybiB0O1xufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX29iamVjdFNwcmVhZDIoZSkge1xuICBmb3IgKHZhciByID0gMTsgciA8IGFyZ3VtZW50cy5sZW5ndGg7IHIrKykge1xuICAgIHZhciB0ID0gbnVsbCAhPSBhcmd1bWVudHNbcl0gPyBhcmd1bWVudHNbcl0gOiB7fTtcbiAgICByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikge1xuICAgICAgZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7XG4gICAgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGUsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHQpKSA6IG93bktleXMoT2JqZWN0KHQpKS5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGU7XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b1ByaW1pdGl2ZSh0LCByKSB7XG4gIGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YodCkgfHwgIXQpIHJldHVybiB0O1xuICB2YXIgZSA9IHRbU3ltYm9sLnRvUHJpbWl0aXZlXTtcbiAgaWYgKHZvaWQgMCAhPT0gZSkge1xuICAgIHZhciBpID0gZS5jYWxsKHQsIHIgfHwgXCJkZWZhdWx0XCIpO1xuICAgIGlmIChcIm9iamVjdFwiICE9IF90eXBlb2YoaSkpIHJldHVybiBpO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTtcbiAgfVxuICByZXR1cm4gKFwic3RyaW5nXCIgPT09IHIgPyBTdHJpbmcgOiBOdW1iZXIpKHQpO1xufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCIuL3R5cGVvZi5qc1wiO1xuaW1wb3J0IHRvUHJpbWl0aXZlIGZyb20gXCIuL3RvUHJpbWl0aXZlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b1Byb3BlcnR5S2V5KHQpIHtcbiAgdmFyIGkgPSB0b1ByaW1pdGl2ZSh0LCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIFwic3ltYm9sXCIgPT0gX3R5cGVvZihpKSA/IGkgOiBTdHJpbmcoaSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3R5cGVvZihvKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvO1xuICB9IDogZnVuY3Rpb24gKG8pIHtcbiAgICByZXR1cm4gbyAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2YgbztcbiAgfSwgX3R5cGVvZihvKTtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjsiLCIvKipcclxuICogV2VicGFjayB3aWxsIHJlcGxhY2UgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gd2l0aCBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgdG8gc2V0IHRoZSBwdWJsaWMgcGF0aCBkeW5hbWljYWxseS5cclxuICogVGhlIHJlYXNvbiB3aHkgd2UgY2FuJ3Qgc2V0IHRoZSBwdWJsaWNQYXRoIGluIHdlYnBhY2sgY29uZmlnIGlzOiB3ZSBjaGFuZ2UgdGhlIHB1YmxpY1BhdGggd2hlbiBkb3dubG9hZC5cclxuICogKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbi8vIEB0cy1pZ25vcmVcclxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSB3aW5kb3cuamltdUNvbmZpZy5iYXNlVXJsXHJcbiIsIi8vIGltcG9ydCB7IFJlYWN0IH0gZnJvbSAnamltdS1jb3JlJ1xyXG4vLyBpbXBvcnQgeyBBbGxXaWRnZXRTZXR0aW5nUHJvcHMgfSBmcm9tICdqaW11LWZvci1idWlsZGVyJ1xyXG4vLyBpbXBvcnQge1xyXG4vLyAgIE1hcFdpZGdldFNlbGVjdG9yLFxyXG4vLyAgIFNldHRpbmdTZWN0aW9uLFxyXG4vLyAgIFNldHRpbmdSb3dcclxuLy8gfSBmcm9tIFwiamltdS11aS9hZHZhbmNlZC9zZXR0aW5nLWNvbXBvbmVudHNcIjtcclxuXHJcbi8vIC8vIGltcG9ydCBkZWZhdWx0TWVzc2FnZXMgZnJvbSBcIi4vdHJhbnNsYXRpb25zL2RlZmF1bHRcIjtcclxuXHJcbi8vIGNvbnN0IFNldHRpbmcgPSAocHJvcHM6IEFsbFdpZGdldFNldHRpbmdQcm9wczxhbnk+KSA9PiB7XHJcbi8vICAgY29uc3Qgb25NYXBXaWRnZXRTZWxlY3RlZCA9ICh1c2VNYXBXaWRnZXRJZHM6IHN0cmluZ1tdKSA9PiB7XHJcbi8vICAgICBwcm9wcy5vblNldHRpbmdDaGFuZ2Uoe1xyXG4vLyAgICAgICBpZDogcHJvcHMuaWQsXHJcbi8vICAgICAgIHVzZU1hcFdpZGdldElkczogdXNlTWFwV2lkZ2V0SWRzXHJcbi8vICAgICB9KVxyXG4vLyAgIH1cclxuIFxyXG4vLyAgIHJldHVybiAoXHJcbi8vICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1zZXR0aW5nLWRlbW9cIj5cclxuLy8gICAgICAgPE1hcFdpZGdldFNlbGVjdG9yXHJcbi8vICAgICAgICAgdXNlTWFwV2lkZ2V0SWRzPXtwcm9wcy51c2VNYXBXaWRnZXRJZHN9XHJcbi8vICAgICAgICAgb25TZWxlY3Q9e29uTWFwV2lkZ2V0U2VsZWN0ZWR9XHJcbi8vICAgICAgIC8+XHJcbi8vICAgICA8L2Rpdj5cclxuLy8gICApXHJcbi8vIH1cclxuXHJcbi8vIC8vIGV4cG9ydCBkZWZhdWx0IFNldHRpbmdcclxuLy8gaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbi8vIGltcG9ydCB7IEFsbFdpZGdldFNldHRpbmdQcm9wcyB9IGZyb20gJ2ppbXUtZm9yLWJ1aWxkZXInO1xyXG4vLyBpbXBvcnQgeyBCdXR0b24sIElucHV0LCBMYWJlbCB9IGZyb20gJ2ppbXUtdWknO1xyXG4vLyBpbXBvcnQgeyBDbG9zZU91dGxpbmVkIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xyXG4vLyBpbXBvcnQge1xyXG4vLyAgIFNldHRpbmdTZWN0aW9uLFxyXG4vLyAgIFNldHRpbmdSb3dcclxuLy8gfSBmcm9tICdqaW11LXVpL2FkdmFuY2VkL3NldHRpbmctY29tcG9uZW50cyc7XHJcblxyXG4vLyBjb25zdCBTZXR0aW5nID0gKHByb3BzOiBBbGxXaWRnZXRTZXR0aW5nUHJvcHM8YW55PikgPT4ge1xyXG4vLyAgIC8vIGNvbnN0IFt1cmxsc3QsIHNldFVybGxzdF0gPSB1c2VTdGF0ZShbXSk7XHJcbi8vICAgLy8gY29uc3QgW3VybElucHV0LCBzZXRVcmxJbnB1dF0gPSB1c2VTdGF0ZSgnJyk7XHJcbi8vICAgLy8gY29uc3QgW2xhYmVsSW5wdXQsIHNldExhYmVsSW5wdXRdID0gdXNlU3RhdGUoJycpO1xyXG4vLyAgIC8vIGNvbnN0IFt5bmdhZ2UsIHNldHluZ2FnZV0gPSB1c2VTdGF0ZSgnJyk7XHJcbi8vICAgLy8gY29uc3QgW29sZGFnZSwgc2V0b2xkYWdlXSA9IHVzZVN0YXRlKCcnKTtcclxuXHJcbi8vICAgLy8gdXNlRWZmZWN0KCgpID0+IHtcclxuLy8gICAvLyAgIC8vIEZldGNoIHRoZSBpbml0aWFsIGRhdGEgZnJvbSB0aGUgc2VydmVyXHJcbi8vICAgLy8gICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDAwL2RhdGEnKVxyXG4vLyAgIC8vICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbi8vICAgLy8gICAgIC50aGVuKGRhdGEgPT4gc2V0VXJsbHN0KGRhdGFbXCJ1cmxcIl0pKVxyXG4vLyAgIC8vICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgZGF0YTonLCBlcnJvcikpO1xyXG4vLyAgIC8vIH0sIFtdKTtcclxuLy8gICBjb25zdCBbdXJsbHN0LCBzZXRVcmxsc3RdID0gdXNlU3RhdGUoW10pO1xyXG4vLyAgIGNvbnN0IFt1cmxJbnB1dCwgc2V0VXJsSW5wdXRdID0gdXNlU3RhdGUoJycpO1xyXG4vLyAgIGNvbnN0IFtsYWJlbElucHV0LCBzZXRMYWJlbElucHV0XSA9IHVzZVN0YXRlKCcnKTtcclxuLy8gICBjb25zdCBbeW5nYWdlLCBzZXR5bmdhZ2VdID0gdXNlU3RhdGUoJycpO1xyXG4vLyAgIGNvbnN0IFtvbGRhZ2UsIHNldG9sZGFnZV0gPSB1c2VTdGF0ZSgnJyk7XHJcbi8vICAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuLy8gICBjb25zdCBbZmV0Y2hFcnJvciwgc2V0RmV0Y2hFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcclxuXHJcbi8vICAgdXNlRWZmZWN0KCgpID0+IHtcclxuLy8gICAgIHNldElzTG9hZGluZyh0cnVlKTsgwqAgXHJcblxyXG4vLyAgICAgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9kYXRhJylcclxuLy8gICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4vLyAgICAgICAudGhlbihkYXRhID0+e1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbi8vICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VybGxpc3QnLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbi8vICAgICAgICAgc2V0VXJsbHN0KGRhdGEpXHJcbi8vICAgICAgIH0gKSAvLyBBc3N1bWluZyB0aGUgJ3VybCcgcHJvcGVydHkgaW4gdGhlIHJlc3BvbnNlXHJcbi8vICAgICAgIC5jYXRjaChlcnJvciA9PiB7XHJcbi8vICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgZGF0YTonLCBlcnJvcik7XHJcbi8vICAgICAgICAgc2V0RmV0Y2hFcnJvcihlcnJvcik7XHJcbi8vICAgICAgIH0pXHJcbi8vICAgICAgIC5maW5hbGx5KCgpID0+IHNldElzTG9hZGluZyhmYWxzZSkpO1xyXG4vLyAgIH0sIFtdKTtcclxuXHJcbi8vICAgY29uc3QgaGFuZGxlVXJsQ2hhbmdlID0gKGV2ZW50OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4vLyAgICAgc2V0VXJsSW5wdXQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuLy8gICB9O1xyXG5cclxuLy8gICBjb25zdCBoYW5kbGVMYWJlbENoYW5nZSA9IChldmVudDogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcclxuLy8gICAgIHNldExhYmVsSW5wdXQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuLy8gICB9O1xyXG4vLyAgIGNvbnN0IGhhbmRsZXluZ0NoYW5nZSA9IChldmVudDogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcclxuLy8gICAgIHNldHluZ2FnZShldmVudC50YXJnZXQudmFsdWUpO1xyXG4vLyAgIH07XHJcbi8vICAgY29uc3QgaGFuZGxlb2xkQ2hhbmdlID0gKGV2ZW50OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4vLyAgICAgc2V0b2xkYWdlKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbi8vICAgfTtcclxuXHJcbi8vICAgY29uc3QgaGFuZGxlQWRkVXJsID0gKCkgPT4ge1xyXG4vLyAgICAgaWYgKHVybElucHV0ICYmIGxhYmVsSW5wdXQpIHtcclxuLy8gICAgICAgY29uc3QgbmV3VXJscyA9IFsuLi51cmxsc3QsIHsgbGFiZWw6IGxhYmVsSW5wdXQsIHVybDogdXJsSW5wdXQgLCAgWW91bmdfYWdlX2ZpZWxkOnluZ2FnZSxcclxuLy8gICAgICAgICBvbGRfYWdlX2ZpZWxkOm9sZGFnZX1dO1xyXG4vLyAgICAgICBzZXRVcmxsc3QobmV3VXJscyk7XHJcbi8vICAgICAgIHNldFVybElucHV0KCcnKTtcclxuLy8gICAgICAgc2V0TGFiZWxJbnB1dCgnJyk7XHJcblxyXG4vLyAgICAgICAvLyBTYXZlIHRvIGxvY2FsU3RvcmFnZSBhbmQgc2VuZCB0byBzZXJ2ZXJcclxuLy8gICAgICAgLy8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1cmxsc3RcIiwgSlNPTi5zdHJpbmdpZnkobmV3VXJscykpO1xyXG4vLyAgICAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDAwL3dyaXRlJywge1xyXG4vLyAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdVcmxzKSxcclxuLy8gICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3IgcG9zdGluZyBkYXRhOicsIGVycm9yKSk7XHJcbi8vICAgICB9XHJcbi8vICAgfTtcclxuXHJcbi8vICAgY29uc3QgaGFuZGxlUmVtb3ZlID0gKHVybFRvUmVtb3ZlOiBzdHJpbmcpID0+IHtcclxuLy8gICAgIGNvbnN0IHVwZGF0ZWRVcmxzID0gdXJsbHN0LmZpbHRlcih1cmwgPT4gdXJsLnVybCAhPT0gdXJsVG9SZW1vdmUpO1xyXG4vLyAgICAgc2V0VXJsbHN0KHVwZGF0ZWRVcmxzKTtcclxuLy8gICAgIC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXJsbHN0XCIsIEpTT04uc3RyaW5naWZ5KHVwZGF0ZWRVcmxzKSk7XHJcblxyXG4vLyAgICAgLy8gLy8gT3B0aW9uYWxseSwgeW91IGNvdWxkIGFsc28gcG9zdCB0aGUgdXBkYXRlZCBsaXN0IHRvIHRoZSBzZXJ2ZXJcclxuLy8gICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjgwMDAvd3JpdGUnLCB7XHJcbi8vICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4vLyAgICAgICBoZWFkZXJzOiB7XHJcbi8vICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuLy8gICAgICAgfSxcclxuLy8gICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXBkYXRlZFVybHMpLFxyXG4vLyAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3IgcG9zdGluZyBkYXRhOicsIGVycm9yKSk7XHJcbi8vICAgfTtcclxuXHJcbi8vICAgcmV0dXJuIChcclxuLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXNldHRpbmctZGVtb1wiPlxyXG4vLyAgICAgICA8U2V0dGluZ1NlY3Rpb25cclxuLy8gICAgICAgICBjbGFzc05hbWU9XCJ1cmwtbGlzdC1zZWN0aW9uXCJcclxuLy8gICAgICAgICB0aXRsZT1cIk1hbmFnZSBVUkxzXCJcclxuLy8gICAgICAgPlxyXG4vLyAgICAgICAgIDxTZXR0aW5nUm93PlxyXG4vLyAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1cmwtaW5wdXRzXCI+XHJcbi8vICAgICAgICAgICAgIDxMYWJlbD5VUkw6PC9MYWJlbD5cclxuLy8gICAgICAgICAgICAgPElucHV0XHJcbi8vICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBVUkxcIlxyXG4vLyAgICAgICAgICAgICAgIHZhbHVlPXt1cmxJbnB1dH1cclxuLy8gICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlVXJsQ2hhbmdlfVxyXG4vLyAgICAgICAgICAgICAgIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnIH19XHJcbi8vICAgICAgICAgICAgIC8+XHJcbi8vICAgICAgICAgICAgIDxMYWJlbD5MYWJlbDo8L0xhYmVsPlxyXG4vLyAgICAgICAgICAgICA8SW5wdXRcclxuLy8gICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIGxhYmVsXCJcclxuLy8gICAgICAgICAgICAgICB2YWx1ZT17bGFiZWxJbnB1dH1cclxuLy8gICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlTGFiZWxDaGFuZ2V9XHJcbi8vICAgICAgICAgICAgICAgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMTBweCcgfX1cclxuLy8gICAgICAgICAgICAgLz5cclxuLy8gICAgICAgICAgICAgPExhYmVsPnlvdW5nIGFnZSBmaWVsZDo8L0xhYmVsPlxyXG4vLyAgICAgICAgICAgICA8SW5wdXRcclxuLy8gICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cInlvdW5nIGFnZSBmaWVsZFwiXHJcbi8vICAgICAgICAgICAgICAgdmFsdWU9e3luZ2FnZX1cclxuLy8gICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxleW5nQ2hhbmdlfVxyXG4vLyAgICAgICAgICAgICAgIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnIH19XHJcbi8vICAgICAgICAgICAgIC8+XHJcbi8vICAgICAgICAgICAgIDxMYWJlbD5vbGQgYWdlIGZpZWxkOjwvTGFiZWw+XHJcbi8vICAgICAgICAgICAgIDxJbnB1dFxyXG4vLyAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwib2xkIGFnZSBmaWVsZFwiXHJcbi8vICAgICAgICAgICAgICAgdmFsdWU9e29sZGFnZX1cclxuLy8gICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlb2xkQ2hhbmdlfVxyXG4vLyAgICAgICAgICAgICAgIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnIH19XHJcbi8vICAgICAgICAgICAgIC8+XHJcbi8vICAgICAgICAgICAgIDxCdXR0b25cclxuLy8gICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXHJcbi8vICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQWRkVXJsfVxyXG4vLyAgICAgICAgICAgICAgIGRpc2FibGVkPXshdXJsSW5wdXQgfHwgIWxhYmVsSW5wdXR9XHJcbi8vICAgICAgICAgICAgID5cclxuLy8gICAgICAgICAgICAgICBBZGQgVVJMXHJcbi8vICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4vLyAgICAgICAgICAgPC9kaXY+XHJcbi8vICAgICAgICAgPC9TZXR0aW5nUm93PlxyXG5cclxuLy8gICAgICAgICA8U2V0dGluZ1Jvdz5cclxuLy8gICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXJsLWJ1dHRvbnNcIj5cclxuLy8gICAgICAgICAgICAge3VybGxzdC5tYXAoKHVybEVudHJ5KSA9PiAoXHJcbi8vICAgICAgICAgICAgICAgPGRpdiBrZXk9e3VybEVudHJ5LnVybH0gc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMTBweCcsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XHJcbi8vICAgICAgICAgICAgICAgICA8QnV0dG9uXHJcbi8vICAgICAgICAgICAgICAgICAgIHR5cGU9XCJkZWZhdWx0XCJcclxuLy8gICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbWFyZ2luUmlnaHQ6ICcxMHB4JyB9fVxyXG4vLyAgICAgICAgICAgICAgICAgPlxyXG4vLyAgICAgICAgICAgICAgICAgICB7dXJsRW50cnkubGFiZWwgfHwgJ05vIExhYmVsJ31cclxuLy8gICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4vLyAgICAgICAgICAgICAgICAgPEJ1dHRvblxyXG4vLyAgICAgICAgICAgICAgICAgICB0eXBlPVwidGVydGlhcnlcIlxyXG4vLyAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVSZW1vdmUodXJsRW50cnkudXJsKX1cclxuLy8gICAgICAgICAgICAgICAgID5cclxuLy8gICAgICAgICAgICAgICAgICAgPENsb3NlT3V0bGluZWQgLz5cclxuLy8gICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4vLyAgICAgICAgICAgICAgIDwvZGl2PlxyXG4vLyAgICAgICAgICAgICApKX1cclxuLy8gICAgICAgICAgIDwvZGl2PlxyXG4vLyAgICAgICAgIDwvU2V0dGluZ1Jvdz5cclxuLy8gICAgICAgPC9TZXR0aW5nU2VjdGlvbj5cclxuLy8gICAgIDwvZGl2PlxyXG4vLyAgICk7XHJcbi8vIH07XHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCBTZXR0aW5nO1xyXG5cclxuXHJcbi8vIGltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG4vLyBpbXBvcnQgeyBBbGxXaWRnZXRTZXR0aW5nUHJvcHMgfSBmcm9tICdqaW11LWZvci1idWlsZGVyJztcclxuLy8gaW1wb3J0IHsgQnV0dG9uLCBJbnB1dCwgTGFiZWwgfSBmcm9tICdqaW11LXVpJztcclxuLy8gaW1wb3J0IHsgQ2xvc2VPdXRsaW5lZCB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcclxuLy8gaW1wb3J0IHsgU2V0dGluZ1NlY3Rpb24sIFNldHRpbmdSb3cgfSBmcm9tICdqaW11LXVpL2FkdmFuY2VkL3NldHRpbmctY29tcG9uZW50cyc7XHJcblxyXG4vLyBjb25zdCBTZXR0aW5nID0gKHByb3BzOiBBbGxXaWRnZXRTZXR0aW5nUHJvcHM8YW55PikgPT4ge1xyXG4vLyAgIGNvbnN0IFt1cmxsc3QsIHNldFVybGxzdF0gPSB1c2VTdGF0ZShbXSk7XHJcbi8vICAgY29uc3QgW3VybElucHV0LCBzZXRVcmxJbnB1dF0gPSB1c2VTdGF0ZSgnJyk7XHJcbi8vICAgY29uc3QgW2xhYmVsSW5wdXQsIHNldExhYmVsSW5wdXRdID0gdXNlU3RhdGUoJycpO1xyXG4vLyAgIGNvbnN0IFt5bmdhZ2UsIHNldHluZ2FnZV0gPSB1c2VTdGF0ZSgnJyk7XHJcbi8vICAgY29uc3QgW29sZGFnZSwgc2V0b2xkYWdlXSA9IHVzZVN0YXRlKCcnKTtcclxuLy8gICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4vLyAgIGNvbnN0IFtmZXRjaEVycm9yLCBzZXRGZXRjaEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4vLyAgIGNvbnN0IFtzZWxlY3RlZFZhbHVlLCBzZXRTZWxlY3RlZFZhbHVlXSA9IHVzZVN0YXRlKCcnKTtcclxuLy8gICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZShbXSk7XHJcbi8vICAgdXNlRWZmZWN0KCgpID0+IHtcclxuLy8gICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuLy8gICAgIGNvbnN0IHN0b3JlZE9wdGlvbnMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1cmxsc3QnKSkgfHwgW107XHJcbi8vICAgICBjb25zb2xlLmxvZyhzdG9yZWRPcHRpb25zKTtcclxuLy8gICAgIHNldE9wdGlvbnMoc3RvcmVkT3B0aW9ucyk7XHJcbi8vICAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDAwL2RhdGEnKVxyXG4vLyAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbi8vICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4vLyAgICAgICAgIHNldFVybGxzdChkYXRhKTtcclxuLy8gICAgICAgICBwcm9wcy5vblNldHRpbmdDaGFuZ2Uoe1xyXG4vLyAgICAgICAgICAgaWQ6IHByb3BzLmlkLFxyXG4vLyAgICAgICAgICAgY29uZmlnOiBwcm9wcy5jb25maWcuc2V0KCd1cmxsc3QnLCBkYXRhKVxyXG4vLyAgICAgICAgIH0pO1xyXG4vLyAgICAgICB9KVxyXG4vLyAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4vLyAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGRhdGE6JywgZXJyb3IpO1xyXG4vLyAgICAgICAgIHNldEZldGNoRXJyb3IoZXJyb3IpO1xyXG4vLyAgICAgICB9KVxyXG4vLyAgICAgICAuZmluYWxseSgoKSA9PiBzZXRJc0xvYWRpbmcoZmFsc2UpKTtcclxuLy8gICB9LCBbXSk7XHJcbi8vICAgY29uc3QgaGFuZGxlRHJvcGRvd25DaGFuZ2UgPSAoZXZlbnQpID0+IHtcclxuLy8gICAgIHNldFNlbGVjdGVkVmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuLy8gICB9O1xyXG5cclxuLy8gICBjb25zdCBoYW5kbGVVcmxDaGFuZ2UgPSAoZXZlbnQ6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XHJcbi8vICAgICBzZXRVcmxJbnB1dChldmVudC50YXJnZXQudmFsdWUpO1xyXG4vLyAgIH07XHJcblxyXG4vLyAgIGNvbnN0IGhhbmRsZUxhYmVsQ2hhbmdlID0gKGV2ZW50OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4vLyAgICAgc2V0TGFiZWxJbnB1dChldmVudC50YXJnZXQudmFsdWUpO1xyXG4vLyAgIH07XHJcblxyXG4vLyAgIGNvbnN0IGhhbmRsZXluZ0NoYW5nZSA9IChldmVudDogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcclxuLy8gICAgIHNldHluZ2FnZShldmVudC50YXJnZXQudmFsdWUpO1xyXG4vLyAgIH07XHJcblxyXG4vLyAgIGNvbnN0IGhhbmRsZW9sZENoYW5nZSA9IChldmVudDogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcclxuLy8gICAgIHNldG9sZGFnZShldmVudC50YXJnZXQudmFsdWUpO1xyXG4vLyAgIH07XHJcblxyXG4vLyAgIGNvbnN0IGhhbmRsZUFkZFVybCA9ICgpID0+IHtcclxuLy8gICAgIGlmICh1cmxJbnB1dCAmJiBsYWJlbElucHV0KSB7XHJcbi8vICAgICAgIGNvbnN0IG5ld1VybHMgPSBbLi4udXJsbHN0LCB7IGxhYmVsOiBsYWJlbElucHV0LCB1cmw6IHVybElucHV0LCBZb3VuZ19hZ2VfZmllbGQ6IHluZ2FnZSwgb2xkX2FnZV9maWVsZDogb2xkYWdlIH1dO1xyXG4vLyAgICAgICBzZXRVcmxsc3QobmV3VXJscyk7XHJcbi8vICAgICAgIHNldFVybElucHV0KCcnKTtcclxuLy8gICAgICAgc2V0TGFiZWxJbnB1dCgnJyk7XHJcblxyXG4vLyAgICAgICBwcm9wcy5vblNldHRpbmdDaGFuZ2Uoe1xyXG4vLyAgICAgICAgIGlkOiBwcm9wcy5pZCxcclxuLy8gICAgICAgICBjb25maWc6IHByb3BzLmNvbmZpZy5zZXQoJ3VybGxzdCcsIG5ld1VybHMpXHJcbi8vICAgICAgIH0pO1xyXG4vLyAgICAgICBjb25zb2xlLmxvZyhuZXdVcmxzKVxyXG4vLyAgICAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDAwL3dyaXRlJywge1xyXG4vLyAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdVcmxzKSxcclxuLy8gICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3IgcG9zdGluZyBkYXRhOicsIGVycm9yKSk7XHJcbi8vICAgICB9XHJcbi8vICAgfTtcclxuXHJcbi8vICAgY29uc3QgaGFuZGxlUmVtb3ZlID0gKHVybFRvUmVtb3ZlOiBzdHJpbmcpID0+IHtcclxuLy8gICAgIGNvbnN0IHVwZGF0ZWRVcmxzID0gdXJsbHN0LmZpbHRlcih1cmwgPT4gdXJsLnVybCAhPT0gdXJsVG9SZW1vdmUpO1xyXG4vLyAgICAgc2V0VXJsbHN0KHVwZGF0ZWRVcmxzKTtcclxuXHJcbi8vICAgICBwcm9wcy5vblNldHRpbmdDaGFuZ2Uoe1xyXG4vLyAgICAgICBpZDogcHJvcHMuaWQsXHJcbi8vICAgICAgIGNvbmZpZzogcHJvcHMuY29uZmlnLnNldCgndXJsbHN0JywgdXBkYXRlZFVybHMpXHJcbi8vICAgICB9KTtcclxuXHJcbi8vICAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDAwL3dyaXRlJywge1xyXG4vLyAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuLy8gICAgICAgaGVhZGVyczoge1xyXG4vLyAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbi8vICAgICAgIH0sXHJcbi8vICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVwZGF0ZWRVcmxzKSxcclxuLy8gICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHBvc3RpbmcgZGF0YTonLCBlcnJvcikpO1xyXG4vLyAgIH07XHJcblxyXG4vLyAgIHJldHVybiAoXHJcbi8vICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1zZXR0aW5nLWRlbW9cIj5cclxuLy8gICAgICAgPFNldHRpbmdTZWN0aW9uIGNsYXNzTmFtZT1cInVybC1saXN0LXNlY3Rpb25cIiB0aXRsZT1cIk1hbmFnZSBVUkxzXCI+XHJcbi8vICAgICAgICAgPFNldHRpbmdSb3c+XHJcbi8vICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVybC1pbnB1dHNcIj5cclxuLy8gICAgICAgICAgICAgPExhYmVsPlVSTDo8L0xhYmVsPlxyXG4vLyAgICAgICAgICAgICA8SW5wdXRcclxuLy8gICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIFVSTFwiXHJcbi8vICAgICAgICAgICAgICAgdmFsdWU9e3VybElucHV0fVxyXG4vLyAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVVcmxDaGFuZ2V9XHJcbi8vICAgICAgICAgICAgICAgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMTBweCcgfX1cclxuLy8gICAgICAgICAgICAgLz5cclxuLy8gICAgICAgICAgICAgPExhYmVsPkxhYmVsOjwvTGFiZWw+XHJcbi8vICAgICAgICAgICAgIDxJbnB1dFxyXG4vLyAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgbGFiZWxcIlxyXG4vLyAgICAgICAgICAgICAgIHZhbHVlPXtsYWJlbElucHV0fVxyXG4vLyAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVMYWJlbENoYW5nZX1cclxuLy8gICAgICAgICAgICAgICBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fVxyXG4vLyAgICAgICAgICAgICAvPlxyXG4vLyAgICAgICAgICAgICA8TGFiZWw+eW91bmcgYWdlIGZpZWxkOjwvTGFiZWw+XHJcbi8vICAgICAgICAgICAgIDxJbnB1dFxyXG4vLyAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwieW91bmcgYWdlIGZpZWxkXCJcclxuLy8gICAgICAgICAgICAgICB2YWx1ZT17eW5nYWdlfVxyXG4vLyAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGV5bmdDaGFuZ2V9XHJcbi8vICAgICAgICAgICAgICAgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMTBweCcgfX1cclxuLy8gICAgICAgICAgICAgLz5cclxuLy8gICAgICAgICAgICAgPExhYmVsPm9sZCBhZ2UgZmllbGQ6PC9MYWJlbD5cclxuLy8gICAgICAgICAgICAgPElucHV0XHJcbi8vICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJvbGQgYWdlIGZpZWxkXCJcclxuLy8gICAgICAgICAgICAgICB2YWx1ZT17b2xkYWdlfVxyXG4vLyAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVvbGRDaGFuZ2V9XHJcbi8vICAgICAgICAgICAgICAgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMTBweCcgfX1cclxuLy8gICAgICAgICAgICAgLz5cclxuLy8gICAgICAgICAgICAgPEJ1dHRvblxyXG4vLyAgICAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcclxuLy8gICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVBZGRVcmx9XHJcbi8vICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyF1cmxJbnB1dCB8fCAhbGFiZWxJbnB1dH1cclxuLy8gICAgICAgICAgICAgPlxyXG4vLyAgICAgICAgICAgICAgIEFkZCBVUkxcclxuLy8gICAgICAgICAgICAgPC9CdXR0b24+XHJcbi8vICAgICAgICAgICA8L2Rpdj5cclxuLy8gICAgICAgICA8L1NldHRpbmdSb3c+XHJcblxyXG4vLyAgICAgICAgIDxTZXR0aW5nUm93PlxyXG4vLyAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1cmwtYnV0dG9uc1wiPlxyXG4vLyAgICAgICAgICAgICB7dXJsbHN0Lm1hcCgodXJsRW50cnkpID0+IChcclxuLy8gICAgICAgICAgICAgICA8ZGl2IGtleT17dXJsRW50cnkudXJsfSBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fT5cclxuLy8gICAgICAgICAgICAgICAgIDxCdXR0b24gdHlwZT1cImRlZmF1bHRcIiBzdHlsZT17eyBtYXJnaW5SaWdodDogJzEwcHgnIH19PlxyXG4vLyAgICAgICAgICAgICAgICAgICB7dXJsRW50cnkubGFiZWwgfHwgJ05vIExhYmVsJ31cclxuLy8gICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4vLyAgICAgICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwidGVydGlhcnlcIiBvbkNsaWNrPXsoKSA9PiBoYW5kbGVSZW1vdmUodXJsRW50cnkudXJsKX0+XHJcbi8vICAgICAgICAgICAgICAgICAgIDxDbG9zZU91dGxpbmVkIC8+XHJcbi8vICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cclxuLy8gICAgICAgICAgICAgICA8L2Rpdj5cclxuLy8gICAgICAgICAgICAgKSl9XHJcbi8vICAgICAgICAgICA8L2Rpdj5cclxuLy8gICAgICAgICA8L1NldHRpbmdSb3c+XHJcbi8vICAgICAgIDwvU2V0dGluZ1NlY3Rpb24+XHJcbi8vICAgICA8L2Rpdj5cclxuLy8gICApO1xyXG4vLyB9O1xyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgU2V0dGluZztcclxuXHJcblxyXG4vLyBpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuLy8gaW1wb3J0IHsgQWxsV2lkZ2V0U2V0dGluZ1Byb3BzIH0gZnJvbSAnamltdS1mb3ItYnVpbGRlcic7XHJcbi8vIGltcG9ydCB7IEJ1dHRvbiwgSW5wdXQsIExhYmVsLCBTZWxlY3QsIE9wdGlvbiB9IGZyb20gJ2ppbXUtdWknO1xyXG4vLyBpbXBvcnQgeyBDbG9zZU91dGxpbmVkIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xyXG4vLyBpbXBvcnQgeyBTZXR0aW5nU2VjdGlvbiwgU2V0dGluZ1JvdyB9IGZyb20gJ2ppbXUtdWkvYWR2YW5jZWQvc2V0dGluZy1jb21wb25lbnRzJztcclxuXHJcbi8vIGNvbnN0IFNldHRpbmcgPSAocHJvcHM6IEFsbFdpZGdldFNldHRpbmdQcm9wczxhbnk+KSA9PiB7XHJcbi8vICAgY29uc3QgW3VybGxzdCwgc2V0VXJsbHN0XSA9IHVzZVN0YXRlKFtdKTtcclxuLy8gICBjb25zdCBbdXJsSW5wdXQsIHNldFVybElucHV0XSA9IHVzZVN0YXRlKCcnKTtcclxuLy8gICBjb25zdCBbbGFiZWxJbnB1dCwgc2V0TGFiZWxJbnB1dF0gPSB1c2VTdGF0ZSgnJyk7XHJcbi8vICAgY29uc3QgW3luZ2FnZSwgc2V0eW5nYWdlXSA9IHVzZVN0YXRlKCcnKTtcclxuLy8gICBjb25zdCBbb2xkYWdlLCBzZXRvbGRhZ2VdID0gdXNlU3RhdGUoJycpO1xyXG4vLyAgIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbi8vICAgY29uc3QgW2ZldGNoRXJyb3IsIHNldEZldGNoRXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XHJcbi8vICAgY29uc3QgW3NlbGVjdGVkVmFsdWUsIHNldFNlbGVjdGVkVmFsdWVdID0gdXNlU3RhdGUoJycpO1xyXG4vLyAgIGNvbnN0IFtvcHRpb25zLCBzZXRPcHRpb25zXSA9IHVzZVN0YXRlKFtdKTtcclxuXHJcbi8vICAgdXNlRWZmZWN0KCgpID0+IHtcclxuLy8gICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuLy8gICAgIGNvbnN0IHN0b3JlZE9wdGlvbnMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1cmxsc3QnKSkgfHwgW107XHJcbi8vICAgICBjb25zb2xlLmxvZyhzdG9yZWRPcHRpb25zKTtcclxuLy8gICAgIHNldE9wdGlvbnMoc3RvcmVkT3B0aW9ucyk7XHJcbi8vICAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDAwL2RhdGEnKVxyXG4vLyAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbi8vICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4vLyAgICAgICAgIHNldFVybGxzdChkYXRhKTtcclxuLy8gICAgICAgICBwcm9wcy5vblNldHRpbmdDaGFuZ2Uoe1xyXG4vLyAgICAgICAgICAgaWQ6IHByb3BzLmlkLFxyXG4vLyAgICAgICAgICAgY29uZmlnOiBwcm9wcy5jb25maWcuc2V0KCd1cmxsc3QnLCBkYXRhKVxyXG4vLyAgICAgICAgIH0pO1xyXG4vLyAgICAgICB9KVxyXG4vLyAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4vLyAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGRhdGE6JywgZXJyb3IpO1xyXG4vLyAgICAgICAgIHNldEZldGNoRXJyb3IoZXJyb3IpO1xyXG4vLyAgICAgICB9KVxyXG4vLyAgICAgICAuZmluYWxseSgoKSA9PiBzZXRJc0xvYWRpbmcoZmFsc2UpKTtcclxuLy8gICB9LCBbXSk7XHJcblxyXG4vLyAgIGNvbnN0IGhhbmRsZURyb3Bkb3duQ2hhbmdlID0gKGV2ZW50KSA9PiB7XHJcbi8vICAgICBzZXRTZWxlY3RlZFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbi8vICAgICBzZXRVcmxJbnB1dChldmVudC50YXJnZXQudmFsdWUpO1xyXG4vLyAgIH07XHJcblxyXG4vLyAgIGNvbnN0IGhhbmRsZUxhYmVsQ2hhbmdlID0gKGV2ZW50OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4vLyAgICAgc2V0TGFiZWxJbnB1dChldmVudC50YXJnZXQudmFsdWUpO1xyXG4vLyAgIH07XHJcblxyXG4vLyAgIGNvbnN0IGhhbmRsZXluZ0NoYW5nZSA9IChldmVudDogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcclxuLy8gICAgIHNldHluZ2FnZShldmVudC50YXJnZXQudmFsdWUpO1xyXG4vLyAgIH07XHJcblxyXG4vLyAgIGNvbnN0IGhhbmRsZW9sZENoYW5nZSA9IChldmVudDogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcclxuLy8gICAgIHNldG9sZGFnZShldmVudC50YXJnZXQudmFsdWUpO1xyXG4vLyAgIH07XHJcblxyXG4vLyAgIGNvbnN0IGhhbmRsZUFkZFVybCA9ICgpID0+IHtcclxuLy8gICAgIGlmICh1cmxJbnB1dCAmJiBsYWJlbElucHV0KSB7XHJcbi8vICAgICAgIGNvbnN0IG5ld1VybHMgPSBbLi4udXJsbHN0LCB7IGxhYmVsOiBsYWJlbElucHV0LCB1cmw6IHVybElucHV0LCBZb3VuZ19hZ2VfZmllbGQ6IHluZ2FnZSwgb2xkX2FnZV9maWVsZDogb2xkYWdlIH1dO1xyXG4vLyAgICAgICBzZXRVcmxsc3QobmV3VXJscyk7XHJcbi8vICAgICAgIHNldFVybElucHV0KCcnKTtcclxuLy8gICAgICAgc2V0TGFiZWxJbnB1dCgnJyk7XHJcblxyXG4vLyAgICAgICBwcm9wcy5vblNldHRpbmdDaGFuZ2Uoe1xyXG4vLyAgICAgICAgIGlkOiBwcm9wcy5pZCxcclxuLy8gICAgICAgICBjb25maWc6IHByb3BzLmNvbmZpZy5zZXQoJ3VybGxzdCcsIG5ld1VybHMpXHJcbi8vICAgICAgIH0pO1xyXG4vLyAgICAgICBjb25zb2xlLmxvZyhuZXdVcmxzKVxyXG4vLyAgICAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDAwL3dyaXRlJywge1xyXG4vLyAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4vLyAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdVcmxzKSxcclxuLy8gICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3IgcG9zdGluZyBkYXRhOicsIGVycm9yKSk7XHJcbi8vICAgICB9XHJcbi8vICAgfTtcclxuXHJcbi8vICAgY29uc3QgaGFuZGxlUmVtb3ZlID0gKHVybFRvUmVtb3ZlOiBzdHJpbmcpID0+IHtcclxuLy8gICAgIGNvbnN0IHVwZGF0ZWRVcmxzID0gdXJsbHN0LmZpbHRlcih1cmwgPT4gdXJsLnVybCAhPT0gdXJsVG9SZW1vdmUpO1xyXG4vLyAgICAgc2V0VXJsbHN0KHVwZGF0ZWRVcmxzKTtcclxuXHJcbi8vICAgICBwcm9wcy5vblNldHRpbmdDaGFuZ2Uoe1xyXG4vLyAgICAgICBpZDogcHJvcHMuaWQsXHJcbi8vICAgICAgIGNvbmZpZzogcHJvcHMuY29uZmlnLnNldCgndXJsbHN0JywgdXBkYXRlZFVybHMpXHJcbi8vICAgICB9KTtcclxuXHJcbi8vICAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDAwL3dyaXRlJywge1xyXG4vLyAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuLy8gICAgICAgaGVhZGVyczoge1xyXG4vLyAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbi8vICAgICAgIH0sXHJcbi8vICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVwZGF0ZWRVcmxzKSxcclxuLy8gICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHBvc3RpbmcgZGF0YTonLCBlcnJvcikpO1xyXG4vLyAgIH07XHJcblxyXG4vLyAgIHJldHVybiAoXHJcbi8vICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1zZXR0aW5nLWRlbW9cIj5cclxuLy8gICAgICAgPFNldHRpbmdTZWN0aW9uIGNsYXNzTmFtZT1cInVybC1saXN0LXNlY3Rpb25cIiB0aXRsZT1cIk1hbmFnZSBVUkxzXCI+XHJcbi8vICAgICAgICAgPFNldHRpbmdSb3c+XHJcbi8vICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVybC1pbnB1dHNcIj5cclxuLy8gICAgICAgICAgICAgPExhYmVsPlVSTDo8L0xhYmVsPlxyXG4vLyAgICAgICAgICAgICA8U2VsZWN0XHJcbi8vICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgVVJMXCJcclxuLy8gICAgICAgICAgICAgICB2YWx1ZT17dXJsSW5wdXR9XHJcbi8vICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZURyb3Bkb3duQ2hhbmdlfVxyXG4vLyAgICAgICAgICAgICAgIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnIH19XHJcbi8vICAgICAgICAgICAgID5cclxuLy8gICAgICAgICAgICAgICB7b3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IChcclxuLy8gICAgICAgICAgICAgICAgIDxPcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e29wdGlvbi51cmx9PlxyXG4vLyAgICAgICAgICAgICAgICAgICB7b3B0aW9uLmxhYmVsfVxyXG4vLyAgICAgICAgICAgICAgICAgPC9PcHRpb24+XHJcbi8vICAgICAgICAgICAgICAgKSl9XHJcbi8vICAgICAgICAgICAgIDwvU2VsZWN0PlxyXG4vLyAgICAgICAgICAgICA8TGFiZWw+TGFiZWw6PC9MYWJlbD5cclxuLy8gICAgICAgICAgICAgPElucHV0XHJcbi8vICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBsYWJlbFwiXHJcbi8vICAgICAgICAgICAgICAgdmFsdWU9e2xhYmVsSW5wdXR9XHJcbi8vICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUxhYmVsQ2hhbmdlfVxyXG4vLyAgICAgICAgICAgICAgIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnIH19XHJcbi8vICAgICAgICAgICAgIC8+XHJcbi8vICAgICAgICAgICAgIDxMYWJlbD55b3VuZyBhZ2UgZmllbGQ6PC9MYWJlbD5cclxuLy8gICAgICAgICAgICAgPElucHV0XHJcbi8vICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJ5b3VuZyBhZ2UgZmllbGRcIlxyXG4vLyAgICAgICAgICAgICAgIHZhbHVlPXt5bmdhZ2V9XHJcbi8vICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZXluZ0NoYW5nZX1cclxuLy8gICAgICAgICAgICAgICBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fVxyXG4vLyAgICAgICAgICAgICAvPlxyXG4vLyAgICAgICAgICAgICA8TGFiZWw+b2xkIGFnZSBmaWVsZDo8L0xhYmVsPlxyXG4vLyAgICAgICAgICAgICA8SW5wdXRcclxuLy8gICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIm9sZCBhZ2UgZmllbGRcIlxyXG4vLyAgICAgICAgICAgICAgIHZhbHVlPXtvbGRhZ2V9XHJcbi8vICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZW9sZENoYW5nZX1cclxuLy8gICAgICAgICAgICAgICBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fVxyXG4vLyAgICAgICAgICAgICAvPlxyXG4vLyAgICAgICAgICAgICA8QnV0dG9uXHJcbi8vICAgICAgICAgICAgICAgdHlwZT1cInByaW1hcnlcIlxyXG4vLyAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUFkZFVybH1cclxuLy8gICAgICAgICAgICAgICBkaXNhYmxlZD17IXVybElucHV0IHx8ICFsYWJlbElucHV0fVxyXG4vLyAgICAgICAgICAgICA+XHJcbi8vICAgICAgICAgICAgICAgQWRkIFVSTFxyXG4vLyAgICAgICAgICAgICA8L0J1dHRvbj5cclxuLy8gICAgICAgICAgIDwvZGl2PlxyXG4vLyAgICAgICAgIDwvU2V0dGluZ1Jvdz5cclxuXHJcbi8vICAgICAgICAgPFNldHRpbmdSb3c+XHJcbi8vICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVybC1idXR0b25zXCI+XHJcbi8vICAgICAgICAgICAgIHt1cmxsc3QubWFwKCh1cmxFbnRyeSkgPT4gKFxyXG4vLyAgICAgICAgICAgICAgIDxkaXYga2V5PXt1cmxFbnRyeS51cmx9IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxyXG4vLyAgICAgICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwiZGVmYXVsdFwiIHN0eWxlPXt7IG1hcmdpblJpZ2h0OiAnMTBweCcgfX0+XHJcbi8vICAgICAgICAgICAgICAgICAgIHt1cmxFbnRyeS5sYWJlbCB8fCAnTm8gTGFiZWwnfVxyXG4vLyAgICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbi8vICAgICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJ0ZXJ0aWFyeVwiIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJlbW92ZSh1cmxFbnRyeS51cmwpfT5cclxuLy8gICAgICAgICAgICAgICAgICAgPENsb3NlT3V0bGluZWQgLz5cclxuLy8gICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4vLyAgICAgICAgICAgICAgIDwvZGl2PlxyXG4vLyAgICAgICAgICAgICApKX1cclxuLy8gICAgICAgICAgIDwvZGl2PlxyXG4vLyAgICAgICAgIDwvU2V0dGluZ1Jvdz5cclxuLy8gICAgICAgPC9TZXR0aW5nU2VjdGlvbj5cclxuLy8gICAgIDwvZGl2PlxyXG4vLyAgICk7XHJcbi8vIH07XHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCBTZXR0aW5nO1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEFsbFdpZGdldFNldHRpbmdQcm9wcyB9IGZyb20gJ2ppbXUtZm9yLWJ1aWxkZXInO1xyXG5pbXBvcnQgeyBCdXR0b24sIElucHV0LCBMYWJlbCwgU2VsZWN0LCBPcHRpb24gfSBmcm9tICdqaW11LXVpJztcclxuaW1wb3J0IHsgQ2xvc2VPdXRsaW5lZCB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcclxuaW1wb3J0IHsgU2V0dGluZ1NlY3Rpb24sIFNldHRpbmdSb3cgfSBmcm9tICdqaW11LXVpL2FkdmFuY2VkL3NldHRpbmctY29tcG9uZW50cyc7XHJcblxyXG5jb25zdCBTZXR0aW5nID0gKHByb3BzOiBBbGxXaWRnZXRTZXR0aW5nUHJvcHM8YW55PikgPT4ge1xyXG4gIGNvbnN0IFt1cmxsc3QsIHNldFVybGxzdF0gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW3VybElucHV0LCBzZXRVcmxJbnB1dF0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgY29uc3QgW2xhYmVsSW5wdXQsIHNldExhYmVsSW5wdXRdID0gdXNlU3RhdGUoJycpO1xyXG4gIGNvbnN0IFt5bmdhZ2UsIHNldHluZ2FnZV0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgY29uc3QgW29sZGFnZSwgc2V0b2xkYWdlXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtmZXRjaEVycm9yLCBzZXRGZXRjaEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZFZhbHVlLCBzZXRTZWxlY3RlZFZhbHVlXSA9IHVzZVN0YXRlKCcnKTtcclxuICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2ZpZWxkcywgc2V0RmllbGRzXSA9IHVzZVN0YXRlKFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuICAgIGNvbnN0IHN0b3JlZE9wdGlvbnMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1cmxsc3QnKSkgfHwgW107XHJcbiAgICBjb25zb2xlLmxvZyhzdG9yZWRPcHRpb25zKTtcclxuICAgIHNldE9wdGlvbnMoc3RvcmVkT3B0aW9ucyk7XHJcbiAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDAwL2RhdGEnKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIHNldFVybGxzdChkYXRhKTtcclxuICAgICAgICBwcm9wcy5vblNldHRpbmdDaGFuZ2Uoe1xyXG4gICAgICAgICAgaWQ6IHByb3BzLmlkLFxyXG4gICAgICAgICAgY29uZmlnOiBwcm9wcy5jb25maWcuc2V0KCd1cmxsc3QnLCBkYXRhKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGRhdGE6JywgZXJyb3IpO1xyXG4gICAgICAgIHNldEZldGNoRXJyb3IoZXJyb3IpO1xyXG4gICAgICB9KVxyXG4gICAgICAuZmluYWxseSgoKSA9PiBzZXRJc0xvYWRpbmcoZmFsc2UpKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURyb3Bkb3duQ2hhbmdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBzZWxlY3RlZFVybCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgIHNldFNlbGVjdGVkVmFsdWUoc2VsZWN0ZWRVcmwpO1xyXG4gICAgc2V0VXJsSW5wdXQoc2VsZWN0ZWRVcmwpO1xyXG5cclxuICAgIC8vIEZldGNoIGZpZWxkcyBmcm9tIHRoZSBzZWxlY3RlZCBVUkxcclxuICAgIGZldGNoKGAke3NlbGVjdGVkVXJsfT9mPWpzb25gKVxyXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhLmZpZWxkcykge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgLy8gc2V0RmllbGRzKGRhdGEuZmllbGRzKTtcclxuICAgICAgICAgIGNvbnN0IGRhdGVGaWVsZHMgPSBkYXRhLmZpZWxkcy5maWx0ZXIoZmllbGQgPT4gZmllbGQudHlwZSA9PT0gJ2VzcmlGaWVsZFR5cGVEb3VibGUnKTtcclxuICAgICAgICAgIHNldEZpZWxkcyhkYXRlRmllbGRzLmxlbmd0aCA+IDAgPyBkYXRlRmllbGRzIDogW10pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZXRGaWVsZHMoW10pO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZmllbGRzKVxyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignTm8gZmllbGRzIGZvdW5kIGluIHRoZSByZXNwb25zZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+ICB7c2V0RmllbGRzKFtdKSBcclxuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgZmllbGRzOicsIGVycm9yKX0pO1xyXG4gIH07XHJcblxyXG4gIC8vIGNvbnN0IGhhbmRsZUxhYmVsQ2hhbmdlID0gKGV2ZW50OiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4gIC8vICAgc2V0TGFiZWxJbnB1dChldmVudC50YXJnZXQudmFsdWUpO1xyXG4gIC8vIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZXluZ0NoYW5nZSA9IChldmVudCkgPT4ge1xyXG4gICAgc2V0eW5nYWdlKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlb2xkQ2hhbmdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICBzZXRvbGRhZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVBZGRVcmwgPSAoKSA9PiB7XHJcbiAgICBpZiAodXJsSW5wdXQpIHtcclxuICAgICAgY29uc3QgbmV3VXJscyA9IFsuLi51cmxsc3QsIHsgbGFiZWw6IGxhYmVsSW5wdXQsIHVybDogdXJsSW5wdXQsIFlvdW5nX2FnZV9maWVsZDogeW5nYWdlLCBvbGRfYWdlX2ZpZWxkOiBvbGRhZ2UgfV07XHJcbiAgICAgIHNldFVybGxzdChuZXdVcmxzKTtcclxuICAgICAgc2V0VXJsSW5wdXQoJycpO1xyXG4gICAgICBzZXRMYWJlbElucHV0KCcnKTtcclxuXHJcbiAgICAgIHByb3BzLm9uU2V0dGluZ0NoYW5nZSh7XHJcbiAgICAgICAgaWQ6IHByb3BzLmlkLFxyXG4gICAgICAgIGNvbmZpZzogcHJvcHMuY29uZmlnLnNldCgndXJsbHN0JywgbmV3VXJscylcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKG5ld1VybHMpXHJcbiAgICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjgwMDAvd3JpdGUnLCB7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld1VybHMpLFxyXG4gICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdFcnJvciBwb3N0aW5nIGRhdGE6JywgZXJyb3IpKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVSZW1vdmUgPSAodXJsVG9SZW1vdmU6IHN0cmluZykgPT4ge1xyXG4gICAgY29uc3QgdXBkYXRlZFVybHMgPSB1cmxsc3QuZmlsdGVyKHVybCA9PiB1cmwudXJsICE9PSB1cmxUb1JlbW92ZSk7XHJcbiAgICBzZXRVcmxsc3QodXBkYXRlZFVybHMpO1xyXG5cclxuICAgIHByb3BzLm9uU2V0dGluZ0NoYW5nZSh7XHJcbiAgICAgIGlkOiBwcm9wcy5pZCxcclxuICAgICAgY29uZmlnOiBwcm9wcy5jb25maWcuc2V0KCd1cmxsc3QnLCB1cGRhdGVkVXJscylcclxuICAgIH0pO1xyXG5cclxuICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjgwMDAvd3JpdGUnLCB7XHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXBkYXRlZFVybHMpLFxyXG4gICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3IgcG9zdGluZyBkYXRhOicsIGVycm9yKSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LXNldHRpbmctZGVtb1wiPlxyXG4gICAgICA8U2V0dGluZ1NlY3Rpb24gY2xhc3NOYW1lPVwidXJsLWxpc3Qtc2VjdGlvblwiIHRpdGxlPVwiTWFuYWdlIFVSTHNcIj5cclxuICAgICAgICA8U2V0dGluZ1Jvdz5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXJsLWlucHV0c1wiPlxyXG4gICAgICAgICAgICA8TGFiZWw+TGF5ZXJzOjwvTGFiZWw+XHJcbiAgICAgICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBVUkxcIlxyXG4gICAgICAgICAgICAgIHZhbHVlPXt1cmxJbnB1dH1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlRHJvcGRvd25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnMTBweCcgfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtvcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPE9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17b3B0aW9uLnVybH0+XHJcbiAgICAgICAgICAgICAgICAgIHtvcHRpb24ubGFiZWx9XHJcbiAgICAgICAgICAgICAgICA8L09wdGlvbj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9TZWxlY3Q+XHJcbiAgICAgICAgICAgIHsvKiA8TGFiZWw+TGFiZWw6PC9MYWJlbD5cclxuICAgICAgICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBsYWJlbFwiXHJcbiAgICAgICAgIHZhbHVlPXtsYWJlbElucHV0fVxyXG4gICAgICAgICBvbkNoYW5nZT17aGFuZGxlTGFiZWxDaGFuZ2V9XHJcbiAgICAgICAgIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7b3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgIDxPcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e29wdGlvbi5sYWJlbH0+XHJcbiAgICAgICAgICAgICAgICAgIHtvcHRpb24ubGFiZWx9XHJcbiAgICAgICAgICAgICAgICA8L09wdGlvbj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9TZWxlY3Q+ICovfVxyXG4gICAgICAgICAgICA8TGFiZWw+WW91bmcgYWdlIGZpZWxkOjwvTGFiZWw+XHJcbiAgICAgICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCB5b3VuZyBhZ2UgZmllbGRcIlxyXG4gICAgICAgICAgICAgIHZhbHVlPXt5bmdhZ2V9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZXluZ0NoYW5nZX1cclxuICAgICAgICAgICAgICBzdHlsZT17eyBtYXJnaW5Cb3R0b206ICcxMHB4JyB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge2ZpZWxkcy5tYXAoKGZpZWxkLCBpbmRleCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPE9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17ZmllbGQubmFtZX0+XHJcbiAgICAgICAgICAgICAgICAgIHtmaWVsZC5hbGlhcyB8fCBmaWVsZC5uYW1lfVxyXG4gICAgICAgICAgICAgICAgPC9PcHRpb24+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvU2VsZWN0PlxyXG4gICAgICAgICAgICA8TGFiZWw+T2xkIGFnZSBmaWVsZDo8L0xhYmVsPlxyXG4gICAgICAgICAgICA8U2VsZWN0XHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3Qgb2xkIGFnZSBmaWVsZFwiXHJcbiAgICAgICAgICAgICAgdmFsdWU9e29sZGFnZX1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlb2xkQ2hhbmdlfVxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7ZmllbGRzLm1hcCgoZmllbGQsIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8T3B0aW9uIGtleT17aW5kZXh9IHZhbHVlPXtmaWVsZC5uYW1lfT5cclxuICAgICAgICAgICAgICAgICAge2ZpZWxkLmFsaWFzIHx8IGZpZWxkLm5hbWV9XHJcbiAgICAgICAgICAgICAgICA8L09wdGlvbj5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9TZWxlY3Q+XHJcbiAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICB0eXBlPVwicHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQWRkVXJsfVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXshdXJsSW5wdXQgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgQWRkIFVSTFxyXG4gICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvU2V0dGluZ1Jvdz5cclxuXHJcbiAgICAgICAgPFNldHRpbmdSb3c+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVybC1idXR0b25zXCI+XHJcbiAgICAgICAgICAgIHt1cmxsc3QubWFwKCh1cmxFbnRyeSkgPT4gKFxyXG4gICAgICAgICAgICAgIDxkaXYga2V5PXt1cmxFbnRyeS51cmx9IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogJzEwcHgnLCBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxyXG4gICAgICAgICAgICAgICAgPEJ1dHRvbiB0eXBlPVwiZGVmYXVsdFwiIHN0eWxlPXt7IG1hcmdpblJpZ2h0OiAnMTBweCcgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2Pnt1cmxFbnRyeS5sYWJlbCB8fCAnTm8gTGFiZWwnfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj57dXJsRW50cnkuWW91bmdfYWdlX2ZpZWxkfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj57dXJsRW50cnkub2xkX2FnZV9maWVsZH08L2Rpdj5cclxuICAgICAgICAgICAgICAgIHsvKiA8c3Bhbj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj57dXJsRW50cnkub2xkX2FnZV9maWVsZH08L3NwYW4+ICovfVxyXG4gICAgICAgICAgICAgICAgICB7Lyoge3VybEVudHJ5LmxhYmVsIHx8ICdObyBMYWJlbCd9ICovfVxyXG4gICAgICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJ0ZXJ0aWFyeVwiIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJlbW92ZSh1cmxFbnRyeS51cmwpfT5cclxuICAgICAgICAgICAgICAgICAgPENsb3NlT3V0bGluZWQgLz5cclxuICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvU2V0dGluZ1Jvdz5cclxuICAgICAgPC9TZXR0aW5nU2VjdGlvbj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXR0aW5nO1xyXG5cbiBleHBvcnQgZnVuY3Rpb24gX19zZXRfd2VicGFja19wdWJsaWNfcGF0aF9fKHVybCkgeyBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyA9IHVybCB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9