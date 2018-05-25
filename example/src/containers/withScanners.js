import * as React from 'react'
import { ScannersContext } from '../containers/Scanners'

export default function withScanners (WrappedComponent) {
    return class extends React.Component {  
      render() {
        return (
          <ScannersContext.Consumer>
            {(scanners) => <WrappedComponent scanners={scanners} {...this.props} />}
          </ScannersContext.Consumer>
        );
      }
    };
}
