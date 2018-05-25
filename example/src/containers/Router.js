// @flow
import * as React from 'react'
import { AsyncStorage } from 'react-native'

export const RouterContext = React.createContext([])

class Router extends React.Component {
    static defaultProps = {
        defaultPath: '/'
    }

    state = {
        path: this.props.defaultPath
    }

    handleGo = (path) => {
        this.setState({ path })
    }

      render () {
          return (
              <RouterContext.Provider value={{
                  go: this.handleGo,
                  path: this.state.path
              }}>
                {this.props.children}
              </RouterContext.Provider>
          )
      }
}

export default Router
