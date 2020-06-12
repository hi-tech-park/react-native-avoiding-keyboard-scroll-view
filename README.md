
# react-native-keyboard-avoiding-scroll-view

![](https://s1.ax1x.com/2020/06/12/tLHpuj.gif)


## Getting started

`$ npm install react-native-keyboard-avoiding-scroll-view --save`

### Manual installation

#### iOS

#### Android
  	
1. Insert the following lines inside in `AndroidManifest.xml`:
  	```
    <activity
       android:windowSoftInputMode="stateAlwaysHidden|adjustResize">
  	```


## Usage
```javascript
import { KeyboardScrollView } from 'react-native-keyboard-avoiding-scroll-view'

// TODO: What to do with the module?
class A extends Component{
  render(){
    return (
      <KeyboardScrollView
        keyboardViewOffset={30}
        renderBottomComponent={() => <View/>}
      >
          // your layout
      </KeyboardScrollView>
    )
  }
}
```

## API
#### Props 

All the ScrollView props will be passed.

| Props                 | Type      | required | description                            |
| --------------------- | --------- | -------- | -------------------------------------- |
| containerStyle        | ViewStyle | no       | style of container                     |
| bottomContainerStyle  | ViewStyle | no       | style of  then fixed bottom            |
| keyboardViewOffset    | number    | no       | distance between keyboard and TexInput |
| renderBottomComponent | Function  | no       | the component of fixed bottom          |
| scrollRef             | ref       | no       | ref of scroll view                     |
  