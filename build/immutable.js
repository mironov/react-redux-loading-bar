"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRedux = require("react-redux");

var _loading_bar = require("./loading_bar");

var _loading_bar_ducks = require("./loading_bar_ducks");

var mapImmutableStateToProps = function mapImmutableStateToProps(state, ownProps) {
  return {
    loading: state.get('loadingBar')[ownProps.scope || _loading_bar_ducks.DEFAULT_SCOPE]
  };
};

var _default = (0, _reactRedux.connect)(mapImmutableStateToProps)(_loading_bar.LoadingBar);

exports["default"] = _default;