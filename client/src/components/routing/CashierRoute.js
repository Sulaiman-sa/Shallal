import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { RootContext } from '../../components/auth/RootContext'
export default ({ render, component: Component, ...routeProps }) => {
  const { authenticated, authBody } = useContext(RootContext)
  return (
    <Route
      {...routeProps}
      render={props =>
        authenticated && authBody === 'Cashier' ? (
          <Component {...props} />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  )
}
