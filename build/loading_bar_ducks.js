'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showLoading = showLoading;
exports.hideLoading = hideLoading;
exports.resetLoading = resetLoading;
exports.loadingBarReducer = loadingBarReducer;
var SHOW = exports.SHOW = 'loading-bar/SHOW';
var HIDE = exports.HIDE = 'loading-bar/HIDE';
var RESET = exports.RESET = 'loading-bar/RESET';

function showLoading() {
  return {
    type: SHOW
  };
}

function hideLoading() {
  return {
    type: HIDE
  };
}

function resetLoading() {
  return {
    type: RESET
  };
}

function loadingBarReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var newState = void 0;

  switch (action.type) {
    case SHOW:
      newState = state + 1;
      break;
    case HIDE:
      newState = state > 0 ? state - 1 : 0;
      break;
    case RESET:
      newState = 0;
      break;
    default:
      return state;
  }

  return newState;
}