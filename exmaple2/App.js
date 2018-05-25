import * as React from 'react';
import { Scanners, Router } from './src/containers'
import { Route } from './src/components'
import { List, Help } from './src/screens'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Scanners>
          <Route path='/' render={() => <List />} />
          <Route path='/help' render={() => <Help />} />
        </Scanners>
      </Router>
    );
  }
}

export default App
