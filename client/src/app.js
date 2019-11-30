import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Routes from './components/routing/Routes'
import Login from './components/Login'
import RootContext from './components/auth/RootContext'

const App = () => {
  return (
    <div className='container mt-4'>
      <RootContext>
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route component={Routes} />
          </Switch>
        </Router>
      </RootContext>
    </div>
  )
}

export default App
