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

var UPDATE_TIME = exports.UPDATE_TIME = 200;
var MAX_PROGRESS = exports.MAX_PROGRESS = 99;
var PROGRESS_INCREASE = exports.PROGRESS_INCREASE = 10;
var ANIMATION_DURATION = exports.ANIMATION_DURATION = UPDATE_TIME;
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
      if (this.state.status === 'starting') {
        this.start();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.status !== this.state.status) {
        if (this.state.status === 'starting') {
          this.start();
        }

        if (this.state.status === 'stopping') {
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
      this.progressIntervalId = setInterval(this.simulateProgress, this.props.updateTime);
      this.setState({ status: 'running' });
    }
  }, {
    key: 'stop',
    value: function stop() {
      clearInterval(this.progressIntervalId);
      this.progressIntervalId = null;

      var terminatingAnimationDuration = this.isShown() || this.props.showFastActions ? TERMINATING_ANIMATION_DURATION : 0;

      this.terminatingAnimationTimeoutId = setTimeout(this.reset, terminatingAnimationDuration);

      this.setState({ percent: 100 });
    }
  }, {
    key: 'isShown',
    value: function isShown() {
      return this.state.percent > 0 && this.state.percent <= 100;
    }
  }, {
    key: 'buildStyle',
    value: function buildStyle() {
      var animationDuration = this.state.status === 'stopping' ? TERMINATING_ANIMATION_DURATION : ANIMATION_DURATION;

      //
      // browser css3 animation compatibility
      // Style keys are camelCased in order to be
      // consistent with accessing the properties on DOM nodes from JS
      // (e.g. node.style.backgroundImage).
      // Vendor prefixes other than ms should begin with a capital letter.
      // This is why WebkitTransition has an uppercase “W”.
      // https://reactjs.org/docs/dom-elements.html#style
      var style = {
        opacity: '1',
        transform: 'scaleX(' + this.state.percent / 100 + ')',
        msTransform: 'scaleX(' + this.state.percent / 100 + ')',
        WebkitTransform: 'scaleX(' + this.state.percent / 100 + ')',
        MozTransform: 'scaleX(' + this.state.percent / 100 + ')',
        OTransform: 'scaleX(' + this.state.percent / 100 + ')',
        transformOrigin: 'left',
        msTransformOrigin: 'left',
        WebkitTransformOrigin: 'left',
        MozTransformOrigin: 'left',
        OTransformOrigin: 'left',
        transition: 'transform ' + animationDuration + 'ms linear',
        msTransition: '-ms-transform ' + animationDuration + 'ms linear',
        WebkitTransition: '-webkit-transform ' + animationDuration + 'ms linear',
        MozTransition: '-moz-transform ' + animationDuration + 'ms linear',
        OTransition: '-o-transform ' + animationDuration + 'ms linear',
        width: '100%',
        willChange: 'transform, opacity'
        // Use default styling if there's no CSS class applied
      };if (!this.props.className) {
        style.height = '3px';
        style.backgroundColor = 'red';
        style.position = 'absolute';
      }

      if (this.isShown()) {
        style.opacity = '1';
      } else {
        style.opacity = '0';
      }

      return _extends({}, style, this.props.style);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.status === 'hidden') {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { style: this.buildStyle(), className: this.props.className }),
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

(0, _reactLifecyclesCompat.polyfill)(LoadingBar);
var ConnectedLoadingBar = (0, _reactRedux.connect)(mapStateToProps)(LoadingBar);

exports.LoadingBar = LoadingBar;
exports.default = ConnectedLoadingBar;