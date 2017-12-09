'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.immutableLoadingBarReducer = immutableLoadingBarReducer;

var _reactRedux = require('react-redux');

var _loading_bar = require('./loading_bar');

var _loading_bar_ducks = require('./loading_bar_ducks');

var mapImmutableStateToProps = function mapImmutableStateToProps(state, ownProps) {
  return {
    loading: state.get('loadingBar').get(ownProps.scope || _loading_bar_ducks.DEFAULT_SCOPE)
  };
};

function immutableLoadingBarReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Map({});
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref = action.payload || Map({}),
      _ref$scope = _ref.scope,
      scope = _ref$scope === undefined ? _loading_bar_ducks.DEFAULT_SCOPE : _ref$scope;

  switch (action.type) {
    case _loading_bar_ducks.SHOW:
      return state.set(scope, (state.get('scope') || 0) + 1);
    case _loading_bar_ducks.HIDE:
      return state.set(scope, Math.max(0, (state.get('scope') || 1) - 1));
    case _loading_bar_ducks.RESET:
      return state.set(scope, 0);
    default:
      return state;
  }
}

exports.default = (0, _reactRedux.connect)(mapImmutableStateToProps)(_loading_bar.LoadingBar);