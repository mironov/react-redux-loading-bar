'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showLoading = showLoading;
exports.hideLoading = hideLoading;
exports.resetLoading = resetLoading;
exports.loadingBarReducer = loadingBarReducer;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SHOW = exports.SHOW = 'loading-bar/SHOW';
var HIDE = exports.HIDE = 'loading-bar/HIDE';
var RESET = exports.RESET = 'loading-bar/RESET';

function showLoading() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

  return {
    type: SHOW,
    payload: {
      scope: scope
    }
  };
}

function hideLoading() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

  return {
    type: HIDE,
    payload: {
      scope: scope
    }
  };
}

function resetLoading() {
  var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

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
  var scope = action.payload.scope;


  switch (action.type) {
    case SHOW:
      return _defineProperty({}, scope, (state[scope] || 0) + 1);

    case HIDE:
      return _defineProperty({}, scope, (state[scope] || 1) - 1);
    case RESET:
      return _defineProperty({}, scope, 0);
    default:
      return state;
  }
}