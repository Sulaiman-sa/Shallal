import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Routes from './components/routing/Routes'
import Login from './components/Login'

const App = () => {
  return (
    <div className='container mt-4'>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </div>
  )
}

export default App
