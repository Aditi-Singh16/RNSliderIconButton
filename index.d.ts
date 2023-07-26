declare module 'react-native-slider-icon-button' {
    import { Component, ReactNode } from 'react';
    import { Animated } from 'react-native';

    interface RNSliderIconButtonProps {
        buttonSize: number;
        buttonColor?: string;
        onVerified: () => void;
        borderColor?: string;
        icon?: ReactNode;
        iconColor?: string;
        borderRadius?: number;
        disabled?: boolean;
        loading?: boolean;
        children?: ReactNode;
    }

    interface RNSliderIconButtonState {
        drag: Animated.ValueXY;
        moving: boolean;
        verify: boolean;
        percent: number;
        disabled: boolean;
        position: { x: number; y: number };
        dimensions: { width: number; height: number };
    }

    export default class RNSliderIconButton extends Component<RNSliderIconButtonProps, RNSliderIconButtonState> {
        constructor(props: RNSliderIconButtonProps);
        reset(): void;
    }
}
      