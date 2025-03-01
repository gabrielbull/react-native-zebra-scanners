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
        ZebraScanners.addEventListener('BARCODE_DATA_RECEIVED', this.handleBarcodeDataReceived)
    }

    componentDidLoad () {
        this.state.scanners.forEach(scanner => {
            if (scanner.active || scanner.auto_communication_session_reestablishment) this.connectScanner(scanner)
        })
    }

    componentWillUnmount() {
        ZebraScanners.removeEventListener('SCANNER_APPEARED', this.handleScannerAppeared)
        ZebraScanners.removeEventListener('SCANNER_DISAPPEARED', this.handleScannerDisappeared)
        ZebraScanners.removeEventListener('COMMUNICATION_SESSION_ESTABLISHED', this.handleCommunicationSessionEstablished)    
        ZebraScanners.removeEventListener('COMMUNICATION_SESSION_TERMINATED', this.handleCommunicationSessionTerminated)    
        ZebraScanners.removeEventListener('BARCODE_DATA_RECEIVED', this.handleBarcodeDataReceived)    
      }
    
      handleScannerAppeared = ({scanner}) => {
          const scannerIndex = this.state.scanners.findIndex(s => s.scanner_id === scanner.scanner_id)
          if (scannerIndex === -1) {
              this.setState({ scanners: [ ...this.state.scanners, scanner ] }, this.persistData)
          } else {
            scanner = this.updateScanner(scanner, { available: true })
          }
          if (scanner.active || scanner.auto_communication_session_reestablishment) {
            this.connectScanner(scanner)
          }
      }
          
      handleScannerDisappeared = ({scannerId}) => {
        scanner = this.updateScanner({ scanner_id: scannerId }, { available: false, active: false })
        if (scanner.auto_communication_session_reestablishment) {
            this.connectScanner(scanner)
        }
    }

      connectScanner = (scanner) => {
        ZebraScanners.connect(scanner.scanner_id)
            .catch((err) => {})
      }

    handleCommunicationSessionEstablished = ({scanner}) => {
        this.updateScanner(scanner, { available: true, active: true })
    }

    handleCommunicationSessionTerminated = ({scannerId}) => {
        this.updateScanner({ scanner_id: scannerId }, { active: false })
    }

    handleBarcodeDataReceived = ({ scannerId, barcodeData, barcodeType }) => {
        console.log(scannerId, barcodeData, barcodeType)
    }

    updateScanner = (scanner, data = null) => {
        if (data === null) data = scanner
      const scannerIndex = this.state.scanners.findIndex(s => s.scanner_id === scanner.scanner_id)
      if (scannerIndex !== -1) {
          scanner = { ...this.state.scanners[scannerIndex], ...scanner, ...data }
          this.setState({ scanners: [
              ...this.state.scanners.slice(0, scannerIndex),
              scanner,
              ...this.state.scanners.slice(scannerIndex + 1)
          ]}, this.persistData)
      }
      return scanner
    }

    persistData = () => {
        AsyncStorage.setItem('scanners', JSON.stringify(this.state.scanners))
    }

      render () {
          return (
              <ScannersContext.Provider value={{ scanners: this.state.scanners, updateScanner: this.updateScanner }}>
                {this.props.children}
              </ScannersContext.Provider>
          )
      }
}

export default Scanners
