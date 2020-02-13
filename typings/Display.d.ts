import * as React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
interface State {
  size: number
  fixSize: number
  fixValue: string
  complete: boolean
  ready: boolean
  fontHeight: number
}
export interface DisplayProps {
  height: number
  width: number
  value: string
  style: StyleProp<TextStyle>
}
export declare class Display extends React.Component<DisplayProps, State> {
  _text?: Text | null
  _mounted: boolean
  constructor(props: DisplayProps)
  tryNewSize(force?: boolean): void
  isSizeOk(w: number, h: number): void
  componentDidMount(): void
  componentWillUnmount(): void
  componentDidUpdate(newProps: DisplayProps): void
  render(): JSX.Element
  renderIOS(): JSX.Element
  renderAndroid(): JSX.Element
}
export {}
