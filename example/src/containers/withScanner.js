import * as React from 'react'
import { ScannersContext } from '../containers/Scanners'

export default function withScanner (WrappedComponent, getScannerId) {
    return class extends React.Component {  
      render() {
        console.log(this.props)
        const scannerId = getScannerId(this.props)
        return (
          <ScannersContext.Consumer>
            {(scanners) => <WrappedComponent scanner={scanners.find(s => s.scanner_id === scannerId)} {...this.props} />}
          </ScannersContext.Consumer>
        );
      }
    };
}
