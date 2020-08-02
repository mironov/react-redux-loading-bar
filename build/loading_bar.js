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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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

var LoadingBar = /*#__PURE__*/function (_Component) {
  _inherits(LoadingBar, _Component);

  var _super = _createSuper(LoadingBar);

  _createClass(LoadingBar, null, [{
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

  function LoadingBar(props) {
    var _this;

    _classCallCheck(this, LoadingBar);

    _this = _super.call(this, props);

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

    _this.state = _objectSpread({}, initialState);
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
          className = _this$props.className,
          customStyle = _this$props.style;
      var animationDuration = status === 'stopping' ? TERMINATING_ANIMATION_DURATION : ANIMATION_DURATION;
      var style = {
        width: "".concat(percent, "%"),
        transition: "width ".concat(animationDuration, "ms linear 0s"),
        msTransition: "width ".concat(animationDuration, "ms linear 0s"),
        WebkitTransition: "width ".concat(animationDuration, "ms linear 0s"),
        MozTransition: "width ".concat(animationDuration, "ms linear 0s"),
        OTransition: "width ".concat(animationDuration, "ms linear 0s"),
        willChange: 'width, opacity'
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

      return _objectSpread(_objectSpread({}, style), customStyle);
    }
  }, {
    key: "render",
    value: function render() {
      var status = this.state.status;
      var _this$props2 = this.props,
          direction = _this$props2.direction,
          className = _this$props2.className;

      if (status === 'hidden') {
        return /*#__PURE__*/_react["default"].createElement("div", null);
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          direction: direction
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: this.buildStyle(),
        className: className
      }), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          display: 'table',
          clear: 'both'
        }
      }));
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