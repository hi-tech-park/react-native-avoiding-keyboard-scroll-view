
# react-native-keyboardview

![](https://i.niupic.com/images/2020/06/12/8gaw.gif)


## Getting started

`$ npm install react-native-keyboardview --save`

### Mostly automatic installation

`$ react-native link react-native-keyboardview`

### Manual installation


#### iOS

#### Android

1. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-keyboardview'
  	project(':react-native-keyboardview').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-keyboardview/android')
  	```
2. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-keyboardview')
  	```
  	
3. Insert the following lines inside in `AndroidManifest.xml`:
  	```
    <activity
       android:windowSoftInputMode="stateAlwaysHidden|adjustResize">
  	```


## Usage
```javascript
import { KeyboardScrollView } from 'react-native-keyboardview'

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
  