/** 
 * RNSliderIconButton
*/

import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, PanResponder, Animated, UIManager, ActivityIndicator } from "react-native";

// Enable LayoutAnimation on Android
if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const propTypes = {
  buttonSize: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  buttonColor: PropTypes.string,
  onVerified: PropTypes.func.isRequired,
  borderColor: PropTypes.string,
  icon: PropTypes.node,
  iconColor: PropTypes.string,
  borderRadius: PropTypes.number,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  disabledColor: PropTypes.string
};

const defaultProps = {
  backgroundColor: "#fff",
  buttonColor: "#D50000",
  borderColor: "rgba(0,0,0,0)",
  disabled: false,
  loading: false,
  disabledColor: "#D3D3D3",
  borderRadius: 0,
  iconColor: "#D50000",
};

export default class RNSliderIconButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drag: new Animated.ValueXY({x: 0, y: 0}),
      moving: false,
      verify: false,
      percent: 0,
      disabled: this.props.disabled,
      position: { x: 0, y: 0 },
      dimensions: { width: 0, height: 0 }
    };

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        const positionXY = this.state.drag.__getValue();
        this.state.drag.setOffset(positionXY);
        this.state.drag.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (e, gestureState) => {
        if (this.props.disabled) return;
        if (this.state.verify) {
          this.state.drag.setValue({ x: 0, y: 0 });
          return;
        }
    
        const { buttonSize } = this.props;
    
        const {
          drag,
          dimensions: { width }
        } = this.state;
        const maxMoving = width - buttonSize;
    
        var toX = gestureState.dx;
    
        if (toX < 0) toX = 0;
        if (toX > maxMoving) toX = maxMoving;
        const percent = ((toX * 100) / maxMoving).toFixed();
        this.setState({ percent });
    
        Animated.timing(this.state.drag, {
          toValue: { x: toX, y: 0 },
          duration: 0,
          useNativeDriver: true
        }).start();
      },
      onPanResponderRelease: () => {
        if (this.props.disabled) return;
        if (this.state.verify) return;
        if (this.state.percent >= 100) {
          this.setState({ moving: false, verify: true });
          this.props.onVerified();
        } else if (!this.state.verify) {
          this.reset();
        }
      },
      onPanResponderTerminate: () => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      }
    });   
  }

  componentDidUpdate(prevProps) {
    if (prevProps.disabled !== this.props.disabled && this.props.disabled === true) {
      this.reset();
    }
  }

  reset() {
    this.state.drag.setOffset({ x: 0, y: 0 });
    Animated.timing(this.state.drag, {
      toValue: { x: 0, y: 0 },
      duration: 300,
      useNativeDriver: true
    }).start();
    this.setState({ moving: false, verify: false, percent: 0 });
  }

  render() {
    const {
      buttonColor,
      disabledColor,
      buttonSize,
      borderColor,
      backgroundColor,
      iconColor,
      icon,
      borderRadius,
      disabled,
      loading
    } = this.props;

    const position = { transform: this.state.drag.getTranslateTransform() };
    const buttonBackgroundColor = disabled ? disabledColor : buttonColor;
    const iconBackgroundColor = disabled ? disabledColor : iconColor;

    if(loading){
      return (
        <View
          style={{
            borderColor: borderColor,
            borderWidth: 2,
            borderRadius: borderRadius + 4,
            padding: 2,
            flex: 1,
            height: buttonSize+4
          }}
        >
          <View
            onLayout={event => {
              var { x, y, width, height } = event.nativeEvent.layout;
              this.setState({
                dimensions: { width, height },
                position: { x, y }
              });
            }}
            style={{
              backgroundColor: buttonBackgroundColor,
              height: buttonSize,
              borderRadius,
              justifyContent: "center"
            }}
          >
            <ActivityIndicator />
          </View>
        </View>
      );
    }

    return (
      <View
        style={{
          borderColor: borderColor,
          borderWidth: 2,
          borderRadius: borderRadius + 4,
          padding: 2,
          flex: 1,
          height: buttonSize+4
        }}
      >
        <View
          onLayout={event => {
            var { x, y, width, height } = event.nativeEvent.layout;
            this.setState({
              dimensions: { width, height },
              position: { x, y }
            });
          }}
          style={{
            backgroundColor: buttonBackgroundColor,
            height: buttonSize,
            borderRadius,
            justifyContent: "center"
          }}
        >
          {this.props.children && (
            <View
              style={{
                position: "absolute",
                alignSelf: "center"
              }}
            >
              {this.props.children}
            </View>
          )}

          <Animated.View
            {...this._panResponder.panHandlers}
            style={[
              position,
              {
                width: buttonSize,
                height: buttonSize,
                borderRadius: borderRadius,
                backgroundColor: iconBackgroundColor,
                justifyContent: "center",
                alignItems: "center",
              }
            ]}
          >
            {icon}
          </Animated.View>
        </View>
      </View>
    );
  }
}

RNSliderIconButton.propTypes = propTypes;
RNSliderIconButton.defaultProps = defaultProps;