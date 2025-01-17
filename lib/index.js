"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactNative = require("react-native");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } } /** 
                                                                                                                                                                                                                                                                                                                                           * RNSliderIconButton
                                                                                                                                                                                                                                                                                                                                          */
// Enable LayoutAnimation on Android
if (_reactNative.UIManager.setLayoutAnimationEnabledExperimental) {
  _reactNative.UIManager.setLayoutAnimationEnabledExperimental(true);
}
var propTypes = {
  buttonSize: _propTypes["default"].number.isRequired,
  initialColor: _propTypes["default"].string,
  finalColor: _propTypes["default"].string,
  textStyle: _propTypes["default"].object,
  onVerified: _propTypes["default"].func.isRequired,
  icon: _propTypes["default"].node,
  iconColor: _propTypes["default"].string,
  borderRadius: _propTypes["default"].number,
  disabled: _propTypes["default"].bool,
  loading: _propTypes["default"].bool
};
var defaultProps = {
  initialColor: 'rgba(253,154,13,1)',
  finalColor: 'rgba(253,154,13,0.5)',
  textStyle: {},
  borderColor: "rgba(0,0,0,0)",
  loadingBackGround: "rgba(0,0,0,0)",
  disabled: false,
  loading: false,
  borderRadius: 0,
  iconColor: "#D50000",
  buttonSize: 60
};
var RNSliderIconButton = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(RNSliderIconButton, _Component);
  var _super = _createSuper(RNSliderIconButton);
  function RNSliderIconButton(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, RNSliderIconButton);
    _this = _super.call(this, props);
    _this.state = {
      drag: new _reactNative.Animated.ValueXY({
        x: 0,
        y: 0
      }),
      moving: false,
      verify: false,
      percent: 0,
      disabled: _this.props.disabled,
      position: {
        x: 0,
        y: 0
      },
      dimensions: {
        width: 0,
        height: 0
      }
    };
    _this._panResponder = _reactNative.PanResponder.create({
      onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
        return true;
      },
      onPanResponderGrant: function onPanResponderGrant() {
        var positionXY = _this.state.drag.__getValue();
        _this.state.drag.setOffset(positionXY);
        _this.state.drag.setValue({
          x: 0,
          y: 0
        });
      },
      onPanResponderMove: function onPanResponderMove(e, gestureState) {
        if (_this.props.disabled) return;
        if (_this.state.verify) {
          _this.state.drag.setValue({
            x: 0,
            y: 0
          });
          return;
        }
        var buttonSize = _this.props.buttonSize;
        var _this$state = _this.state,
          drag = _this$state.drag,
          width = _this$state.dimensions.width;
        var maxMoving = width - buttonSize;
        var toX = gestureState.dx;
        if (toX < 0) toX = 0;
        if (toX > maxMoving) toX = maxMoving;
        var percent = (toX * 100 / maxMoving).toFixed();
        _this.setState({
          percent: percent
        });
        _reactNative.Animated.timing(_this.state.drag, {
          toValue: {
            x: toX,
            y: 0
          },
          duration: 0,
          useNativeDriver: true
        }).start();
      },
      onPanResponderRelease: function onPanResponderRelease() {
        if (_this.props.disabled) return;
        if (_this.state.verify) return;
        if (_this.state.percent >= 100) {
          _this.setState({
            moving: false,
            verify: true
          });
          _this.props.onVerified();
        } else if (!_this.state.verify) {
          _this.reset();
        }
      },
      onPanResponderTerminate: function onPanResponderTerminate() {
        // Another component has become the responder, so this gesture
        // should be cancelled
      }
    });
    return _this;
  }
  (0, _createClass2["default"])(RNSliderIconButton, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.disabled !== this.props.disabled && this.props.disabled === true) {
        this.reset();
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.state.drag.setOffset({
        x: 0,
        y: 0
      });
      _reactNative.Animated.timing(this.state.drag, {
        toValue: {
          x: 0,
          y: 0
        },
        duration: 300,
        useNativeDriver: true
      }).start();
      this.setState({
        moving: false,
        verify: false,
        percent: 0
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var { 
        buttonSize,
        borderColor,
        iconColor,
        icon,
        borderRadius,
        loading,
        initialColor,
        finalColor 
      } = this.props;
      var position = {
        transform: this.state.drag.getTranslateTransform()
      };
      if (loading) {
        return /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
          style: {
            borderColor: borderColor,
            borderWidth: 2,
            borderRadius: borderRadius + 4,
            padding: 2,
            flex: 1,
            height: buttonSize + 4
          }
        }, /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
          onLayout: function onLayout(event) {
            var _event$nativeEvent$la = event.nativeEvent.layout,
              x = _event$nativeEvent$la.x,
              y = _event$nativeEvent$la.y,
              width = _event$nativeEvent$la.width,
              height = _event$nativeEvent$la.height;
            _this2.setState({
              dimensions: {
                width: width,
                height: height
              },
              position: {
                x: x,
                y: y
              }
            });
          },
          style: {
            backgroundColor: finalColor,
            height: buttonSize,
            borderRadius: borderRadius,
            justifyContent: "center"
          }
        }, /*#__PURE__*/_react["default"].createElement(_reactNative.ActivityIndicator, {
          color: "white"
        })));
      }
      return /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
        style: {
          borderRadius: borderRadius,
          height: buttonSize,
          backgroundColor: initialColor,
          overflow: 'hidden'
        }
      }, /*#__PURE__*/_react["default"].createElement(_reactNative.Animated.View, {
        style: {
          position: 'absolute',
          left: 0,
          height: '100%',
          width: '100%',
          transform: [{
            translateX: this.state.dimensions.width > buttonSize ? this.state.drag.x.interpolate({
              inputRange: [0, this.state.dimensions.width - buttonSize],
              outputRange: [-this.state.dimensions.width + buttonSize, 1],
              extrapolate: 'clamp'
            }) : 0
          }],
          backgroundColor: finalColor,
          borderRadius: borderRadius
        }
      }), /*#__PURE__*/_react["default"].createElement(_reactNative.Animated.View, {
        onLayout: function onLayout(event) {
          var _event$nativeEvent$la2 = event.nativeEvent.layout,
            x = _event$nativeEvent$la2.x,
            y = _event$nativeEvent$la2.y,
            width = _event$nativeEvent$la2.width,
            height = _event$nativeEvent$la2.height;
          _this2.setState({
            dimensions: {
              width: width,
              height: height
            },
            position: {
              x: x,
              y: y
            }
          });
        },
        style: [{
          justifyContent: "center"
        }]
      }, this.props.children && /*#__PURE__*/_react["default"].createElement(_reactNative.View, {
        style: {
          position: "absolute",
          alignSelf: "center"
        }
      }, /*#__PURE__*/_react["default"].cloneElement(this.props.children, {
        style: _objectSpread({}, this.props.textStyle)
      })), /*#__PURE__*/_react["default"].createElement(_reactNative.Animated.View, (0, _extends2["default"])({}, this._panResponder.panHandlers, {
        style: [position, {
          width: buttonSize,
          height: buttonSize,
          borderRadius: borderRadius,
          backgroundColor: iconColor,
          justifyContent: "center",
          alignItems: "center"
        }]
      }), icon)));
    }
  }]);
  return RNSliderIconButton;
}(_react.Component);
exports["default"] = RNSliderIconButton;
RNSliderIconButton.propTypes = propTypes;
RNSliderIconButton.defaultProps = defaultProps;
