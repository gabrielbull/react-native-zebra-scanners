import React, { Component } from 'react';
import ZebraScanners from 'react-native-zebra-scanners'
import Scanners from './src/containers/Scanners'
import List from './src/screens/List'

export default class App extends Component {
  state = {
    resetBarcode: null,
    btleSsiBarcode: null
  }

  componentDidMount() {
    /*console.log(ZebraScanners)
        
    ZebraScanners.getResetFactoryDefaultsBarcode({
      width: 300,
      height: 100
    })
      .then((data) => this.setState({ resetBarcode: data }))
      .catch(() => console.log('error'))

    ZebraScanners.getBtleSsiBarcode({
      width: 300,
      height: 100
    })
      .then((data) => this.setState({ btleSsiBarcode: data }))
      .catch(() => console.log('error'))

    ZebraScanners.addEventListener('SCANNER_APPEARED', this.handleScannerAppeared)
    ZebraScanners.addEventListener('SCANNER_DISAPPEARED', this.handleScannerDisappeared)

    ZebraScanners.getScanners()
      .then(scanners => console.log(scanners))

    ZebraScanners.connect(1)
      .then(() => {
        ZebraScanners.getScanners()
          .then(scanners => console.log(scanners))  
      })
      .catch(err => console.log(err))*/
  }
  render() {
    return (
      <Scanners>
        <List />
      </Scanners>
    );
  }
}
