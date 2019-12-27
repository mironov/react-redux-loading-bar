"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showLoading = showLoading;
exports.hideLoading = hideLoading;
exports.resetLoading = resetLoading;
exports.loadingBarReducer = loadingBarReducer;
exports.DEFAULT_SCOPE = exports.RESET = exports.HIDE = exports.SHOW = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SHOW = 'loading-bar/SHOW';
exports.SHOW = SHOW;
var HIDE = 'loading-bar/HIDE';
exports.HIDE = HIDE;
var RESET = 'loading-bar/RESET';
exports.RESET = RESET;
var DEFAULT_SCOPE = 'default';
exports.DEFAULT_SCOPE = DEFAULT_SCOPE;

function showLoading() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_SCOPE;
  return {
    type: SHOW,
    payload: {
      scope: scope
    }
  };
}

function hideLoading() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_SCOPE;
  return {
    type: HIDE,
    payload: {
      scope: scope
    }
  };
}

function resetLoading() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_SCOPE;
  return {
    type: RESET,
    payload: {
      scope: scope
    }
  };
}

function loadingBarReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref = action.payload || {},
      _ref$scope = _ref.scope,
      scope = _ref$scope === void 0 ? DEFAULT_SCOPE : _ref$scope;

  switch (action.type) {
    case SHOW:
      return _objectSpread({}, state, _defineProperty({}, scope, (state[scope] || 0) + 1));

    case HIDE:
      return _objectSpread({}, state, _defineProperty({}, scope, Math.max(0, (state[scope] || 1) - 1)));

    case RESET:
      return _objectSpread({}, state, _defineProperty({}, scope, 0));

    default:
      return state;
  }
}