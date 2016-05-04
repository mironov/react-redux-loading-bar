'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingBar = exports.PROGRESS_INCREASE = exports.MAX_PROGRESS = exports.UPDATE_TIME = undefined;

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
    key: 'render',
    value: function render() {
      var loadingStyle = {
        height: this.props.height,
        width: this.state.percent + '%',
        backgroundColor: this.props.color,
        transition: 'width 400ms ease-out, height 400ms linear',
        position: 'absolute'
      };

      if (this.shouldShow(this.state.percent)) {
        loadingStyle.display = 'block';
      } else {
        loadingStyle.display = 'none';
      }

      return _react2.default.createElement('div', { style: loadingStyle });
    }
  }]);

  return LoadingBar;
}(_react2.default.Component);

LoadingBar.propTypes = {
  color: _react.PropTypes.string,
  height: _react.PropTypes.string,
  actions: _react.PropTypes.object,
  loading: _react.PropTypes.number
};

LoadingBar.defaultProps = {
  color: 'red',
  height: '3px',
  loading: 0
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    loading: state.loading
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(LoadingBar);