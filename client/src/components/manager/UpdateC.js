import React, { Fragment, useEffect, useState } from 'react'

import { useInputChange } from '../../utils/hooks'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import axios from 'axios'

const UpdateC = props => {
  useEffect(() => {
    axios
      .get('http://localhost:3000/cashiers')
      .then(res => {
        setCashier(res.data)
        console.log(res.data)
        setLoad(true)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  const submitForm = e => {
    e.preventDefault()

    const cash = cashier.filter(cash => cash.Fname === selectedItem)

    if (cash[0] && input.select && input.select !== 'Choose Status') {
      const id = cash[0].EID
      let StsID
      if (input.select === 'Working') {
        StsID = 10
      } else {
        StsID = 11
      }

      const update = {
        id,
        StsID,
        Fname: input.Fname,
        Lname: input.Lname
      }

      const jsonUpdate = JSON.stringify(update)
      axios
        .patch('/updateCashier', JSON.parse(jsonUpdate))
        .then(res => props.history.push('/manager'))
        .catch(err => console.log(err))
    }
  }
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(prevState => !prevState)

  const [cashier, setCashier] = useState('')
  const [load, setLoad] = useState(false)

  const [input, handleInputChange] = useInputChange()
  const [selectedItem, setSelectedItem] = useState(null)

  const selectItem = e => {
    setSelectedItem(e.currentTarget.textContent)
  }

  const SelectMenu = () => {
    console.log(cashier)
    if (load && cashier) {
      return cashier.map(cash => (
        <DropdownItem key={cash.EID} name={cash.Fname} onClick={selectItem}>
          {cash.Fname}
        </DropdownItem>
      ))
    }
  }

  if (!load) {
    return <Fragment>Fething Cashiers</Fragment>
  } else {
    return (
      <div>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>
            {selectedItem || 'Select Cashier'}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Cashier</DropdownItem>

            {SelectMenu()}
          </DropdownMenu>
        </Dropdown>

        <Form onSubmit={submitForm}>
          <FormGroup>
            <Label for='Fname'>Name</Label>
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
          <FormGroup className='mt-3'>
            <Label for='select'>Update Status ID</Label>
            <Input
              required
              type='select'
              name='select'
              id='select'
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
export default UpdateC
