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
  initialColor: PropTypes.string,
  finalColor: PropTypes.string,
  textStyle: PropTypes.object,
  onVerified: PropTypes.func.isRequired,
  icon: PropTypes.node,
  iconColor: PropTypes.string,
  borderRadius: PropTypes.number,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

const defaultProps = {
  initialColor: 'rgba(253,154,13,1)',
  finalColor: 'rgba(253,154,13,0.5)',
  textStyle: {},
  borderColor: "rgba(0,0,0,0)",
  loadingBackGround: "rgba(0,0,0,0)",
  disabled: false,
  loading: false,
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
      buttonSize,
      borderColor,
      iconColor,
      icon,
      borderRadius,
      loading
    } = this.props;

    const position = { transform: this.state.drag.getTranslateTransform() };

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
              backgroundColor: finalColor,
              height: buttonSize,
              borderRadius,
              justifyContent: "center"
            }}
          >
            <ActivityIndicator color="white"/>
          </View>
        </View>
      );
    }

    return (
      <View
      style={{
        borderRadius:borderRadius,
        height: buttonSize,
        backgroundColor: initialColor,
          overflow: 'hidden' 
      }}
      >
        <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          height: '100%',
          width: '100%',
          transform: [
            {
              translateX: this.state.dimensions.width > buttonSize 
              ? this.state.drag.x.interpolate({
                inputRange: [0, this.state.dimensions.width - buttonSize],
                outputRange: [-this.state.dimensions.width + buttonSize, 1],
                extrapolate: 'clamp'
              }):0,
            },
          ],
          backgroundColor: finalColor,
          borderRadius:borderRadius
        }}
      />
    <Animated.View
      onLayout={event => {
        var { x, y, width, height } = event.nativeEvent.layout;
        this.setState({
          dimensions: { width, height },
          position: { x, y }
        });
      }}
      style={[
        {
          justifyContent: "center",
        },
      ]}
    >
      {this.props.children && (
        <View
          style={{
            position: "absolute",
            alignSelf: "center"
          }}
        >
          {React.cloneElement(this.props.children, { style: { ...this.props.textStyle} })}
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
            backgroundColor: iconColor,
            justifyContent: "center",
            alignItems: "center",
          }
        ]}
      >
        {icon}
        </Animated.View>
    </Animated.View>
    </View>
    );
  }
}

RNSliderIconButton.propTypes = propTypes;
RNSliderIconButton.defaultProps = defaultProps;