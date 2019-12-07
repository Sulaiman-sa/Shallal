import React, { Fragment, useState, useEffect } from 'react'
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
  Input,
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupAddon,
  Badge,
  CustomInput
} from 'reactstrap'
import axios from 'axios'
const Report = () => {
  useEffect(() => {
    axios
      .get('http://localhost:3000/fooditems')
      .then(res => {
        setFoodItem(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })

    axios
      .get('http://localhost:3000/foodCategory')
      .then(res => {
        setFoodCategory(res.data)
        console.log(res.data)
        setLoad(true)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const [load, setLoad] = useState('')
  const [foodItem, setFoodItem] = useState('')
  const [foodCategory, setFoodCategory] = useState('')
  const [foundC, setFoundC] = useState('')
  const [foundI, setFoundI] = useState('')
  const [input, handleInputChange] = useInputChange('')

  const submitForm = e => {
    e.preventDefault()
    if (
      input.selectCategory &&
      input.selectCategory !== 'Choose a Category' &&
      input.dateCF &&
      input.dateCT
    ) {
      const FCID = foodCategory.filter(
        FC => FC.Name === input.selectCategory
      )[0].FCID
      const obj = {
        FCID,
        fromDate: input.dateCF,
        toDate: input.dateCT
      }

      axios
        .put('/reportCategory', obj)
        .then(res => setFoundC(res.data))
        .catch(err => console.log(err))
    }
    if (
      input.selectItem &&
      input.selectItem !== 'Choose an Item' &&
      input.dateIF &&
      input.dateIT
    ) {
      const FID = foodItem.filter(FI => FI.Name === input.selectItem)[0].FID
      const obj = {
        FID,
        fromDate: input.dateCF,
        toDate: input.dateCT
      }
      axios
        .put('/reportItem', obj)
        .then(res => setFoundI(res.data))
        .catch(err => console.log(err))
    }
  }
  const CategoryMenu = () => {
    if (foodCategory) {
      return foodCategory.map(fc => <option key={fc.FCID}>{fc.Name}</option>)
    }
  }
  const ItemMenu = () => {
    if (foodItem) {
      return foodItem.map(fi => <option key={fi.FID}>{fi.Name}</option>)
    }
  }
  return (
    <Fragment>
      <Form onSubmit={submitForm}>
        <div>
          <h4>Food Category Sales</h4>
          <FormGroup>
            <Input
              type='select'
              name='selectCategory'
              id='selectCategory'
              onChange={handleInputChange}
            >
              <option>Choose a Category</option>
              {CategoryMenu()}
            </Input>
          </FormGroup>

          <FormGroup>
            <Input
              type='date'
              name='dateCF'
              id='dateCF'
              placeholder='Select Date'
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type='date'
              name='dateCT'
              id='dateCT'
              placeholder='Select Date'
              onChange={handleInputChange}
            />
          </FormGroup>
          {foundC ? (
            <p>Total Sales of this Food Category is: {foundC}</p>
          ) : (
            <p>No Data</p>
          )}
        </div>
        <div>
          <h4>Food Item Sales</h4>
          <FormGroup>
            <Input
              type='select'
              name='selectItem'
              id='selectItem'
              onChange={handleInputChange}
            >
              <option>Choose an Item</option>
              {ItemMenu()}
            </Input>
          </FormGroup>

          <FormGroup>
            <Input
              type='date'
              name='dateIF'
              id='dateIF'
              placeholder='Select Date'
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type='date'
              name='dateIT'
              id='dateIT'
              placeholder='Select Date'
              onChange={handleInputChange}
            />
          </FormGroup>
          {foundI ? (
            <p>Total Sales of this Food Item is: {foundI}</p>
          ) : (
            <p>No Data</p>
          )}
        </div>
        <Button type='submit' value='Submit'>
          Submit
        </Button>
      </Form>
    </Fragment>
  )
}
export default Report
