// @flow
import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { RouterContext } from '../containers/Router'

class HeaderButton extends React.Component {
  render () {
    const { children, to } = this.props
    return (
        <RouterContext.Consumer>
            {(router) => (
                <TouchableOpacity onPress={() => router.go(to)}>
                <View>
                    <Text style={{ color: '#550955' }}>{children}</Text>
                </View>
            </TouchableOpacity>
        )}
        </RouterContext.Consumer>
    )
  }
}

export default HeaderButton
