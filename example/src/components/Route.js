// @flow
import * as React from 'react'
import { RouterContext } from '../containers/Router'

class Route extends React.Component {
  render () {
    const { render, path } = this.props
    return (
      <RouterContext.Consumer>
        {(router) => {
          if (path === router.path) return render()
          return null
        }}
      </RouterContext.Consumer>
    )
  }
}

export default Route
