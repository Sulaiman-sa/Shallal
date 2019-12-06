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

const UpdateFC = props => {
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
      .get('http://localhost:3000/fooditems')
      .then(res => {
        setFoodItem(res.data)
        console.log(res.data)
        setLoad(true)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  const submitForm = e => {
    e.preventDefault()

    const fod = foodItem.filter(foo => foo.Name === input.foodItem)
    const statu = status.filter(
      stat => (stat.Name === input.select || 3) && stat.StsTID === 2
    )
    if (fod[0] && statu) {
      const id = fod[0].FID
      const StsID = statu[0].StsID
      const update = {
        id,
        StsID,
        name: input.foodName,
        description: input.Description,
        price: input.Price
      }

      const jsonUpdate = JSON.stringify(update)
      axios
        .patch('/updateFoodItem', JSON.parse(jsonUpdate))
        .then(res => props.history.push('/manager'))
        .catch(err => console.log(err))
    }
  }
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(prevState => !prevState)

  const [food, setFood] = useState('')
  const [status, setStatus] = useState('')
  const [foodItem, setFoodItem] = useState('')
  const [load, setLoad] = useState(false)

  const [input, handleInputChange] = useInputChange()
  const [selectedItem, setSelectedItem] = useState(null)

  const selectItem = e => {
    setSelectedItem(e.currentTarget.textContent)
  }

  const SelectMenu = () => {
    if (load && food) {
      return food.map(foo => (
        <DropdownItem key={foo.FCID} name={foo.Name} onClick={selectItem}>
          {foo.Name}
        </DropdownItem>
      ))
    }
  }
  const FoodItemsMenu = () => {
    if (selectItem && food) {
      const fod = food.filter(foo => foo.Name === selectedItem)
      if (fod[0]) {
        const id = fod[0].FCID
        return foodItem
          .filter(it => it.FCID === id)
          .map(item => <option key={item.FID}>{item.Name}</option>)
      }
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
            <Label for='foodItem'>Select</Label>
            <Input
              required
              type='select'
              name='foodItem'
              id='foodItem'
              onChange={handleInputChange}
            >
              {FoodItemsMenu()}
            </Input>
          </FormGroup>
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
              type='text'
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
export default UpdateFC
