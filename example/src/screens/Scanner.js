import * as React from 'react'
import { View, FlatList, Text, ScrollView, Image, ActivityIndicator } from 'react-native'
import { Header, HeaderButton, ScannerAttribute, Button } from '../components'
import { withRouter, withScanner } from '../containers'
import ZebraScanners, { RMD_ATTR_FRMWR_VERSION, RMD_ATTR_MFD, RMD_ATTR_MODEL_NUMBER, RMD_ATTR_SERIAL_NUMBER } from 'react-native-zebra-scanners'

class Scanner extends React.Component {
    state = {
        connecting: false,
        attributes: {}
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
                {this.renderAttributes()}
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
}

export default withRouter(withScanner(Scanner, (props) => props.router.state.scannerId ))
