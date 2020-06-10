import {
  EmitterSubscription,
  Keyboard,
  KeyboardEventListener,
  KeyboardEventName,
  Platform, StatusBar, TextInput, UIManager,
} from 'react-native'


const enum LISTEN_KEY {
  HIDE = 'hide',
  SHOW = 'show',
}

export function getListenKey(key: LISTEN_KEY): KeyboardEventName {
  if (key === LISTEN_KEY.HIDE) {
    if (Platform.OS === 'ios') {
      return 'keyboardWillHide'
    }
    return 'keyboardDidHide'
  }

  if (Platform.OS === 'ios') {
    return 'keyboardWillShow'
  }
  return 'keyboardDidShow'
}

export function showListener(listener: KeyboardEventListener): EmitterSubscription {
  return Keyboard.addListener(
    getListenKey(LISTEN_KEY.SHOW),
    listener
  )
}

export function hideListener(listener: KeyboardEventListener): EmitterSubscription {
  return Keyboard.addListener(
    getListenKey(LISTEN_KEY.HIDE),
    listener
  )
}

export function getFocusId() {
  return TextInput.State.currentlyFocusedField()
}

export function blurCurrentTextInput() {
  const id = getFocusId()
  id && TextInput.State.blurTextInput(id)
}

export function calculateOffsetInWindow(
  inputHeight: number, inputY: number, bottomHeight: number,
  keyboardScreenY: number, keyboardViewOffset: number) {
  const inputBottomPosition = Platform.select({
    ios: inputY + inputHeight,
    android: inputY + StatusBar.currentHeight + inputHeight,
  })
  const keyboardViewTopPosition = keyboardScreenY - keyboardViewOffset - bottomHeight
  return inputBottomPosition - keyboardViewTopPosition
}

export async function measure(
  bottomHeight: number,
  keyboardViewOffset: number,
  keyboardScreenY: number,
  successCallBack?: (offset: number) => void
) {
  const focusNode = getFocusId()
  await focusNode && UIManager.measureInWindow(
    focusNode,
    async (x: number, y: number, width: number, height: number) => {
      const offset = calculateOffsetInWindow(
        height,
        y,
        bottomHeight,
        keyboardScreenY,
        keyboardViewOffset
      )
      successCallBack(offset)
    }
  )
}