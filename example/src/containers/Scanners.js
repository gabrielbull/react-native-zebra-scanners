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
                    if (scanners) this.setState({ scanners: JSON.parse(result) }, this.componentDidLoad)
                } catch (err) {
                }
            }
        })
        ZebraScanners.addEventListener('SCANNER_APPEARED', this.handleScannerAppeared)
        ZebraScanners.addEventListener('SCANNER_DISAPPEARED', this.handleScannerDisappeared)    
        ZebraScanners.addEventListener('COMMUNICATION_SESSION_ESTABLISHED', this.handleCommunicationSessionEstablished)    
        ZebraScanners.addEventListener('COMMUNICATION_SESSION_TERMINATED', this.handleCommunicationSessionTerminated)
    }

    componentDidLoad () {
        this.state.scanners.forEach(scanner => {
            if (scanner.active) {
                ZebraScanners.connect(scanner.scanner_id)
                    .catch(() => {
                        this.handleScannerDisappeared({ scannerId: scanner.scanner_id })
                    })
            }
        })
    }

    componentWillUnmount() {
        ZebraScanners.removeEventListener('SCANNER_APPEARED', this.handleScannerAppeared)
        ZebraScanners.removeEventListener('SCANNER_DISAPPEARED', this.handleScannerDisappeared)
        ZebraScanners.removeEventListener('COMMUNICATION_SESSION_ESTABLISHED', this.handleCommunicationSessionEstablished)    
        ZebraScanners.removeEventListener('COMMUNICATION_SESSION_TERMINATED', this.handleCommunicationSessionTerminated)    
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
          
      handleScannerDisappeared = ({scannerId}) => {
        const scannerIndex = this.state.scanners.findIndex(s => s.scanner_id === scannerId)
        if (scannerIndex !== -1) {
            this.setState({ scanners: [
                ...this.state.scanners.slice(0, scannerIndex),
                { ...this.state.scanners[scannerIndex], available: false, active: false },
                ...this.state.scanners.slice(scannerIndex + 1)
            ]}, this.persistData)
        }
      }

    persistData = () => {
        AsyncStorage.setItem('scanners', JSON.stringify(this.state.scanners))
    }

    handleCommunicationSessionEstablished = ({scanner}) => {
        const index = this.state.scanners.findIndex(s => s.scanner_id === scanner.scanner_id)
        let scanners
        if (index !== -1) {
            scanners = [
                ...this.state.scanners.slice(0, index),
                scanner,
                ...this.state.scanners.slice(index + 1)
            ]
        } else {
            scanners = [...this.state.scanners, scanner]
        }
        this.setState({ scanners }, this.persistData)
    }

    handleCommunicationSessionTerminated = ({scannerId}) => {
        const index = this.state.scanners.findIndex(s => s.scanner_id === scannerId)
        if (index !== -1) {
            let scanners = [
                ...this.state.scanners.slice(0, index),
                { ...this.state.scanners[index], active: false },
                ...this.state.scanners.slice(index + 1)
            ]
            this.setState({ scanners }, this.persistData)
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
