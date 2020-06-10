import * as React from 'react'
import { ScrollView, ScrollViewProps, StyleProp, ViewStyle } from 'react-native'

export type KeyboardViewProps = {
  children?: React.ReactNode,
  containerStyle?: StyleProp<ViewStyle>,
  bottomContainerStyle?: StyleProp<ViewStyle>,
  keyboardViewOffset?: number,
  renderBottomComponent?: () => React.ReactNode,
  scrollRef?: (ref: ScrollView) => void,
} & ScrollViewProps

export type KeyboardViewState = {
  keyboardHeight: number,
  showKeyboard: boolean,
  keyboardBlocked: boolean,
}

declare class KeyboardScrollView
  extends React.Component<KeyboardViewProps, KeyboardViewState> {
}