'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingBar = exports.PROGRESS_INCREASE = exports.MAX_PROGRESS = exports.UPDATE_TIME = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UPDATE_TIME = exports.UPDATE_TIME = 400;
var MAX_PROGRESS = exports.MAX_PROGRESS = 90;
var PROGRESS_INCREASE = exports.PROGRESS_INCREASE = 10;

var LoadingBar = exports.LoadingBar = function (_React$Component) {
  _inherits(LoadingBar, _React$Component);

  function LoadingBar(props) {
    _classCallCheck(this, LoadingBar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LoadingBar).call(this, props));

    _this.state = {
      percent: 0,
      interval: null
    };

    _this.boundSimulateProgress = _this.simulateProgress.bind(_this);
    return _this;
  }

  _createClass(LoadingBar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.launch();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.loading > this.props.loading) {
        this.launch();
      }
    }
  }, {
    key: 'launch',
    value: function launch() {
      var interval = this.state.interval;
      var percent = this.state.percent;

      if (!interval) {
        interval = setInterval(this.boundSimulateProgress, UPDATE_TIME);
      }

      this.setState({ percent: percent, interval: interval });
    }
  }, {
    key: 'simulateProgress',
    value: function simulateProgress() {
      var interval = this.state.interval;
      var percent = this.state.percent;

      if (this.props.loading === 0) {
        clearInterval(interval);
        interval = null;
        percent = 0;
      } else if (percent < MAX_PROGRESS) {
        percent = percent + PROGRESS_INCREASE;
      }

      this.setState({ percent: percent, interval: interval });
    }
  }, {
    key: 'shouldShow',
    value: function shouldShow(percent) {
      return percent > 0 && percent <= 100 && this.props.loading !== 0;
    }
  }, {
    key: 'buildStyle',
    value: function buildStyle() {
      var style = {
        height: '3px',
        width: this.state.percent + '%',
        backgroundColor: 'red',
        transition: 'width 400ms ease-out, height 400ms linear',
        position: 'absolute'
      };

      return _extends({}, style, this.props.style);
    }
  }, {
    key: 'render',
    value: function render() {
      var style = this.buildStyle();

      if (this.shouldShow(this.state.percent)) {
        style.display = 'block';
      } else {
        style.display = 'none';
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { style: style, className: this.props.className }),
        _react2.default.createElement('div', { style: { display: 'table', clear: 'both' } })
      );
    }
  }]);

  return LoadingBar;
}(_react2.default.Component);

LoadingBar.propTypes = {
  style: _react.PropTypes.object,
  className: _react.PropTypes.string,
  actions: _react.PropTypes.object,
  loading: _react.PropTypes.number
};

LoadingBar.defaultProps = {
  style: {},
  className: undefined,
  loading: 0
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    loading: state.loading
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(LoadingBar);