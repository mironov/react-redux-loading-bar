'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showLoading = showLoading;
exports.hideLoading = hideLoading;
exports.loadingBarReducer = loadingBarReducer;

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SHOW = 'loading-bar/SHOW';
var HIDE = 'loading-bar/HIDE';

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

function loadingBarReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  switch (action.type) {
    case SHOW:
      return (0, _reactAddonsUpdate2.default)(state, {
        $set: state + 1
      });
    case HIDE:
      return (0, _reactAddonsUpdate2.default)(state, {
        $set: state - 1
      });

    default:
      return state;
  }
}