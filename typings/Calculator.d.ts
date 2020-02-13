import * as React from 'react'
import { LayoutRectangle, StyleProp, ViewStyle } from 'react-native'
import { Display } from './Display'
import { CalculatorCommonProps } from './interface'
declare enum ActionEnum {
  CLEAR = 0,
  DIVIDE = 1,
  MULTIPLY = 2,
  BACK = 3,
  MINUS = 4,
  PLUS = 5,
  ENTER = 6
}
declare enum StackKindEnum {
  NUMBER = 0,
  SIGN = 1
}
export interface CalculatorProps extends CalculatorCommonProps {
  /**
   * Show accept button after calculate.
   */
  hasAcceptButton?: boolean
  /**
   * Container style.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Calculate button click event.
   */
  onCalc?: (value: number, text: string) => void
  /**
   * Accept button click event.
   */
  onAccept?: (value: number, text: string) => void
  /**
   * Hide display text field.
   */
  hideDisplay?: boolean
}
interface State {
  text: string
  done: boolean
  btnSize?: ButtonSize
}
interface CalcStack {
  value: string
  kind: StackKindEnum
  text: string
  trailing: string
}
interface ButtonSize {
  width: number
  height: number
  displayHeight: number
}
export declare class Calculator extends React.Component<
  CalculatorProps,
  State
> {
  static defaultProps: Partial<CalculatorProps>
  calculated: boolean
  stacks: CalcStack[]
  display?: Display
  constructor(props: CalculatorProps)
  getButtonSize(window: LayoutRectangle): ButtonSize
  componentDidMount(): void
  render(): JSX.Element
  renderMain(): JSX.Element | null
  renderNumberButton(
    btnSize: ButtonSize,
    value: string,
    mostLeft?: boolean,
    scaleX?: number
  ): JSX.Element
  renderActionButton(
    btnSize: ButtonSize,
    value: string,
    action: ActionEnum,
    mostLeft?: boolean
  ): JSX.Element
  calculate(): void
  popStack(): void
  clear(value?: number): void
  setSign(sign: string): void
  setText(done?: boolean, callback?: () => void): void
  format(num: number): string
}
export {}
