// @flow
import * as React from 'react'
import { AsyncStorage } from 'react-native'
import ZebraScanners from 'react-native-zebra-scanners'

export const ScannersContext = React.createContext([])

class Scanners extends React.Component {
    state = {
        scanners: []
    }

    componentDidMount () {
        AsyncStorage.getItem('scanners', (error, result) => {
            if (!error) {
                try {
                    const scanners = JSON.parse(result)
                    if (scanners) this.setState({ scanners: JSON.parse(result) })
                } catch (err) {
                }
            }
        })
        ZebraScanners.addEventListener('SCANNER_APPEARED', this.handleScannerAppeared)
        ZebraScanners.addEventListener('SCANNER_DISAPPEARED', this.handleScannerDisappeared)    
    }

    componentWillUnmount() {
        ZebraScanners.removeEventListener('SCANNER_APPEARED', this.handleScannerAppeared)
        ZebraScanners.removeEventListener('SCANNER_DISAPPEARED', this.handleScannerDisappeared)
      }
    
      handleScannerAppeared = ({scanner}) => {
          const scannerIndex = this.state.scanners.findIndex(s => s.scanner_id === scanner.scanner_id)
          if (scannerIndex !== -1) {
              this.setState({ scanners: [
                  ...this.state.scanners.slice(0, scannerIndex),
                  { ...scanner, available: true },
                  ...this.state.scanners.slice(scannerIndex + 1)
              ]}, this.persistData)
          } else {
              this.setState({ scanners: [ ...this.state.scanners, scanner ] }, this.persistData)
          }
      }
      
      persistData = () => {
          AsyncStorage.setItem('scanners', JSON.stringify(this.state.scanners))
      }
    
      handleScannerDisappeared = ({scannerId}) => {
        const scannerIndex = this.state.scanners.findIndex(s => s.scanner_id === scanner.scanner_id)
        if (scannerIndex !== -1) {
            this.setState({ scanners: [
                ...this.state.scanners.slice(0, scannerIndex),
                { ...scanner, available: false, active: false },
                ...this.state.scanners.slice(scannerIndex + 1)
            ]}, this.persistData)
        }
      }
    
      render () {
          return (
              <ScannersContext.Provider value={this.state.scanners}>
                {this.props.children}
              </ScannersContext.Provider>
          )
      }
}

export default Scanners
