import * as React from 'react'
import { View, FlatList, Text, ScrollView, Image, ActivityIndicator } from 'react-native'
import { Header, HeaderButton, ScannerAttribute, Button, SwitchRow, PickerRow, Row, IconButton } from '../components'
import { withRouter, withScanner } from '../containers'
import ZebraScanners, {
    RMD_ATTR_FRMWR_VERSION, RMD_ATTR_MFD, RMD_ATTR_MODEL_NUMBER, RMD_ATTR_SERIAL_NUMBER, RMD_ATTR_BEEPER_VOLUME, RMD_ATTR_BEEPER_FREQUENCY,
    RMD_ATTR_VALUE_ACTION_LED_GREEN_ON, RMD_ATTR_VALUE_ACTION_LED_GREEN_OFF, RMD_ATTR_VALUE_ACTION_LED_RED_ON, 
    RMD_ATTR_VALUE_ACTION_LED_RED_OFF, RMD_ATTR_VALUE_ACTION_LED_YELLOW_ON, RMD_ATTR_VALUE_ACTION_LED_YELLOW_OFF,
    RMD_ATTR_VALUE_BEEPER_VOLUME_LOW, RMD_ATTR_VALUE_BEEPER_VOLUME_MEDIUM, RMD_ATTR_VALUE_BEEPER_VOLUME_HIGH,
    RMD_ATTR_VALUE_BEEPER_FREQ_LOW, RMD_ATTR_VALUE_BEEPER_FREQ_MEDIUM, RMD_ATTR_VALUE_BEEPER_FREQ_HIGH
} from 'react-native-zebra-scanners'
import beepCodes from '../data/beepCodes'

class Scanner extends React.Component {
    state = {
        connecting: false,
        attributes: {},
        enableScanning: true,
        enableAim: false,
        enableTrigger: false,
        beepCode: beepCodes[0].value,
        led: {
            green: false,
            yellow: false,
            red: false
        }
    }

    componentDidMount () {
        if (this.props.scanner.active) {
            this.updateScannerInfo()
        }
    }

    componentDidUpdate (prevProps) {
        if (!prevProps.scanner.active && this.props.scanner.active) {
            this.updateScannerInfo()
        }
    }

    updateScannerInfo () {
        ZebraScanners.getAttributes(this.props.scanner.scanner_id, [RMD_ATTR_FRMWR_VERSION, RMD_ATTR_MFD, RMD_ATTR_MODEL_NUMBER, RMD_ATTR_SERIAL_NUMBER, RMD_ATTR_BEEPER_VOLUME, RMD_ATTR_BEEPER_FREQUENCY])
            .then((attributes) => this.setState({ attributes }))
            .catch((err) => console.log(err))        
    }

    handleDisconnectPress = () => {
        this.setState({ connecting: true }, () => {
            ZebraScanners.disconnect(this.props.scanner.scanner_id)
                .then(() => {
                    this.setState({ connecting: false })
                })
                .catch((err) => {
                    this.setState({ connecting: false })
                    alert(err)
                })
        })
    }

    handleConnectPress = () => {
        this.setState({ connecting: true }, () => {
            ZebraScanners.connect(this.props.scanner.scanner_id)
                .then(() => {
                    this.setState({ connecting: false })
                })
                .catch((err) => {
                    this.setState({ connecting: false })
                    alert(err)
                })
        })
    }

    handleAutoReconnectOptionChange = () => {
        const autoReconnectOption = !this.props.scanner.auto_communication_session_reestablishment
        ZebraScanners.setAutoReconnectOption(this.props.scanner.scanner_id, autoReconnectOption)
            .then(() => {
                this.props.update({ auto_communication_session_reestablishment: autoReconnectOption })
            })
            .catch(err => alert(err))
    }

    handleEnableScanningChange = () => {
        const enableScanning = !this.state.enableScanning
        this.setState({ enableScanning })
        if (enableScanning) {
            ZebraScanners.performActionScanEnable(this.props.scanner.scanner_id).catch(err => alert(err))
        } else {
            ZebraScanners.performActionScanDisable(this.props.scanner.scanner_id).catch(err => alert(err))
        }
    }

