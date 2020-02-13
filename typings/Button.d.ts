import * as React from 'react'
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native'
export interface ButtonProps {
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  text?: string
  onPress?: (event: GestureResponderEvent) => void
}
export declare class Button extends React.Component<ButtonProps> {
  render(): JSX.Element
}
