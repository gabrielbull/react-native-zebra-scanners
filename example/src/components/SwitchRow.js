import * as React from 'react'
import { View, Text, Switch } from 'react-native'

const SwitchRow = ({ label, value, onValueChange }) => (
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
        <Switch value={value} onValueChange={onValueChange} />
    </View>
)

export default SwitchRow
