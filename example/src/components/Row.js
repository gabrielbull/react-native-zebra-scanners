import * as React from 'react'
import { View, Text, Switch, TouchableOpacity, Modal, Picker } from 'react-native'

const Row = ({ label, details }) => (
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
        <Text style={{ flex: 1 }}>{label}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>{details}</View>
    </View>
)

export default Row
