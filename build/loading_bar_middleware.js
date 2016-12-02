'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = loadingBarMiddleware;

var _loading_bar_ducks = require('./loading_bar_ducks');

var defaultTypeSuffixes = ['PENDING', 'FULFILLED', 'REJECTED'];

function loadingBarMiddleware() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypeSuffixes;

  return function (_ref) {
    var dispatch = _ref.dispatch;
    return function (next) {
      return function (action) {
        if (action.type) {
          var _promiseTypeSuffixes = _slicedToArray(promiseTypeSuffixes, 3),
              PENDING = _promiseTypeSuffixes[0],
              FULFILLED = _promiseTypeSuffixes[1],
              REJECTED = _promiseTypeSuffixes[2];

          var isPending = new RegExp(PENDING + '$', 'g');
          var isFulfilled = new RegExp(FULFILLED + '$', 'g');
          var isRejected = new RegExp(REJECTED + '$', 'g');

          if (action.type.match(isPending)) {
            dispatch((0, _loading_bar_ducks.showLoading)());
          } else if (action.type.match(isFulfilled) || action.type.match(isRejected)) {
            dispatch((0, _loading_bar_ducks.hideLoading)());
          }
        }

        return next(action);
      };
    };
  };
}