    handleEnableAimChange = () => {
        const enableAim = !this.state.enableAim
        this.setState({ enableAim })
        if (enableAim) {
            ZebraScanners.performActionAimOn(this.props.scanner.scanner_id).catch(err => alert(err))
        } else {
            ZebraScanners.performActionAimOff(this.props.scanner.scanner_id).catch(err => alert(err))
        }
    }

    handleEnableTriggerChange = () => {
        const enableTrigger = !this.state.enableTrigger
        this.setState({ enableTrigger })
        if (enableTrigger) {
            ZebraScanners.performActionTriggerPull(this.props.scanner.scanner_id).catch(err => alert(err))
        } else {
            ZebraScanners.performActionTriggerRelease(this.props.scanner.scanner_id).catch(err => alert(err))
        }
    }

    handleBeeperVolumeChange = (value) => {
        this.setState({ attributes: { ...this.state.attributes, RMD_ATTR_BEEPER_VOLUME: value } })
        ZebraScanners.setAttribute(this.props.scanner.scanner_id, RMD_ATTR_BEEPER_VOLUME, value)
            .catch(err => alert(err))
    }

    handleBeeperFrequencyChange = (value) => {
        this.setState({ attributes: { ...this.state.attributes, RMD_ATTR_BEEPER_FREQUENCY: value } })
        ZebraScanners.setAttribute(this.props.scanner.scanner_id, RMD_ATTR_BEEPER_FREQUENCY, value)
            .catch(err => alert(err))
    }

    handleBeepPress = () => {
        ZebraScanners.performAction(this.props.scanner.scanner_id, this.state.beepCode)
            .catch(err => alert(err))
    }

    handleGreenLedPress = () => {
        const greenLed = !this.state.led.green
        this.setState({ led: { red: false, yellow: false, green: greenLed } }, () => {
            let action = greenLed ? RMD_ATTR_VALUE_ACTION_LED_GREEN_ON : RMD_ATTR_VALUE_ACTION_LED_GREEN_OFF
            ZebraScanners.performAction(this.props.scanner.scanner_id, action)
                .catch(err => alert(err))
        })
    }

    handleYellowLedPress = () => {
        const yellowLed = !this.state.led.yellow
        this.setState({ led: { green: false, red: false, yellow: yellowLed } }, () => {
            let action = yellowLed ? RMD_ATTR_VALUE_ACTION_LED_YELLOW_ON : RMD_ATTR_VALUE_ACTION_LED_YELLOW_OFF
            ZebraScanners.performAction(this.props.scanner.scanner_id, action)
                .catch(err => alert(err))
        })
    }

    handleRedLedPress = () => {
        const redLed = !this.state.led.red
        this.setState({ led: { green: false, yellow: false, red: redLed } }, () => {
            let action = redLed ? RMD_ATTR_VALUE_ACTION_LED_RED_ON : RMD_ATTR_VALUE_ACTION_LED_RED_OFF
            ZebraScanners.performAction(this.props.scanner.scanner_id, action)
                .catch(err => alert(err))
        })
    }

    handleVibrationFeedbackPress = () => {
        ZebraScanners.performActionVibrationFeedback(this.props.scanner.scanner_id).catch(err => alert(err))
    }

    render () {
      const { scanner } = this.props
    return (
        <View style={{ flex: 1 }}>
            <Header
                left={<HeaderButton to='/'>←</HeaderButton>}
            >
                {scanner.scanner_name}
            </Header>
            <ScrollView style={{ flex: 1 }}>
                {this.renderConnect()}
                {this.props.scanner.active ? this.renderAttributes() : null}
                {this.props.scanner.active ? this.renderReconnectOption() : null}
                {this.props.scanner.active ? this.renderScanning() : null}
                {this.props.scanner.active ? this.renderAim() : null}
                {this.props.scanner.active ? this.renderTrigger() : null}
                {this.props.scanner.active ? this.renderBeeperVolume() : null}
                {this.props.scanner.active ? this.renderBeeperFrequency() : null}
                {this.props.scanner.active ? this.renderBeeper() : null}
                {this.props.scanner.active ? this.renderLED() : null}
                {this.props.scanner.active ? this.renderVibrationFeedback() : null}
            </ScrollView>
        </View>                            
    )
  }

