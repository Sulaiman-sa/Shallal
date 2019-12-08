import React, { Fragment, useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { RootContext } from './auth/RootContext'
import { useInputChange } from '../utils/hooks'

import axios from 'axios'

const Login = props => {
  const [input, handleInputChange] = useInputChange()
  const [error, setError] = useState(false)

  const submitForm = (e, context) => {
    e.preventDefault()
    const auth = {
      Email: input.email,
      Password: input.password
    }
    console.log(auth)
    axios
      .post('/auth', auth)
      .then(res => {
        if (res.data[0]) {
          console.log(res.data[0].EID)
          context.setAuthMem(res.data[0].EID)
          axios.post('/authType', res.data[0]).then(res => {
            console.log(res.data)
            if (res.data[0].ETID === 2) {
              context.setAuthenticated(true)
              context.setAuthBody('Manager')
              props.history.push(`/Manager`)
            } else {
              console.log(res.data[0])
              context.setAuthenticated(true)
              context.setAuthBody('Cashier')
              props.history.push(`/Cashier`)
            }
          })
        } else {
          setError(true)
          setTimeout(() => {
            setError(false)
          }, 200)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  console.log(localStorage)
  if (localStorage.authenticated === 'true') {
    props.history.push(`/${localStorage.authBody}`)
    return <Fragment>fsd</Fragment>
  } else {
    console.log(error)
    return (
      <RootContext.Consumer>
        {context => (
          <Fragment>
            {error && alert('Your email or password is invalid.')}
            <h2>Please Login</h2>
            <Form onSubmit={e => submitForm(e, context)}>
              <FormGroup>
                <Label for='exampleEmail'>Email</Label>
                <Input
                  onChange={handleInputChange}
                  type='email'
                  name='email'
                  id='exampleEmail'
                  placeholder='Please Enter your email'
                />
              </FormGroup>
              <FormGroup>
                <Label for='examplePassword'>Password</Label>
                <Input
                  onChange={handleInputChange}
                  type='password'
                  name='password'
                  id='examplePassword'
                  placeholder='Please Enter your password'
                />
              </FormGroup>
              <Button type='submit' value='Submit'>
                Submit
              </Button>
            </Form>
          </Fragment>
        )}
      </RootContext.Consumer>
    )
  }
}
export default Login
