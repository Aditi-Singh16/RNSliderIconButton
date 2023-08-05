RNSliderIconButton
=========

A component to swipe and verify which is compatible with low-end mobiles.

## Installation

  `npm install --save react-native-slider-icon-button` or
   `yarn add react-native-slider-icon-button`



```JSX
import React, { Component } from 'react';

import {
  View,
  TouchableOpacity, Text,
  Dimensions
} from 'react-native';


const { width } = Dimensions.get('window')

import RNSliderIconButton from 'react-native-slider-icon-button'

import LottieView from 'lottie-react-native';

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = { isUnlocked: false, isUploaded: false }

  }

  render() {


    const { isUnlocked, isUploaded } = this.state

    const lottieSizeIcon = isUploaded ? 60 : 40;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#fff', paddingBottom: 40 }}>


        {/** Lottie example */}
        <View style={{ marginTop: 20 }}>
          <RNSliderIconButton ref={ref => this.swipeVerify2 = ref}
            width={width - 50}
            buttonSize={60}
            buttonColor="#2962FF"
            borderColor="#2962FF"
            backgroundColor="#fff"
            textColor="#37474F"
            borderRadius={30}
            okButton={{ visible: true, duration: 400 }}
            onVerified={() => {
              this.setState({ isUploaded: true })
            }}
            icon={
              <View style={{ width: lottieSizeIcon, height: lottieSizeIcon }}>
                <LottieView
                  source={isUploaded ? require('./lottie_files/ready_to_upload.json') : require('./lottie_files/cloud_upload.json')}
                  autoPlay

                  resizeMode='contain'
                  loop={!isUploaded}
                />
              </View>
            }
          >

            <Text>{isUploaded ? 'UPLOADED' : 'slide to upload'}</Text>

          </RNSliderIconButton>
        </View>
        {/** end Lottie example */}






        <View style={{ marginTop: 20 }}>
          <RNSliderIconButton
            width={width - 50}
            loading={false}
            iconColor="#37474F"
            disabled={false}
            buttonSize={60}
            initialColor="#37474F"
            finalColor="#D50000"
            textStyle={}
            onVerified={() => {
              this.setState({ isUnlocked: true })
            }}
            icon={<Image source={isUnlocked ? require('./img/unlocked.png') : require('./img/locked.png')} style={{ width: 40, height: 40 }} />}
          >

            <Text>{isUnlocked ? 'UNLOCKED' : 'slide to unlock'}</Text>

          </RNSliderIconButton>
        </View>


        <TouchableOpacity onPress={() => {

          this.swipeVerify2.reset()
          this.swipeVerify3.reset()
          this.setState({ isUnlocked: false, isUploaded: false })
        }} style={{ marginTop: 30 }}>
          <Text style={{ padding: 10, color: '#f00', fontSize: 25 }}>RESET</Text>
        </TouchableOpacity>



      </View>
    );
  }
}
```


## Props
| name | type | default | description |
| --- | --- | --- | --- |
| **width** (required) | number | required | the width of swipe-verify |
| **buttonSize** (required) | number | required | the button (Icon) size of swipe-verify |
| **initialColor** (optional) | string | #D50000 | button background color towards the right |
| **finalColor** (optional) | string | #D50000 | button background color towards the left |
| **textStyle** (optional) | object | {} | text style for the text on the slider button |
| **icon** (optional) | component |  | see the example to more information |
| **borderColor** (optional) | string | #D50000 | border color |
| **borderRadius** (optional) | number | 0 | border radius to the button and container |
| **loading** (optional) | boolean | {true} | if ActivityIndicator is shown or not |
| **iconColor** (optional) | string | #D50000 | icon background color |
| **disabled** (optional) | boolean | {true} | if disabled or not |





## Callbacks

| name | arguments | notes |
| --- | --- | --- |
| **onVerified** (required) | bool | listener to check if the swipe is verified (user has completed swipe) |



## Methods

| name | arguments | notes |
| --- | --- | --- |
| **reset()** | none | reset the swipe-verify to default values |
