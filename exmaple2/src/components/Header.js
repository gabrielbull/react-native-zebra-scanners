// @flow
import * as React from 'react'
import { View, Text } from 'react-native'

class Header extends React.Component {
  render () {
    const { children } = this.props
    return (
        <View style={{ height: 57, paddingTop: 20, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FD00FF' }}>
            <Text style={{ fontWeight: 'bold', color: '#550955', fontSize: 20 }}>
                {children}
            </Text>
        </View>
    )
  }
}

export default Header
