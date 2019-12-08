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

const UpdateFC = props => {
  useEffect(() => {
    axios
      .get('http://localhost:3000/foodCategory')
      .then(res => {
        setFood(res.data)
        console.log(res.data)
        setLoad(true)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  const submitForm = e => {
    e.preventDefault()
    if (food) {
      const fod = food.filter(foo => foo.Name === selectedItem)
      if (fod[0] && input.select && input.select !== 'Choose Status') {
        let StsID
        if (input.select === 'Empty') {
          StsID = 2
        } else {
          StsID = 1
        }
        const id = fod[0].FCID

        const update = {
          id,
          StsID,
          name: input.foodName,
          description: input.Decription
        }

        axios
          .patch('/updateFoodCategory', update)
          .then(res => props.history.push('/manager'))
          .catch(err => console.log(err))
      }
    }
  }
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(prevState => !prevState)

  const [food, setFood] = useState('')
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
            <Label for='foodName'>Name</Label>
            <Input
              required
              type='text'
              name='foodName'
              id='foodName'
              onChange={handleInputChange}
              placeholder='Enter new Name'
            />
          </FormGroup>
          <FormGroup>
            <Label for='Decription'>Decription</Label>
            <Input
              required
              type='text'
              name='Decription'
              id='Decription'
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
export default UpdateFC
