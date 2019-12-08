import React, { Fragment, useEffect, useState } from 'react'

import { useInputChange } from '../../utils/hooks'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'

const InsertC = props => {
  useEffect(() => {
    axios
      .get('http://localhost:3000/employeeID')
      .then(res => {
        setID(res.data)
        setLoad(true)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  const submitForm = e => {
    e.preventDefault()
    if (load && input.select && input.select !== 'Choose Status') {
      let StsID
      if (input.select === 'Working') {
        StsID = 10
      } else {
        StsID = 11
      }

      console.log(id)
      const update = {
        id: id + 1,
        Fname: input.Fname,
        Lname: input.Lname,
        StsID
      }
      axios
        .put('/insertC', update)
        .then(res => props.history.push('/manager'))
        .catch(err => console.log(err))
    }
  }

  const [id, setID] = useState('')
  const [load, setLoad] = useState(false)

  const [input, handleInputChange] = useInputChange()

  if (!load) {
    return <Fragment>Fething Statuses</Fragment>
  } else {
    return (
      <div>
        <h2>Insert a new Cashier</h2>
        <Form onSubmit={submitForm}>
          <FormGroup>
            <Label for='Fname'>First Name</Label>
            <Input
              required
              type='text'
              name='Fname'
              id='Fname'
              onChange={handleInputChange}
              placeholder='Enter new Name'
            />
          </FormGroup>
          <FormGroup>
            <Label for='Lname'>Last Name</Label>
            <Input
              required
              type='text'
              name='Lname'
              id='Lname'
              onChange={handleInputChange}
              placeholder='Enter new Desription'
            />
          </FormGroup>
          <FormGroup>
            <Label for='Select'>Select</Label>
            <Input
              required
              type='select'
              name='select'
              id='Select'
              onChange={handleInputChange}
            >
              <option>Choose Status</option>

              <option>Working</option>
              <option>Not working</option>
            </Input>
          </FormGroup>
          <Button type='submit' value='Submit'>
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}
export default InsertC
