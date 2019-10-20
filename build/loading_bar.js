'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LoadingBar = exports.TERMINATING_ANIMATION_DURATION = exports.ANIMATION_DURATION = exports.PROGRESS_INCREASE = exports.MAX_PROGRESS = exports.UPDATE_TIME = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLifecyclesCompat = require('react-lifecycles-compat');

var _propTypes = require('prop-types');

var _reactRedux = require('react-redux');

var _loading_bar_ducks = require('./loading_bar_ducks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UPDATE_TIME = exports.UPDATE_TIME = 400;
var MAX_PROGRESS = exports.MAX_PROGRESS = 99;
var PROGRESS_INCREASE = exports.PROGRESS_INCREASE = 20;
var ANIMATION_DURATION = exports.ANIMATION_DURATION = UPDATE_TIME * 2;
var TERMINATING_ANIMATION_DURATION = exports.TERMINATING_ANIMATION_DURATION = UPDATE_TIME / 2;

var initialState = {
  percent: 0,
  status: 'hidden'
};

var LoadingBar = function (_Component) {
  _inherits(LoadingBar, _Component);

  function LoadingBar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LoadingBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LoadingBar.__proto__ || Object.getPrototypeOf(LoadingBar)).call.apply(_ref, [this].concat(args))), _this), _this.state = _extends({}, initialState), _this.reset = function () {
      _this.terminatingAnimationTimeoutId = null;
      _this.setState(initialState);
    }, _this.newPercent = function (percent, progressIncrease) {
      // Use cosine as a smoothing function
      // It could be any function to slow down progress near the ending 100%
      var smoothedProgressIncrease = progressIncrease * Math.cos(percent * (Math.PI / 2 / 100));

      return percent + smoothedProgressIncrease;
    }, _this.simulateProgress = function () {
      _this.setState(function (prevState, _ref2) {
        var maxProgress = _ref2.maxProgress,
            progressIncrease = _ref2.progressIncrease;
        var percent = prevState.percent;

        var newPercent = _this.newPercent(percent, progressIncrease);

        if (newPercent <= maxProgress) {
          percent = newPercent;
        }

        return { percent: percent };
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LoadingBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var status = this.state.status;

      if (status === 'starting') {
        this.start();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var status = this.state.status;

      if (prevState.status !== status) {
        if (status === 'starting') {
          this.start();
        }

        if (status === 'stopping') {
          this.stop();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.progressIntervalId);
      clearTimeout(this.terminatingAnimationTimeoutId);
    }
  }, {
    key: 'start',
    value: function start() {
      // There could be previous termination animation going, so we need to
      // cancel it and forcefully reset the Loading Bar before starting
      // the progress simulation from 0
      if (this.terminatingAnimationTimeoutId) {
        clearTimeout(this.terminatingAnimationTimeoutId);
        this.reset();
      }

      var updateTime = this.props.updateTime;

      this.progressIntervalId = setInterval(this.simulateProgress, updateTime);
      this.setState({ status: 'running' });
    }
  }, {
    key: 'stop',
    value: function stop() {
      var showFastActions = this.props.showFastActions;

      clearInterval(this.progressIntervalId);
      this.progressIntervalId = null;

      var terminatingAnimationDuration = this.isShown() || showFastActions ? TERMINATING_ANIMATION_DURATION : 0;

      this.terminatingAnimationTimeoutId = setTimeout(this.reset, terminatingAnimationDuration);

      this.setState({ percent: 100 });
    }
  }, {
    key: 'isShown',
    value: function isShown() {
      var percent = this.state.percent;

      return percent > 0 && percent <= 100;
    }
  }, {
    key: 'buildStyle',
    value: function buildStyle() {
      var _state = this.state,
          status = _state.status,
          percent = _state.percent;
      var _props = this.props,
          direction = _props.direction,
          className = _props.className,
          customStyle = _props.style;


      var animationDuration = status === 'stopping' ? TERMINATING_ANIMATION_DURATION : ANIMATION_DURATION;

      var coefficient = direction === 'rtl' ? 1 : -1;
      var tx = (100 - percent) * coefficient;

      var style = {
        opacity: '1',
        transform: 'translate3d(' + tx + '%, 0px, 0px)',
        msTransform: 'translate3d(' + tx + '%, 0px, 0px)',
        WebkitTransform: 'translate3d(' + tx + '%, 0px, 0px)',
        MozTransform: 'translate3d(' + tx + '%, 0px, 0px)',
        OTransform: 'translate3d(' + tx + '%, 0px, 0px)',
        transition: 'transform ' + animationDuration + 'ms linear 0s',
        msTransition: '-ms-transform ' + animationDuration + 'ms linear 0s',
        WebkitTransition: '-webkit-transform ' + animationDuration + 'ms linear 0s',
        MozTransition: '-moz-transform ' + animationDuration + 'ms linear 0s',
        OTransition: '-o-transform ' + animationDuration + 'ms linear 0s',
        width: '100%',
        willChange: 'transform, opacity'
        // Use default styling if there's no CSS class applied
      };if (!className) {
        style.height = '3px';
        style.backgroundColor = 'red';
        style.position = 'absolute';
      }

      if (this.isShown()) {
        style.opacity = '1';
      } else {
        style.opacity = '0';
      }

      return _extends({}, style, customStyle);
    }
  }, {
    key: 'render',
    value: function render() {
      var status = this.state.status;
      var className = this.props.className;

      if (status === 'hidden') {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { style: this.buildStyle(), className: className }),
        _react2.default.createElement('div', { style: { display: 'table', clear: 'both' } })
      );
    }
  }], [{
    key: 'shouldStart',
    value: function shouldStart(props, state) {
      return props.loading > 0 && ['hidden', 'stopping'].indexOf(state.status) >= 0;
    }
  }, {
    key: 'shouldStop',
    value: function shouldStop(props, state) {
      return props.loading === 0 && ['starting', 'running'].indexOf(state.status) >= 0;
    }
  }, {
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (LoadingBar.shouldStart(nextProps, prevState)) {
        return { status: 'starting' };
      }

      if (LoadingBar.shouldStop(nextProps, prevState)) {
        return { status: 'stopping' };
      }

      return null;
    }
  }]);

  return LoadingBar;
}(_react.Component);

LoadingBar.propTypes = {
  className: _propTypes.string,
  direction: _propTypes.string,
  loading: _propTypes.number,
  maxProgress: _propTypes.number,
  progressIncrease: _propTypes.number,
  scope: _propTypes.string,
  showFastActions: _propTypes.bool,
  style: _propTypes.object,
  updateTime: _propTypes.number
};
LoadingBar.defaultProps = {
  className: '',
  direction: 'ltr',
  loading: 0,
  maxProgress: MAX_PROGRESS,
  progressIncrease: PROGRESS_INCREASE,
  scope: _loading_bar_ducks.DEFAULT_SCOPE,
  showFastActions: false,
  style: {},
  updateTime: UPDATE_TIME
};


var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    loading: state.loadingBar[ownProps.scope || _loading_bar_ducks.DEFAULT_SCOPE]
  };
};

(0, _reactLifecyclesCompat.polyfill)(LoadingBar);
var ConnectedLoadingBar = (0, _reactRedux.connect)(mapStateToProps)(LoadingBar);

exports.LoadingBar = LoadingBar;
exports.default = ConnectedLoadingBar;