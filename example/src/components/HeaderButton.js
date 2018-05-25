import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { withRouter } from '../containers'

class HeaderButton extends React.Component {
  render () {
    const { children, to, router } = this.props
    return (
        <TouchableOpacity onPress={() => router.go(to)}>
            <View>
                <Text style={{ color: '#550955' }}>{children}</Text>
            </View>
        </TouchableOpacity>
    )
  }
}

export default withRouter(HeaderButton)
