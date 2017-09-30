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

var LoadingBar = exports.LoadingBar = function (_React$Component) {
  _inherits(LoadingBar, _React$Component);

  function LoadingBar(props) {
    _classCallCheck(this, LoadingBar);

    var _this = _possibleConstructorReturn(this, (LoadingBar.__proto__ || Object.getPrototypeOf(LoadingBar)).call(this, props));

    _this.state = _extends({}, initialState, {
      hasMounted: false
    });

    _this.boundSimulateProgress = _this.simulateProgress.bind(_this);
    _this.boundResetProgress = _this.resetProgress.bind(_this);
    return _this;
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
      if (this.shouldStart(nextProps)) {
        this.launch();
      } else if (this.shouldStop(nextProps)) {
        if (this.state.percent === 0 && !this.props.showFastActions) {
          // not even shown yet because the action finished quickly after start
          clearInterval(this.state.progressInterval);
          this.resetProgress();
        } else {
          // should progress to 100 percent
          this.setState({ percent: 100 });
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.state.progressInterval);
      clearTimeout(this.state.terminatingAnimationTimeout);
    }
  }, {
    key: 'shouldStart',
    value: function shouldStart(nextProps) {
      return this.props.loading === 0 && nextProps.loading > 0;
    }
  }, {
    key: 'shouldStop',
    value: function shouldStop(nextProps) {
      return this.state.progressInterval && nextProps.loading === 0;
    }
  }, {
    key: 'shouldShow',
    value: function shouldShow() {
      return this.state.percent > 0 && this.state.percent <= 100;
    }
  }, {
    key: 'launch',
    value: function launch() {
      var _state = this.state,
          progressInterval = _state.progressInterval,
          percent = _state.percent;
      var terminatingAnimationTimeout = this.state.terminatingAnimationTimeout;


      var loadingBarNotShown = !progressInterval;
      var terminatingAnimationGoing = percent === 100;

      if (loadingBarNotShown) {
        progressInterval = setInterval(this.boundSimulateProgress, this.props.updateTime);
      }

      if (terminatingAnimationGoing) {
        clearTimeout(terminatingAnimationTimeout);
      }

      percent = 0;

      this.setState({ progressInterval: progressInterval, percent: percent });
    }
  }, {
    key: 'newPercent',
    value: function newPercent() {
      var percent = this.state.percent;
      var progressIncrease = this.props.progressIncrease;

      // Use cos as a smoothing function
      // Can be any function to slow down progress near the 100%

      var smoothedProgressIncrease = progressIncrease * Math.cos(percent * (Math.PI / 2 / 100));

      return percent + smoothedProgressIncrease;
    }
  }, {
    key: 'simulateProgress',
    value: function simulateProgress() {
      var _state2 = this.state,
          progressInterval = _state2.progressInterval,
          percent = _state2.percent,
          terminatingAnimationTimeout = _state2.terminatingAnimationTimeout;
      var maxProgress = this.props.maxProgress;


      if (percent === 100) {
        clearInterval(progressInterval);
        terminatingAnimationTimeout = setTimeout(this.boundResetProgress, TERMINATING_ANIMATION_TIME);
        progressInterval = null;
      } else if (this.newPercent() <= maxProgress) {
        percent = this.newPercent();
      }

      this.setState({ percent: percent, progressInterval: progressInterval, terminatingAnimationTimeout: terminatingAnimationTimeout });
    }
  }, {
    key: 'resetProgress',
    value: function resetProgress() {
      this.setState(initialState);
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
}(_react2.default.Component);

LoadingBar.propTypes = {
  className: _propTypes.string,
  loading: _propTypes.number,
  maxProgress: _propTypes.number,
  progressIncrease: _propTypes.number,
  showFastActions: _propTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: _propTypes.object,
  updateTime: _propTypes.number
};

LoadingBar.defaultProps = {
  className: undefined,
  loading: 0,
  maxProgress: MAX_PROGRESS,
  progressIncrease: PROGRESS_INCREASE,
  showFastActions: false,
  style: {},
  updateTime: UPDATE_TIME
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    loading: state.loadingBar
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(LoadingBar);