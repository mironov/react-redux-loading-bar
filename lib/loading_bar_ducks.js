'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.showLoading = showLoading;
exports.hideLoading = hideLoading;
exports.resetLoading = resetLoading;
exports.loadingBarReducer = loadingBarReducer;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SHOW = exports.SHOW = 'loading-bar/SHOW';
var HIDE = exports.HIDE = 'loading-bar/HIDE';
var RESET = exports.RESET = 'loading-bar/RESET';

var DEFAULT_SCOPE = exports.DEFAULT_SCOPE = 'default';

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
      scope = _ref$scope === undefined ? DEFAULT_SCOPE : _ref$scope;

  switch (action.type) {
    case SHOW:
      return _extends({}, state, _defineProperty({}, scope, (state[scope] || 0) + 1));
    case HIDE:
      return _extends({}, state, _defineProperty({}, scope, Math.max(0, (state[scope] || 1) - 1)));
    case RESET:
      return _extends({}, state, _defineProperty({}, scope, 0));
    default:
      return state;
  }
}