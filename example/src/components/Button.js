import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { withRouter } from '../containers'

class Button extends React.Component {
  render () {
    const { onPress, green, red, children } = this.props
    return (
        <TouchableOpacity onPress={onPress} style={{flex: 1}}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: green ? '#00FF83' : '#E13216',
                    height: 37,
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4
                }}
            >
                <View style={{ paddingLeft: 15, alignItems: 'flex-end' }}>
                    <Text numberOfLines={1} style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                        {children.toLocaleUpperCase()}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
  }
}

export default Button