  renderConnect () {
    return (
        <View style={{ paddingHorizontal: 40, paddingVertical: 15, height: 37 + 15 + 15, width: '100%', alignContent: 'center', justifyContent: 'center', flexDirection: 'row' }}>
          {this.state.connecting ? (<ActivityIndicator size='small' />) : (
              this.props.scanner.active 
                ? <Button red onPress={this.handleDisconnectPress}>Disconnect</Button>
                : <Button green onPress={this.handleConnectPress}>Connect</Button>
          )}
        </View>  
    )
  }

  renderAttributes () {
      const elements = []
      for (let prop in this.state.attributes) {
        if (this.state.attributes.hasOwnProperty(prop)) {
            if (prop !== 'RMD_ATTR_BEEPER_VOLUME' && prop !== 'RMD_ATTR_BEEPER_FREQUENCY') {
                elements.push(<ScannerAttribute key={prop} label={prop} value={this.state.attributes[prop]} />)
            }
        }
      }
      return elements
  }

    renderReconnectOption () {
        return (
            <SwitchRow
                 label='Auto Reconnect Option'
                 value={this.props.scanner.auto_communication_session_reestablishment}
                 onValueChange={this.handleAutoReconnectOptionChange}
            />
        )
    }

    renderScanning () {
        return (
            <SwitchRow
                 label='Enable scanning'
                 value={this.state.enableScanning}
                 onValueChange={this.handleEnableScanningChange}
            />
        )
    }

    renderAim () {
        return (
            <SwitchRow
                 label='Enable AIM'
                 value={this.state.enableAim}
                 onValueChange={this.handleEnableAimChange}
            />
        )
    }

    renderTrigger () {
        return (
            <SwitchRow
                 label='Enable Trigger'
                 value={this.state.enableTrigger}
                 onValueChange={this.handleEnableTriggerChange}
            />
        )
    }

    renderBeeperVolume () {
        if (typeof this.state.attributes.RMD_ATTR_BEEPER_VOLUME === 'undefined') return null
        return (
            <PickerRow
                 label='Beeper Volume'
                 items={[
                     { label: 'Low', value: RMD_ATTR_VALUE_BEEPER_VOLUME_LOW },
                     { label: 'Medium', value: RMD_ATTR_VALUE_BEEPER_VOLUME_MEDIUM },
                     { label: 'High', value: RMD_ATTR_VALUE_BEEPER_VOLUME_HIGH }
                 ]}
                 selectedValue={parseInt(this.state.attributes.RMD_ATTR_BEEPER_VOLUME)}
                 onValueChange={this.handleBeeperVolumeChange}
            />
        )
    }

    renderBeeperFrequency () {
        if (typeof this.state.attributes.RMD_ATTR_BEEPER_FREQUENCY === 'undefined') return null
        return (
            <PickerRow
                 label='Beeper Frequency'
                 items={[
                     { label: 'Low', value: RMD_ATTR_VALUE_BEEPER_FREQ_LOW },
                     { label: 'Medium', value: RMD_ATTR_VALUE_BEEPER_FREQ_MEDIUM },
                     { label: 'High', value: RMD_ATTR_VALUE_BEEPER_FREQ_HIGH }
                 ]}
                 selectedValue={parseInt(this.state.attributes.RMD_ATTR_BEEPER_FREQUENCY)}
                 onValueChange={this.handleBeeperFrequencyChange}
            />
        )
    }

    renderBeeper () {
        return (
            <PickerRow
                 label='Beeper'
                 items={beepCodes}
                 selectedValue={this.state.beepCode}
                 onValueChange={(beepCode) => this.setState({ beepCode })}
                 actionLabel='🔔'
                 onActionPress={this.handleBeepPress}
            />
        )
    }

    renderLED () {
        return (
            <Row
                 label='LED'
                 details={(
                    <React.Fragment>
                        <IconButton onPress={this.handleGreenLedPress}>✳️</IconButton>
                        <IconButton onPress={this.handleYellowLedPress}>✴️</IconButton>
                        <IconButton onPress={this.handleRedLedPress}>🅾️</IconButton>
                    </React.Fragment>
                 )}
            />
        )
    }

    renderVibrationFeedback () {
        return (
            <Row
                 label='Vibration Feedback'
                 details={(
                    <React.Fragment>
                        <IconButton onPress={this.handleVibrationFeedbackPress}>🌀</IconButton>
                    </React.Fragment>
                 )}
            />
        )
    }
}

export default withRouter(withScanner(Scanner, (props) => props.router.state.scannerId ))
