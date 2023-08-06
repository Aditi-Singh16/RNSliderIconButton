// index.d.ts

import React, { ReactNode, Component } from "react";
import { Animated, ViewStyle } from "react-native";

export interface RNSliderIconButtonProps {
  children?: ReactNode;
  buttonSize: number;
  initialColor?: string;
  finalColor?: string;
  textStyle?: object;
  onVerified: () => void;
  icon?: ReactNode;
  iconColor?: string;
  borderRadius?: number;
  disabled?: boolean;
  loading?: boolean;
}

export interface RNSliderIconButtonState {
  drag: Animated.ValueXY;
  moving: boolean;
  verify: boolean;
  percent: number;
  disabled: boolean;
  position: { x: number; y: number };
  dimensions: { width: number; height: number };
}

declare class RNSliderIconButton extends Component<RNSliderIconButtonProps, RNSliderIconButtonState> {
  constructor(props: RNSliderIconButtonProps);
  render(): JSX.Element;
}

export default RNSliderIconButton;
