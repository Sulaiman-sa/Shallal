import React, { useEffect, useState } from 'react'

export const RootContext = React.createContext()

export default ({ children }) => {
  const prevAuth = window.localStorage.getItem('authenticated') || false
  const prevAuthBody = window.localStorage.getItem('authBody') || null
  const prevAuthMem = window.localStorage.getItem('authMem') || null
  const [authenticated, setAuthenticated] = useState(prevAuth)
  const [authMem, setAuthMem] = useState(prevAuthMem)
  const [authBody, setAuthBody] = useState(prevAuthBody)

  useEffect(() => {
    window.localStorage.setItem('authenticated', authenticated)
    window.localStorage.setItem('authBody', authBody)
    window.localStorage.setItem('authMem', authMem)
  }, [authenticated, authBody, authMem])

  const defaultContext = {
    authenticated,
    setAuthenticated,
    authBody,
    setAuthBody,
    authMem,
    setAuthMem
  }

  return (
    <RootContext.Provider value={defaultContext}>
      {children}
    </RootContext.Provider>
  )
}
