// @flow
import * as React from 'react'
import { View, FlatList, Text } from 'react-native'
import { ScannersContext } from '../containers/Scanners'
import { Header, ScannerListItem, HeaderButton } from '../components'

class List extends React.Component {
  render () {
    const { children } = this.props
    return (
        <View style={{ flex: 1 }}>
            <Header
                right={<HeaderButton to='/help'>Pair Help</HeaderButton>}
            >
                Scanners
            </Header>
            <ScannersContext.Consumer>
                {(scanners) => scanners.length ? this.renderList() : this.renderPlaceholder()}
            </ScannersContext.Consumer>
        </View>                
    )
  }

  renderList () {
    return (
        <FlatList
            style={{ flex: 1 }}
            data={scanners}
            keyExtractor={(i) => i.scanner_id.toString()}
            renderItem={this.renderItem}
        />            
    )
  }

  renderPlaceholder () {
      return (
          <View style={{ flex: 1, padding: 100, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ marginBottom: 80, fontSize: 10, color: 'gray', textAlign: 'center' }}>No scanners found. Go to pair help to learn how to pair a scanner.</Text>
        </View>
      )
  }

  renderItem ({ item }) {
      return (
          <ScannerListItem scanner={item} />
      )
  }
}

export default List
