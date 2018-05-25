import * as React from 'react'
import { View, FlatList, Text, ScrollView, Image } from 'react-native'
import { ScannersContext } from '../containers/Scanners'
import { Header, HeaderButton } from '../components'
import ZebraScanners from 'react-native-zebra-scanners'

class Help extends React.Component {
    state = {
        resetBarcode: null,
        btleSsiBarcode: null
      }
    
      componentDidMount() {
        ZebraScanners.getResetFactoryDefaultsBarcode({
          width: 259,
          height: 76
        })
          .then((data) => this.setState({ resetBarcode: data }))
          .catch(() => console.log('error'))
    
        ZebraScanners.getBtleSsiBarcode({
          width: 300,
          height: 100
        })
          .then((data) => this.setState({ btleSsiBarcode: data }))
          .catch(() => console.log('error'))
      }

  render () {
    const { resetBarcode, btleSsiBarcode } = this.state
    return (
        <View style={{ flex: 1 }}>
            <Header
                left={<HeaderButton to='/'>←</HeaderButton>}
            >
                Pair Help
            </Header>
            <ScrollView style={{ flex: 1, padding: 15 }}>
                <Text style={{ marginBottom: 20 }}>
                    1.  If previously paired, use Bluetooth Settings to unpair the LI/DS3678.
                </Text>
                <Text style={{ marginBottom: 20 }}>
                    2.  Scan the "Reset Factory Defaults" barcode below:
                </Text>
                
                <View style={{ width: '100%', height: 76, marginBottom: 20, alignItems: 'center' }}>
                {this.state.resetBarcode ? (
          <Image style={{width: 259, height: 76 }} source={{uri: `data:image/png;base64,${this.state.resetBarcode}`}}/>
        ) : null}
                </View>

                <Text style={{ marginBottom: 20 }}>
                    3.  Scan the "SSI BT LE" barcode below to pair:
                </Text>

                <View style={{ width: '100%', height: 76, marginBottom: 20, alignItems: 'center' }}>
                {this.state.btleSsiBarcode ? (
          <Image style={{width: 259, height: 76}} source={{uri: `data:image/png;base64,${this.state.btleSsiBarcode}`}}/>
        ) : null}
                        </View>

                <Text style={{ marginBottom: 20 }}>
                    4.  Enable Bluetooth on the device.
                </Text>
                <Text style={{ marginBottom: 20 }}>
                    5.  Go to the "Zebra Scanner Control" app's "Connect" screen and wait for the LI/DS3678 to appear in the list.
                </Text>
                <Text style={{ marginBottom: 20 }}>
                    6.  Tap the LI/DS3678 to initiate pairing.
                </Text>
                <Text style={{ marginBottom: 20 }}>
                    7.  Tap the "Pair" button when the "Bluetooth Pairing Request" prompt appears.
                </Text>
            </ScrollView>
        </View>                
    )
  }
}

export default Help
