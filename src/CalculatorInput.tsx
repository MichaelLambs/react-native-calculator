import * as React from 'react'
import {
  Dimensions,
  Modal,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'
import { Calculator } from './Calculator'
import { CalculatorCommonProps, DefaultCommonProps } from './interface'
import { formatNumber } from './utils'

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
  value: number
  text: string
  disabled: boolean
}

function propsToState(props: CalculatorInputProps): Partial<State> {
  const value = props.value
  return {
    value: props.value,
    text: (!!value || value === 0) ? formatNumber(value, props.decimalSeparator as string, props.thousandSeparator as string) : '',
    disabled: props.disabled
  }
}

export class CalculatorInput extends React.Component<
  CalculatorInputProps,
  State
> {
  static defaultProps: Partial<CalculatorInputProps> = {
    ...DefaultCommonProps,
    suffix: '',
    prefix: '',
    placeholder: ''
  }

  static getDerivedStateFromProps(
    props: CalculatorInputProps,
    state: State
  ): Partial<State> | null {
    if (props.value !== state.value) {
      return propsToState(props)
    }
    return null
  }

  constructor(props: CalculatorInputProps) {
    super(props)
    this.props = { props }
    this.calculatorModalToggle = this.calculatorModalToggle.bind(this)
    this.state = {
      ...(propsToState(props) as State),
      modalVisible: false
    }
  }

  static componentDidUpdate(prevProps: CalculatorInputProps) {
    console.log(this.props.value, 'componentDidUpdate - props')
    console.log(this.prevProps.value, 'componentDidUpdate - prevProps')
    if (this.props.value !== prevProps.value) {
      return propsToState(this.props)
    }
    return null
  }

  render() {
    return (
      <View
        onLayout={() => {
          if (this.state.modalVisible) {
            this.forceUpdate()
          }
        }}
      >
        {this.renderTextField()}
        {!this.state.disabled && this.renderCalulatorModal()}
      </View>
    )
  }

  renderTextField() {
    const {
      fieldContainerStyle,
      fieldTextStyle,
      fieldDisabledContainerStyle,
      fieldDisabledTextStyle,
      prefix,
      suffix,
      placeholder,
    } = this.props
    const { disabled, text } = this.state

    const renderText = () => (
      <Text
        style={[
          styles.text,
          fieldTextStyle,
          disabled ? fieldDisabledTextStyle : {}
        ]}
      >
        {(!!placeholder && !text) ? placeholder : prefix + text + suffix}
      </Text>
    )

    return (
      <View
        style={[
          styles.container,
          fieldContainerStyle,
          disabled ? fieldDisabledContainerStyle : {}
        ]}
      >
        {disabled ? (
          <View style={styles.innerContainer}>{renderText()}</View>
        ) : (
          <TouchableOpacity
            onPress={this.calculatorModalToggle}
            style={styles.innerContainer}
          >
            {renderText()}
          </TouchableOpacity>
        )}
      </View>
    )
  }

  renderCalulatorModal() {
    const {
      modalAnimationType,
      modalBackdropStyle,
      onBeforeChange,
      onBeforeChangeAsync,
      onChange
    } = this.props
    const dimension = Dimensions.get('window')

    const height = this.props.height || dimension.height - dimension.height / 3
    const width = this.props.width || dimension.width
    // Without this the layout will break on some android devices (e.g. galaxy tab)
    const style = { height };

    return (
      <Modal
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={this.calculatorModalToggle}
        animationType={modalAnimationType}
      >
        <TouchableWithoutFeedback
          onPress={this.calculatorModalToggle}
          style={styles.modalContainer}
        >
          <View style={[styles.backdrop, modalBackdropStyle]}>
            <Calculator
              hasAcceptButton
              onAccept={async (value, text) => {
                if (onBeforeChange) {
                  if (!onBeforeChange(value, text)) {
                    return
                  }
                }

                if (onBeforeChangeAsync) {
                  if (!(await onBeforeChangeAsync(value, text))) {
                    return
                  }
                }

                this.setState({ value, text }, () => {
                  if (onChange) {
                    onChange(value, text)
                  }
                  this.calculatorModalToggle()
                })
              }}
              {...this.props}
              value={this.state.value ? this.state.value : 0}
              height={height}
              width={width}
              style={style}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  calculatorModalToggle() {
    const { modalVisible } = this.state
    this.setState({ modalVisible: !modalVisible })
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    height: 24,
    margin: 10
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1
  }
})
