import * as React from 'react'
import { RouterContext } from '../containers/Router'

export default function withRouter (WrappedComponent) {
    return class extends React.Component {  
      render() {
        return (
          <RouterContext.Consumer>
            {(router) => <WrappedComponent router={router} {...this.props} />}
          </RouterContext.Consumer>
        );
      }
    };
}
