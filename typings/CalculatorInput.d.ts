import * as React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { CalculatorCommonProps } from './interface'
export interface CalculatorInputProps extends CalculatorCommonProps {
  /**
   * Called asynchronously before changes applied. Resolve with true if changes are accepted.
   */
  onBeforeChangeAsync?: (value: number, text: string) => Promise<boolean>
  /**
   * Called before changes applied. Return true if changes are accepted.
   */
  onBeforeChange?: (value: number, text: string) => boolean
  /**
   * Value change event.
   */
  onChange?: (value: number, text: string) => void
  /**
   * Modal animation type.
   */
  modalAnimationType?: 'none' | 'slide' | 'fade'
  /**
   * Style of modal backdrop.
   */
  modalBackdropStyle?: StyleProp<ViewStyle>
  /**
   * Text field container style.
   */
  fieldContainerStyle?: StyleProp<ViewStyle>
  /**
   * Text style.
   */
  fieldTextStyle?: StyleProp<TextStyle>
  /**
   * Prefix text.
   */
  prefix?: string
  /**
   * Suffix text.
   */
  suffix?: string
  /**
   * Placeholder text.
   */
  placeholder?: string
  /**
   * Disable editor.
   */
  disabled?: boolean
  /**
   * Text field container style.
   */
  fieldDisabledContainerStyle?: StyleProp<ViewStyle>
  /**
   * Text style.
   */
  fieldDisabledTextStyle?: StyleProp<TextStyle>
}
interface State {
  modalVisible: boolean
  value?: number
  text: string
  disabled: boolean
}
export declare class CalculatorInput extends React.Component<
  CalculatorInputProps,
  State
> {
  static defaultProps: Partial<CalculatorInputProps>
  static getDerivedStateFromProps(
    props: CalculatorInputProps,
    state: State
  ): Partial<State> | null
  constructor(props: CalculatorInputProps)
  componentDidUpdate(prevProps: CalculatorInputProps): null
  render(): JSX.Element
  renderTextField(): JSX.Element
  renderCalulatorModal(): JSX.Element
  calculatorModalToggle(): void
}
export {}
