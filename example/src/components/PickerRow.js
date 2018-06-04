import * as React from 'react'
import { View, Text, Switch, TouchableOpacity, Modal, Picker } from 'react-native'

class PickerRow extends React.Component {
    state = {
        showPicker: false
    }

    handlePickerPress = () => {
        this.setState({ showPicker: true })
    }

    handleCloseModalRequest = () => {
        this.setState({ showPicker: false })
    }

    selectValueLabel = () => {
        const selectedItem = this.props.items.find(i => i.value === this.props.selectedValue)
        if (selectedItem) return selectedItem.label
        return ''
    }

  render () {
    const { label, selectedValue, actionLabel, onActionPress } = this.props

    return (
        <React.Fragment>
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
                <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={this.handlePickerPress}>
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                        <Text style={{ flex: 1 }}>{label}</Text>
                        <Text>{this.selectValueLabel()}</Text>
                    </View>
                </TouchableOpacity>
                {actionLabel && onActionPress ? (
                    <TouchableOpacity>
                        <View style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                            <Text style={{ fontSize: 30 }}>{actionLabel}</Text>
                        </View>
                    </TouchableOpacity>                
                ) : null}
            </View>
            {this.renderPickerModal()}
        </React.Fragment>
    )
  }

  renderPickerModal () {
      return (
          <Modal
              animationType="slide"
              visible={this.state.showPicker}
              onRequestClose={this.handleCloseModalRequest}
            >
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Picker
                        selectedValue={this.props.selectedValue}
                        style={{ height: 300, width: '100%' }}
                        onValueChange={this.props.onValueChange}
                    >
                        {this.props.items.map(item => (
                            <Picker.Item key={item.value.toString()} label={item.label} value={item.value} />
                        ))}
                    </Picker>
                    <TouchableOpacity onPress={this.handleCloseModalRequest} style={{ position: 'absolute', top: 50, right: 15 }}>
                        <View>
                            <Text style={{ fontSize: 30 }}>❌</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
      )
  }
}

export default PickerRow
