
# react-native-keyboardview

## Getting started

`$ npm install react-native-keyboardview --save`

### Mostly automatic installation

`$ react-native link react-native-keyboardview`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-keyboardview` and add `RNKeyboardview.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNKeyboardview.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.rn.keyboardview.RNKeyboardviewPackage;` to the imports at the top of the file
  - Add `new RNKeyboardviewPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-keyboardview'
  	project(':react-native-keyboardview').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-keyboardview/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-keyboardview')
  	```


## Usage
```javascript
import RNKeyboardview from 'react-native-keyboardview';

// TODO: What to do with the module?
RNKeyboardview;
```
  