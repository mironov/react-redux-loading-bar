'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingBar = exports.TERMINATING_ANIMATION_TIME = exports.ANIMATION_TIME = exports.PROGRESS_INCREASE = exports.MAX_PROGRESS = exports.UPDATE_TIME = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _reactRedux = require('react-redux');

var _loading_bar_ducks = require('./loading_bar_ducks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UPDATE_TIME = exports.UPDATE_TIME = 200;
var MAX_PROGRESS = exports.MAX_PROGRESS = 99;
var PROGRESS_INCREASE = exports.PROGRESS_INCREASE = 10;
var ANIMATION_TIME = exports.ANIMATION_TIME = UPDATE_TIME * 4;
var TERMINATING_ANIMATION_TIME = exports.TERMINATING_ANIMATION_TIME = UPDATE_TIME / 2;

var initialState = {
  terminatingAnimationTimeout: null,
  percent: 0,
  progressInterval: null
};

var LoadingBar = exports.LoadingBar = function (_Component) {
  _inherits(LoadingBar, _Component);

  function LoadingBar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LoadingBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LoadingBar.__proto__ || Object.getPrototypeOf(LoadingBar)).call.apply(_ref, [this].concat(args))), _this), _this.state = _extends({}, initialState, {
      hasMounted: false
    }), _this.shouldStart = function (props, nextProps) {
      return props.loading === 0 && nextProps.loading > 0;
    }, _this.shouldStop = function (state, nextProps) {
      return state.progressInterval && nextProps.loading === 0;
    }, _this.newPercent = function (percent, progressIncrease) {
      // Use cos as a smoothing function
      // Can be any function to slow down progress near the 100%
      var smoothedProgressIncrease = progressIncrease * Math.cos(percent * (Math.PI / 2 / 100));

      return percent + smoothedProgressIncrease;
    }, _this.simulateProgress = function () {
      _this.setState(function (prevState, _ref2) {
        var maxProgress = _ref2.maxProgress,
            progressIncrease = _ref2.progressIncrease;
        var progressInterval = prevState.progressInterval,
            percent = prevState.percent,
            terminatingAnimationTimeout = prevState.terminatingAnimationTimeout;

        var newPercent = _this.newPercent(percent, progressIncrease);

        if (percent === 100) {
          clearInterval(progressInterval);
          terminatingAnimationTimeout = setTimeout(_this.resetProgress, TERMINATING_ANIMATION_TIME);
          progressInterval = null;
        } else if (newPercent <= maxProgress) {
          percent = newPercent;
        }

        return { percent: percent, progressInterval: progressInterval, terminatingAnimationTimeout: terminatingAnimationTimeout };
      });
    }, _this.resetProgress = function () {
      _this.setState(initialState);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LoadingBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Re-render the component after mount to fix problems with SSR and CSP.
      //
      // Apps that use Server Side Rendering and has Content Security Policy
      // for style that doesn't allow inline styles should render an empty div
      // and replace it with the actual Loading Bar after mount
      // See: https://github.com/mironov/react-redux-loading-bar/issues/39
      //
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ hasMounted: true });

      if (this.props.loading > 0) {
        this.launch();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (this.shouldStart(this.props, nextProps)) {
        this.launch();
        return;
      }

      this.setState(function (prevState, props) {
        if (_this2.shouldStop(prevState, nextProps)) {
          if (prevState.percent === 0 && !props.showFastActions) {
            // not even shown yet because the action finished quickly after start
            clearInterval(prevState.progressInterval);
            return initialState;
          }

          // should progress to 100 percent
          return { percent: 100 };
        }

        return null;
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.state.progressInterval);
      clearTimeout(this.state.terminatingAnimationTimeout);
    }
  }, {
    key: 'shouldShow',
    value: function shouldShow() {
      return this.state.percent > 0 && this.state.percent <= 100;
    }
  }, {
    key: 'launch',
    value: function launch() {
      var _this3 = this;

      this.setState(function (prevState, _ref3) {
        var updateTime = _ref3.updateTime;
        var progressInterval = prevState.progressInterval;
        var terminatingAnimationTimeout = prevState.terminatingAnimationTimeout,
            percent = prevState.percent;


        var loadingBarNotShown = !progressInterval;
        var terminatingAnimationGoing = percent === 100;

        if (loadingBarNotShown) {
          progressInterval = setInterval(_this3.simulateProgress, updateTime);
        }

        if (terminatingAnimationGoing) {
          clearTimeout(terminatingAnimationTimeout);
        }

        return { progressInterval: progressInterval, percent: 0 };
      });
    }
  }, {
    key: 'buildStyle',
    value: function buildStyle() {
      var animationTime = this.state.percent !== 100 ? ANIMATION_TIME : TERMINATING_ANIMATION_TIME;

      var style = {
        opacity: '1',
        transform: 'scaleX(' + this.state.percent / 100 + ')',
        transformOrigin: 'left',
        transition: 'transform ' + animationTime + 'ms linear',
        width: '100%',
        willChange: 'transform, opacity'

        // Use default styling if there's no CSS class applied
      };if (!this.props.className) {
        style.height = '3px';
        style.backgroundColor = 'red';
        style.position = 'absolute';
      }

      if (this.shouldShow()) {
        style.opacity = '1';
      } else {
        style.opacity = '0';
      }

      return _extends({}, style, this.props.style);
    }
  }, {
    key: 'render',
    value: function render() {
      // In order not to violate strict style CSP it's better to make
      // an extra re-render after component mount
      if (!this.state.hasMounted) {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { style: this.buildStyle(), className: this.props.className }),
        _react2.default.createElement('div', { style: { display: 'table', clear: 'both' } })
      );
    }
  }]);

  return LoadingBar;
}(_react.Component);

LoadingBar.propTypes = {
  className: _propTypes.string,
  loading: _propTypes.number,
  maxProgress: _propTypes.number,
  progressIncrease: _propTypes.number,
  showFastActions: _propTypes.bool,
  updateTime: _propTypes.number,
  scope: _propTypes.string,
  style: _propTypes.object
};
LoadingBar.defaultProps = {
  className: '',
  loading: 0,
  maxProgress: MAX_PROGRESS,
  progressIncrease: PROGRESS_INCREASE,
  showFastActions: false,
  style: {},
  updateTime: UPDATE_TIME,
  scope: _loading_bar_ducks.DEFAULT_SCOPE
};


var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    loading: state.loadingBar[ownProps.scope || _loading_bar_ducks.DEFAULT_SCOPE]
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(LoadingBar);