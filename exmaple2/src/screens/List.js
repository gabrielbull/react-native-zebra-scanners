// @flow
import * as React from 'react'
import { View, FlatList } from 'react-native'
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
                {(scanners) => (
                    <FlatList
                        style={{ flex: 1 }}
                        data={[{
                            active: false,
                            auto_communication_session_reestablishment: false,
                            available: true,
                            connection_type: 1,
                            scanner_id: 1,
                            scanner_model: 2,
                            scanner_name: 'hdfh934h498h9h498h39hfiub3iufb34icbh ierugv ierugv iuerg viuerg iugiub4iu3'                    
                        }]}
                        keyExtractor={(i) => i.scanner_id.toString()}
                        renderItem={this.renderItem}
                    />            
                )}
            </ScannersContext.Consumer>
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
