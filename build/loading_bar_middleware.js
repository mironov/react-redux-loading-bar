'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadingBarMiddleware;

var _loading_bar_ducks = require('./loading_bar_ducks');

function loadingBarMiddleware(_ref) {
  var dispatch = _ref.dispatch;

  return function (next) {
    return function (action) {
      next(action);

      if (action.type.includes('_PENDING')) {
        dispatch((0, _loading_bar_ducks.showLoading)());
      } else if (action.type.includes('_FULFILLED') || action.type.includes('_REJECTED')) {
        dispatch((0, _loading_bar_ducks.hideLoading)());
      }
    };
  };
}