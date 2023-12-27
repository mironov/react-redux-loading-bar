"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "LoadingBar", {
  enumerable: true,
  get: function get() {
    return _loading_bar.LoadingBar;
  }
});
Object.defineProperty(exports, "loadingBarMiddleware", {
  enumerable: true,
  get: function get() {
    return _loading_bar_middleware["default"];
  }
});
Object.defineProperty(exports, "DEFAULT_SCOPE", {
  enumerable: true,
  get: function get() {
    return _loading_bar_ducks.DEFAULT_SCOPE;
  }
});
Object.defineProperty(exports, "HIDE", {
  enumerable: true,
  get: function get() {
    return _loading_bar_ducks.HIDE;
  }
});
Object.defineProperty(exports, "hideLoading", {
  enumerable: true,
  get: function get() {
    return _loading_bar_ducks.hideLoading;
  }
});
Object.defineProperty(exports, "loadingBarReducer", {
  enumerable: true,
  get: function get() {
    return _loading_bar_ducks.loadingBarReducer;
  }
});
Object.defineProperty(exports, "RESET", {
  enumerable: true,
  get: function get() {
    return _loading_bar_ducks.RESET;
  }
});
Object.defineProperty(exports, "resetLoading", {
  enumerable: true,
  get: function get() {
    return _loading_bar_ducks.resetLoading;
  }
});
Object.defineProperty(exports, "SHOW", {
  enumerable: true,
  get: function get() {
    return _loading_bar_ducks.SHOW;
  }
});
Object.defineProperty(exports, "showLoading", {
  enumerable: true,
  get: function get() {
    return _loading_bar_ducks.showLoading;
  }
});
Object.defineProperty(exports, "ImmutableLoadingBar", {
  enumerable: true,
  get: function get() {
    return _immutable["default"];
  }
});
exports["default"] = void 0;

var _loading_bar = _interopRequireWildcard(require("./loading_bar"));

var _loading_bar_middleware = _interopRequireDefault(require("./loading_bar_middleware"));

var _loading_bar_ducks = require("./loading_bar_ducks");

var _immutable = _interopRequireDefault(require("./immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = _loading_bar["default"];
exports["default"] = _default;