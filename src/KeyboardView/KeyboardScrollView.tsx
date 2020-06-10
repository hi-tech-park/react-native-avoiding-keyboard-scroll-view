import React, { Component } from 'react'
import {
  EmitterSubscription,
  KeyboardEvent, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent,
  Platform, ScrollView,
  View,
} from 'react-native'
import _ from 'lodash'
import {
  blurCurrentTextInput,
  hideListener, measure,
  showListener,
} from './KeyboardUtil'
import { KeyboardViewProps, KeyboardViewState } from '../../index'

export default class KeyboardView extends Component<KeyboardViewProps, KeyboardViewState> {

  private _hideListener?: EmitterSubscription
  private _showListener?: EmitterSubscription
  private _scrollView?: ScrollView
  private _contentOffset = 0
  private _lastContentOffset = 0
  private _isScroll = false
  private _contentHeight = 0
  private _bottomHeight = 0

  state: KeyboardViewState = {
    keyboardHeight: 0,
    showKeyboard: false,
    keyboardBlocked: false,
  }

  static defaultProps = {
    verticalOffset: 0,
  }

  get iosAddPadding() {
    return this.state.showKeyboard && Platform.OS === 'ios'
  }

  get androidAddPadding() {
    return this.state.keyboardBlocked && Platform.OS === 'android'
  }

  componentDidMount() {
    blurCurrentTextInput()
    this._showListener = showListener(this.handleKeyboardShow)
    this._hideListener = hideListener(this.handleKeyboardHide)
  }

  componentWillUnmount() {
    this._showListener && this._showListener.remove()
    this._hideListener && this._hideListener.remove()
  }

  scroll = (position: number) => {

    if (_.isEmpty(this._scrollView)) {
      return
    }

    if (position <= 0) {
      return this._scrollView.scrollTo({ y: 0 })
    }

    if (position >= this._contentHeight) {
      return this._scrollView.scrollToEnd()
    }

    return this._scrollView.scrollTo({ y: position })
  }

  toScroll = (event: KeyboardEvent, lastOffset: number) => {
    measure(
      this._bottomHeight,
      this.props.keyboardViewOffset,
      event.endCoordinates.screenY,
      (offset: number) => {
        if (offset > 0) {
          this.setState({ keyboardBlocked: true })
          Platform.OS === 'ios' && this.scroll(lastOffset + offset)
        }
      }
    )
  }

  handleScrollRef = (ref: ScrollView) => {
    const { scrollRef } = this.props
    this._scrollView = ref
    if (_.isFunction(scrollRef)) {
      scrollRef(ref)
    }
  }

  handleKeyboardHide = async () => {
    await this.setState({
      showKeyboard: false,
      keyboardBlocked: false,
    })
    await blurCurrentTextInput()
    requestAnimationFrame(() => this.scroll(this._lastContentOffset))
  }

  handleKeyboardShow = async (event: KeyboardEvent) => {
    if (!this._isScroll) {
      try {
        this._isScroll = true
        this._lastContentOffset = this._contentOffset
        this.setState({ showKeyboard: true })
        await this.toScroll(event, this._contentOffset)
        const keyboardHeight = event.endCoordinates.height
        if (this.state.keyboardHeight != keyboardHeight) {
          this.setState({ keyboardHeight })
        }
      } finally {
        this._isScroll = false
      }
    }
  }

  handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { onScroll } = this.props
    this._contentOffset = event.nativeEvent.contentOffset.y
    if (_.isFunction(onScroll)) {
      onScroll(event)
    }
  }

  handleContentSizeChange = (contentWidth: number, contentHeight: number) => {
    const { onContentSizeChange } = this.props
    this._contentHeight = contentHeight
    if (_.isFunction(onContentSizeChange)) {
      onContentSizeChange(contentWidth, contentHeight)
    }
  }

  handleBottomLayout = (event: LayoutChangeEvent) => {
    this._bottomHeight = event.nativeEvent.layout.height
  }

  renderFixBottom = () => {
    const { renderBottomComponent, bottomContainerStyle } = this.props
    if (_.isFunction(renderBottomComponent)) {
      return (
        <View onLayout={this.handleBottomLayout} style={bottomContainerStyle}>
          {renderBottomComponent()}
        </View>
      )
    }
  }

  render() {
    const {
      children,
      containerStyle,
      scrollEventThrottle,
      contentContainerStyle,
      keyboardViewOffset,
      ...resetProps
    } = this.props
    const { keyboardHeight } = this.state
    return (
      <View style={[
        containerStyle,
        this.iosAddPadding && { paddingBottom: keyboardHeight },
      ]}
      >
        <ScrollView
          {...resetProps}
          ref={this.handleScrollRef}
          onScroll={this.handleScroll}
          scrollEventThrottle={scrollEventThrottle ? scrollEventThrottle : 1}
          onContentSizeChange={this.handleContentSizeChange}
          contentContainerStyle={[
            contentContainerStyle,
            this.androidAddPadding && { bottom: keyboardViewOffset },
          ]}
        >
          { children }
        </ScrollView>
        {this.renderFixBottom()}
      </View>
    )
  }
}
