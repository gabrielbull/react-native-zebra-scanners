// @flow
import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

class Header extends React.Component {
  render () {
    const { children, left, right } = this.props
    return (
        <View style={{ height: 57, paddingTop: 20, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FD00FF', flexDirection: 'row' }}>
            <View style={{ position: 'absolute', top: 20, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', color: '#550955', fontSize: 20 }}>
                    {children}
                </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: 15 }}>
                {left}
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 15 }}>
                {right}
            </View>
        </View>
    )
  }
}

export default Header
