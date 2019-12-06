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
const Create = props => {
  useEffect(() => {
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
      .get('http://localhost:3000/transactionID')
      .then(res => {
        setTID(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const [foodItem, setFoodItem] = useState('')
  const [load, setLoad] = useState(false)
  const [TID, setTID] = useState(0)
  const [status, setStatus] = useState(false)

  const [input, handleInputChange] = useInputChange()

  const selectItems = () => {
    if (load) {
      return foodItem.map(item => <option key={item.FID}>{item.Name}</option>)
    }
  }

  const Amount = () => {
    let amount = 0
    if (input.Amount1) {
      amount =
        amount +
        parseInt(input.Amount1) *
          foodItem.filter(food => food.Name === input.select1)[0].Price
    }
    if (input.Amount2) {
      amount =
        amount +
        parseInt(input.Amount2) *
          foodItem.filter(food => food.Name === input.select2)[0].Price
    }
    if (input.Amount3) {
      amount =
        amount +
        parseInt(input.Amount3) *
          foodItem.filter(food => food.Name === input.select3)[0].Price
    }
    return amount
  }
  const submitForm = async e => {
    e.preventDefault()
    if (input.select1) {
      console.log(input)
      const EID = parseInt(localStorage.getItem('authMem'))
      const totalAmount = Amount()
      let today = new Date()
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const yyyy = today.getFullYear()
      const paid = input.paid ? input.paid : 'Pending'
      const statu = status.filter(
        stat => stat.Name === paid && stat.StsTID === 4
      )
      const StsID = statu[0].StsID
      today = yyyy + '-' + mm + '-' + dd
      const phone = input.phone || null
      const transaction = {
        EID,
        TID: TID + 1,
        Date: today,
        totalAmount,
        StsID,
        phone
      }
      console.log(transaction)
      await axios
        .put('/transaction', transaction)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

      if (input.select1) {
        const FID = foodItem.filter(item => item.Name === input.select1)[0].FID
        const Qty = parseInt(input.Amount1)
        const Amt =
          input.Amount1 *
          foodItem.filter(item => item.Name === input.select1)[0].Price
        let OStsID
        if (StsID === 9) {
          OStsID = 6
        } else {
          OStsID = 5
        }
        const order1 = {
          TID: TID + 1,
          FID,
          Qty,
          Amt,
          StsID: OStsID
        }
        console.log(order1)
        axios
          .put('/order', order1)
          .then(res => {
            setTimeout(() => {
              props.history.push('/cashier')
            }, 200)
          })
          .catch(err => console.log(err))
      }
      if (input.select2) {
        const FID = foodItem.filter(item => item.Name === input.select2)[0].FID
        const Qty = parseInt(input.Amount2)
        const Amt =
          input.Amount2 *
          foodItem.filter(item => item.Name === input.select2)[0].Price
        let OStsID
        if (StsID === 9) {
          OStsID = 6
        } else {
          OStsID = 5
        }
        const order2 = {
          TID: TID + 1,
          FID,
          Qty,
          Amt,
          StsID: OStsID
        }
        axios
          .put('/order', order2)
          .then(res => console.log(res.data))
          .catch(err => console.log(err))
      }
      if (input.select3) {
        const FID = foodItem.filter(item => item.Name === input.select3)[0].FID
        const Qty = parseInt(input.Amount3)
        const Amt =
          input.Amount3 *
          foodItem.filter(item => item.Name === input.select3)[0].Price
        let OStsID
        if (StsID === 9) {
          OStsID = 6
        } else {
          OStsID = 5
        }
        const order3 = {
          TID: TID + 1,
          FID,
          Qty,
          Amt,
          StsID: OStsID
        }
        axios
          .put('/order', order3)
          .then(res => console.log(res.data))
          .catch(err => console.log(err))
      }
    }
  }
  if (!load) {
    return <Fragment>Fetching food Items</Fragment>
  } else {
    return (
      <Fragment>
        <h2>Pick your orders </h2>
        <Form onSubmit={submitForm}>
          <FormGroup>
            <Label for='select1'>Select</Label>
            <Input
              type='select'
              name='select1'
              id='select1'
              onChange={handleInputChange}
            >
              <option>Choose an item</option>
              {selectItems()}
            </Input>
            {input.select1 && (
              <Fragment>
                <Label>
                  Price:
                  {
                    foodItem.filter(food => food.Name === input.select1)[0]
                      .Price
                  }
                </Label>{' '}
                <br />
                <Label for='Amount1'>Amount</Label>
                <Input
                  required
                  type='text'
                  name='Amount1'
                  id='Amount1'
                  onChange={handleInputChange}
                  placeholder='Enter Amount'
                />
              </Fragment>
            )}
          </FormGroup>
          <FormGroup>
            <Label for='select2'>Select</Label>
            <Input
              type='select'
              name='select2'
              id='select2'
              onChange={handleInputChange}
            >
              <option>Choose an item</option>
              {selectItems()}
            </Input>
            {input.select2 && (
              <Fragment>
                <Label>
                  Price:
                  {
                    foodItem.filter(food => food.Name === input.select2)[0]
                      .Price
                  }
                </Label>{' '}
                <br />
                <Label for='Amount2'>Amount</Label>
                <Input
                  required
                  type='text'
                  name='Amount2'
                  id='Amount2'
                  onChange={handleInputChange}
                  placeholder='Enter Amount'
                />
              </Fragment>
            )}
          </FormGroup>
          <FormGroup>
            <Label for='select3'>Select</Label>
            <Input
              type='select'
              name='select3'
              id='select3'
              onChange={handleInputChange}
            >
              <option>Choose an item</option>
              {selectItems()}
            </Input>
            {input.select3 && (
              <Fragment>
                <Label>
                  Price:
                  {
                    foodItem.filter(food => food.Name === input.select3)[0]
                      .Price
                  }
                </Label>{' '}
                <br />
                <Label for='Amount1'>Amount</Label>
                <Input
                  required
                  type='text'
                  name='Amount3'
                  id='Amount3'
                  onChange={handleInputChange}
                  placeholder='Enter Amount'
                />
              </Fragment>
            )}
          </FormGroup>
          <p>Total Amount: {Amount()}</p>
          <FormGroup>
            <Label for='phone'>
              Phone number (ignore it if it's not online order)
            </Label>
            <Input
              type='text'
              name='phone'
              id='phone'
              placeholder='Enter Phone number'
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for='paid'>Paid Status</Label>
            <Input
              required
              type='select'
              name='paid'
              id='paid'
              onChange={handleInputChange}
            >
              <option>Pending</option>
              <option>Done</option>
            </Input>
          </FormGroup>
          <Button type='submit' value='Submit'>
            Submit
          </Button>
        </Form>
      </Fragment>
    )
  }
}
export default Create
