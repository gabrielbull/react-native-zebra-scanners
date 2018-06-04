import * as React from 'react'
import { ScannersContext } from '../containers/Scanners'

export default function withScanner (WrappedComponent, getScannerId) {
    return class extends React.Component {
      handleUpdate = (scanner, updateScanner, data) => {
        updateScanner(scanner, data)
      }

      render() {
        const scannerId = getScannerId(this.props)
        return (
          <ScannersContext.Consumer>
            {({ scanners, updateScanner }) => (
              <WrappedComponent
                scanner={scanners.find(s => s.scanner_id === scannerId)}
                update={(data) => this.handleUpdate(scanners.find(s => s.scanner_id === scannerId), updateScanner, data)}
                {...this.props}
              />
            )}
          </ScannersContext.Consumer>
        );
      }
    };
}
