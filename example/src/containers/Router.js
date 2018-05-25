import * as React from 'react'
import { AsyncStorage } from 'react-native'

export const RouterContext = React.createContext([])

class Router extends React.Component {
    static defaultProps = {
        defaultPath: '/'
    }

    state = {
        path: this.props.defaultPath,
        state: undefined
    }

    handleGo = (path) => {
        if (typeof path === 'object') {
            this.setState({ path: path.path, state: path.state })
        } else {
            this.setState({ path, state: undefined })
        }
    }

      render () {
          return (
              <RouterContext.Provider value={{
                  go: this.handleGo,
                  path: this.state.path,
                  state: this.state.state
              }}>
                {this.props.children}
              </RouterContext.Provider>
          )
      }
}

export default Router
