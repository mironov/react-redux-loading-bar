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

      if (action.type === undefined) {
        return;
      }

      var isPending = /.*_PENDING(.*?)$/;
      var isFulfilled = /.*_FULFILLED(.*?)$/;
      var isRejected = /.*_REJECTED(.*?)$/;

      if (action.type.match(isPending)) {
        dispatch((0, _loading_bar_ducks.showLoading)());
      } else if (action.type.match(isFulfilled) || action.type.match(isRejected)) {
        dispatch((0, _loading_bar_ducks.hideLoading)());
      }
    };
  };
}