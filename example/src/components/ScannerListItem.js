import * as React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { withRouter } from '../containers'

class Component extends React.Component {
  render () {
    const { scanner, router } = this.props
    return (
        <TouchableHighlight onPress={() => router.go({ path: '/scanner', state: { scannerId: scanner.scanner_id } })} underlayColor='rgba(85, 9, 85, 0.2)'>
            <View
                style={{
                    height: 60,
                    borderBottomWidth: 1,
                    borderBottomColor: '#B1A5B1',
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={{ fontWeight: 'bold' }}>
                        {scanner.scanner_name}
                    </Text>
                </View>
                <View style={{ paddingLeft: 15, alignItems: 'flex-end' }}>
                    <Text style={{
                        fontSize: 10,
                        textAlign: 'right',
                        color: scanner.available ? 'green' : 'red',
                        paddingBottom: 4
                    }}>
                        {scanner.available ? '✅ Available' : '❌ Available'}
                    </Text>
                    <Text style={{
                        fontSize: 10,
                        textAlign: 'right',
                        color: scanner.active ? 'green' : 'red'
                    }}>
                        {scanner.active ? '✅ Active' : '❌ Active'}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    )
  }
}

export default withRouter(Component)
