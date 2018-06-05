import * as React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'

const IconButton = ({children, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
            <Text style={{ fontSize: 30 }}>{children}</Text>
        </View>
    </TouchableOpacity>                
)

export default IconButton
