import * as React from 'react'
import { View, FlatList, Text, ScrollView, Image, ActivityIndicator } from 'react-native'
import { Header, HeaderButton, ScannerAttribute, Button, SwitchRow, PickerRow, Row, IconButton } from '../components'
import { withRouter, withScanner } from '../containers'
import ZebraScanners, {
    RMD_ATTR_FRMWR_VERSION, RMD_ATTR_MFD, RMD_ATTR_MODEL_NUMBER, RMD_ATTR_SERIAL_NUMBER, 
    RMD_ATTR_VALUE_ACTION_LED_GREEN_ON, RMD_ATTR_VALUE_ACTION_LED_GREEN_OFF, RMD_ATTR_VALUE_ACTION_LED_RED_ON, 
    RMD_ATTR_VALUE_ACTION_LED_RED_OFF, RMD_ATTR_VALUE_ACTION_LED_YELLOW_ON, RMD_ATTR_VALUE_ACTION_LED_YELLOW_OFF
} from 'react-native-zebra-scanners'
import beepCodes from '../data/beepCodes'

class Scanner extends React.Component {
    state = {
        connecting: false,
        attributes: {},
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
        ZebraScanners.getScannerInfo(this.props.scanner.scanner_id, [RMD_ATTR_FRMWR_VERSION, RMD_ATTR_MFD, RMD_ATTR_MODEL_NUMBER, RMD_ATTR_SERIAL_NUMBER])
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

    handleBeepPress = () => {
        ZebraScanners.performBeeperAction(this.props.scanner.scanner_id, this.state.beepCode)
            .catch(err => alert(err))
    }

    handleGreenLedPress = () => {
        const greenLed = !this.state.led.green
        this.setState({ led: { ...this.state.led, green: greenLed } }, () => {
            let action = greenLed ? RMD_ATTR_VALUE_ACTION_LED_GREEN_OFF : RMD_ATTR_VALUE_ACTION_LED_GREEN_ON
            ZebraScanners.performLedAction(this.props.scanner.scanner_id, action)
                .catch(err => alert(err))
        })
    }

    handleYellowLedPress = () => {
        const yellowLed = !this.state.led.yellow
        this.setState({ led: { ...this.state.led, yellow: yellowLed } }, () => {
            let action = yellowLed ? RMD_ATTR_VALUE_ACTION_LED_YELLOW_OFF : RMD_ATTR_VALUE_ACTION_LED_YELLOW_ON
            ZebraScanners.performLedAction(this.props.scanner.scanner_id, action)
                .catch(err => alert(err))
        })
    }

    handleRedLedPress = () => {
        const redLed = !this.state.led.red
        this.setState({ led: { ...this.state.led, red: redLed } }, () => {
            let action = redLed ? RMD_ATTR_VALUE_ACTION_LED_RED_OFF : RMD_ATTR_VALUE_ACTION_LED_RED_ON
            ZebraScanners.performLedAction(this.props.scanner.scanner_id, action)
                .catch(err => alert(err))
        })
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
                {this.props.scanner.active ? this.renderBeeper() : null}
                {this.props.scanner.active ? this.renderLED() : null}
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
          elements.push(<ScannerAttribute key={prop} label={prop} value={this.state.attributes[prop]} />)
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
}

export default withRouter(withScanner(Scanner, (props) => props.router.state.scannerId ))
