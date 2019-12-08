import React, { Fragment, useEffect, useState } from 'react'

import { useInputChange } from '../../utils/hooks'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'

const InsertFC = props => {
  useEffect(() => {
    axios
      .get('http://localhost:3000/id')
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
      if (input.select === 'Empty') {
        StsID = 2
      } else {
        StsID = 1
      }
      console.log(id)
      const update = {
        id: id + 1,
        Name: input.Name,
        Description: input.Description,
        StsID
      }
      axios
        .put('/insertFC', update)
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
        <h2>Insert Food Category</h2>
        <Form onSubmit={submitForm}>
          <FormGroup>
            <Label for='Name'>Name</Label>
            <Input
              required
              type='text'
              name='Name'
              id='Name'
              onChange={handleInputChange}
              placeholder='Enter new Name'
            />
          </FormGroup>
          <FormGroup>
            <Label for='Description'>Description</Label>
            <Input
              required
              type='text'
              name='Description'
              id='Description'
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

              <option>Not empty</option>
              <option>Empty</option>
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
export default InsertFC
