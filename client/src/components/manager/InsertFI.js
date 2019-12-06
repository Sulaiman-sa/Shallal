import React, { Fragment, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

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

const InsertFI = props => {
  useEffect(() => {
    axios
      .get('http://localhost:3000/foodCategory')
      .then(res => {
        setFood(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })

    axios
      .get('http://localhost:3000/status')
      .then(res => {
        setStatus(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    axios
      .get('http://localhost:3000/FIID')
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

    const foodCategory = food.filter(foo => foo.Name === selectedItem)
    const statu = status.filter(
      stat => (stat.Name === input.select || 3) && stat.StsTID === 2
    )
    console.log(statu)
    if (load && foodCategory[0] && statu[0]) {
      const foodCategory = food.filter(foo => foo.Name === selectedItem)
      const FCID = foodCategory[0].FCID
      const statu = status.filter(
        stat => (stat.Name === input.select || 3) && stat.StsTID === 2
      )
      const StsID = statu[0].StsID

      let today = new Date()
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      const yyyy = today.getFullYear()

      today = yyyy + '-' + mm + '-' + dd
      const update = {
        FID: id + 1,
        FCID,
        Name: input.Name,
        Description: input.Description,
        StsID,
        Price: parseInt(input.Price),
        StartDate: today
      }
      console.log(update)
      axios
        .put('/insertFI', update)
        .then(res => props.history.push('/manager'))
        .catch(err => console.log(err))
    }
  }
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(prevState => !prevState)

  const [id, setID] = useState('')
  const [food, setFood] = useState('')
  const [status, setStatus] = useState('')
  const [load, setLoad] = useState(false)

  const [input, handleInputChange] = useInputChange()
  const [selectedItem, setSelectedItem] = useState(null)

  const selectItem = e => {
    setSelectedItem(e.currentTarget.textContent)
  }

  const SelectMenu = () => {
    if (load) {
      return food.map(foo => (
        <DropdownItem key={foo.FCID} name={foo.Name} onClick={selectItem}>
          {foo.Name}
        </DropdownItem>
      ))
    }
  }

  if (!load) {
    return <Fragment>Fething food</Fragment>
  } else {
    return (
      <div>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>{selectedItem || 'Select food'}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Food Category</DropdownItem>

            {SelectMenu()}
          </DropdownMenu>
        </Dropdown>

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
              placeholder='Enter new Description'
            />
          </FormGroup>
          <FormGroup>
            <Label for='Price'>Price</Label>
            <Input
              required
              type='number'
              name='Price'
              id='Price'
              onChange={handleInputChange}
              placeholder='Enter new Price'
            />
          </FormGroup>
          <FormGroup>
            <Label for='Select'>Status</Label>
            <Input
              required
              type='select'
              name='select'
              id='Select'
              onChange={handleInputChange}
            >
              <option>Available</option>
              <option>Unavailable</option>
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
export default InsertFI
