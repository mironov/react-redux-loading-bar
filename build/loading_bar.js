"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.LoadingBar = exports.TERMINATING_ANIMATION_DURATION = exports.ANIMATION_DURATION = exports.PROGRESS_INCREASE = exports.MAX_PROGRESS = exports.UPDATE_TIME = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _propTypes = require("prop-types");

var _reactRedux = require("react-redux");

var _loading_bar_ducks = require("./loading_bar_ducks");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var UPDATE_TIME = 400;
exports.UPDATE_TIME = UPDATE_TIME;
var MAX_PROGRESS = 99;
exports.MAX_PROGRESS = MAX_PROGRESS;
var PROGRESS_INCREASE = 20;
exports.PROGRESS_INCREASE = PROGRESS_INCREASE;
var ANIMATION_DURATION = UPDATE_TIME * 2;
exports.ANIMATION_DURATION = ANIMATION_DURATION;
var TERMINATING_ANIMATION_DURATION = UPDATE_TIME / 2;
exports.TERMINATING_ANIMATION_DURATION = TERMINATING_ANIMATION_DURATION;
var initialState = {
  percent: 0,
  status: 'hidden'
};

var LoadingBar =
/*#__PURE__*/
function (_Component) {
  _inherits(LoadingBar, _Component);

  function LoadingBar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LoadingBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LoadingBar)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = _objectSpread({}, initialState);

    _this.reset = function () {
      _this.terminatingAnimationTimeoutId = null;

      _this.setState(initialState);
    };

    _this.newPercent = function (percent, progressIncrease) {
      // Use cosine as a smoothing function
      // It could be any function to slow down progress near the ending 100%
      var smoothedProgressIncrease = progressIncrease * Math.cos(percent * (Math.PI / 2 / 100));
      return percent + smoothedProgressIncrease;
    };

    _this.simulateProgress = function () {
      _this.setState(function (prevState, _ref) {
        var maxProgress = _ref.maxProgress,
            progressIncrease = _ref.progressIncrease;
        var percent = prevState.percent;

        var newPercent = _this.newPercent(percent, progressIncrease);

        if (newPercent <= maxProgress) {
          percent = newPercent;
        }

        return {
          percent: percent
        };
      });
    };

    return _this;
  }

  _createClass(LoadingBar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var status = this.state.status;

      if (status === 'starting') {
        this.start();
      }
    }
  }, {
    key: "componentDidUpdate",
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
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.progressIntervalId);
      clearTimeout(this.terminatingAnimationTimeoutId);
    }
  }, {
    key: "start",
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
      this.setState({
        status: 'running'
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      var showFastActions = this.props.showFastActions;
      clearInterval(this.progressIntervalId);
      this.progressIntervalId = null;
      var terminatingAnimationDuration = this.isShown() || showFastActions ? TERMINATING_ANIMATION_DURATION : 0;
      this.terminatingAnimationTimeoutId = setTimeout(this.reset, terminatingAnimationDuration);
      this.setState({
        percent: 100
      });
    }
  }, {
    key: "isShown",
    value: function isShown() {
      var percent = this.state.percent;
      return percent > 0 && percent <= 100;
    }
  }, {
    key: "buildStyle",
    value: function buildStyle() {
      var _this$state = this.state,
          status = _this$state.status,
          percent = _this$state.percent;
      var _this$props = this.props,
          direction = _this$props.direction,
          className = _this$props.className,
          customStyle = _this$props.style;
      var animationDuration = status === 'stopping' ? TERMINATING_ANIMATION_DURATION : ANIMATION_DURATION;
      var coefficient = direction === 'rtl' ? 1 : -1;
      var tx = (100 - percent) * coefficient;
      var style = {
        opacity: '1',
        transform: "translate3d(".concat(tx, "%, 0px, 0px)"),
        msTransform: "translate3d(".concat(tx, "%, 0px, 0px)"),
        WebkitTransform: "translate3d(".concat(tx, "%, 0px, 0px)"),
        MozTransform: "translate3d(".concat(tx, "%, 0px, 0px)"),
        OTransform: "translate3d(".concat(tx, "%, 0px, 0px)"),
        transition: "transform ".concat(animationDuration, "ms linear 0s"),
        msTransition: "-ms-transform ".concat(animationDuration, "ms linear 0s"),
        WebkitTransition: "-webkit-transform ".concat(animationDuration, "ms linear 0s"),
        MozTransition: "-moz-transform ".concat(animationDuration, "ms linear 0s"),
        OTransition: "-o-transform ".concat(animationDuration, "ms linear 0s"),
        width: '100%',
        willChange: 'transform, opacity'
      }; // Use default styling if there's no CSS class applied

      if (!className) {
        style.height = '3px';
        style.backgroundColor = 'red';
        style.position = 'absolute';
      }

      if (this.isShown()) {
        style.opacity = '1';
      } else {
        style.opacity = '0';
      }

      return _objectSpread({}, style, {}, customStyle);
    }
  }, {
    key: "render",
    value: function render() {
      var status = this.state.status;
      var className = this.props.className;

      if (status === 'hidden') {
        return _react["default"].createElement("div", null);
      }

      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        style: this.buildStyle(),
        className: className
      }), _react["default"].createElement("div", {
        style: {
          display: 'table',
          clear: 'both'
        }
      }));
    }
  }], [{
    key: "shouldStart",
    value: function shouldStart(props, state) {
      return props.loading > 0 && ['hidden', 'stopping'].indexOf(state.status) >= 0;
    }
  }, {
    key: "shouldStop",
    value: function shouldStop(props, state) {
      return props.loading === 0 && ['starting', 'running'].indexOf(state.status) >= 0;
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (LoadingBar.shouldStart(nextProps, prevState)) {
        return {
          status: 'starting'
        };
      }

      if (LoadingBar.shouldStop(nextProps, prevState)) {
        return {
          status: 'stopping'
        };
      }

      return null;
    }
  }]);

  return LoadingBar;
}(_react.Component);

exports.LoadingBar = LoadingBar;
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
exports["default"] = ConnectedLoadingBar;