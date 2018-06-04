import * as React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { withRouter } from '../containers'

class ScannerAttribute extends React.Component {
    get label () {
        switch(this.props.label) {
            case 'RMD_ATTR_MODEL_NUMBER': return 'Model Number'
            case 'RMD_ATTR_SERIAL_NUMBER': return 'Serial Number'
            case 'RMD_ATTR_MFD': return 'Manufacturing Date'
            case 'RMD_ATTR_FRMWR_VERSION': return 'Firmware Version'
        }
    }

  render () {
    const { value } = this.props
    return (
        <View
            style={{
                height: 30,
                borderBottomWidth: 1,
                borderBottomColor: '#B1A5B1',
                paddingHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 10 }}>
                    {this.label}
                </Text>
            </View>
            <View style={{ paddingLeft: 15, alignItems: 'flex-end' }}>
                <Text numberOfLines={1} style={{ fontSize: 10 }}>
                    {value}
                </Text>
            </View>
        </View>
    )
  }
}

export default ScannerAttribute
