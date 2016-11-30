'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _loading_bar = require('./loading_bar');

var mapImmutableStateToProps = function mapImmutableStateToProps(state) {
  return {
    loading: state.get('loadingBar')
  };
};

exports.default = (0, _reactRedux.connect)(mapImmutableStateToProps)(_loading_bar.LoadingBar);