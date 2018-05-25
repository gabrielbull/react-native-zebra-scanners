import * as React from 'react'
import { withRouter } from '../containers'

class Route extends React.Component {
  render () {
    const { render, path, router } = this.props
    if (path === router.path) return render()
    return null
  }
}

export default withRouter(Route)
