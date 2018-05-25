import * as React from 'react'
import { View, FlatList, Text, ScrollView, Image } from 'react-native'
import { Header, HeaderButton } from '../components'
import { withRouter, withScanner } from '../containers'
import ZebraScanners from 'react-native-zebra-scanners'

class Scanner extends React.Component {
    componentDidMount () {
        ZebraScanners.connect(this.props.scanner.scanner_id)
    }

    componentWillUnmount () {
        ZebraScanners.disconnect(this.props.scanner.scanner_id)
    }

  render () {
      const { scanner } = this.props
    return (
        <View style={{ flex: 1 }}>
            <Header
                left={<HeaderButton to='/'>←</HeaderButton>}
            >
                {scanner.scanner_name}
            </Header>
        </View>                            
    )
  }
}

export default withRouter(withScanner(Scanner, (props) => props.router.state.scannerId ))
