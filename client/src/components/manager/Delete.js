import React, { useEffect, useState } from 'react'

import { useInputChange } from '../../utils/hooks'
import { Input, Form, Button } from 'reactstrap'
import axios from 'axios'

const Delete = props => {
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
      .get('http://localhost:3000/fooditems')
      .then(res => {
        setItem(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    axios
      .get('http://localhost:3000/cashiers')
      .then(res => {
        setCashier(res.data)
        setLoad(true)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  //States
  const [load, setLoad] = useState(false)
  const [food, setFood] = useState(null)
  const [cashier, setCashier] = useState(null)
  const [item, setItem] = useState(null)
  const [input, handleInputChange] = useInputChange()

  const submitForm = e => {
    e.preventDefault()
    if (input.selectCategory !== 'Food Category' && input.selectCategory) {
      const FC = food.filter(foo => foo.Name === input.selectCategory)
      const update = {
        FCID: FC[0].FCID
      }
      axios
        .post('/deleteFC', update)
        .then(res => props.history.push('/manager'))
        .catch(err => console.log(err))
      console.log(update)
    }
    if (input.selectItem !== 'Food Item' && input.selectItem) {
      const FI = item.filter(foo => foo.Name === input.selectItem)
      const update = {
        FID: FI[0].FID
      }
      axios
        .post('/deleteFI', update)
        .then(res => props.history.push('/manager'))
        .catch(err => console.log(err))
      console.log(update)
    }
    if (input.selectCashier !== 'Cashier' && input.selectCashier) {
      const C = cashier.filter(foo => foo.Fname === input.selectCashier)
      const update = {
        EID: C[0].EID
      }
      axios
        .post('/deleteC', update)
        .then(res => props.history.push('/manager'))
        .catch(err => console.log(err))
    }
  }
  const SelectMenu1 = () => {
    if (food) {
      return food.map(foo => (
        <option key={foo.FCID} name={foo.Name}>
          {foo.Name}
        </option>
      ))
    }
  }
  const SelectMenu2 = () => {
    if (item) {
      return item.map(it => (
        <option key={it.FID} name={it.Name}>
          {it.Name}
        </option>
      ))
    }
  }
  const SelectMenu3 = () => {
    if (load) {
      return cashier.map(cash => (
        <option key={cash.EID} name={cash.Fname}>
          {cash.Fname}
        </option>
      ))
    }
  }

  if (!load) {
    return <div>Loading Items</div>
  } else {
    return (
      <div>
        <Form onSubmit={submitForm}>
          <h3>Select a Food categroy to delete</h3>
          <Input
            className='mt-3'
            type='select'
            name='selectCategory'
            id='selectCategory'
            onChange={handleInputChange}
          >
            <option key={0} name={0}>
              Food Category
            </option>
            {SelectMenu1()}
          </Input>

          <h3>Select a Food Item to delete</h3>

          <Input
            className='mt-3'
            type='select'
            name='selectItem'
            id='selectItem'
            onChange={handleInputChange}
          >
            <option key={0} name={0}>
              Food Item
            </option>

            {SelectMenu2()}
          </Input>
          <h3>Select a Cashier to delete</h3>

          <Input
            className='mt-3'
            type='select'
            name='selectCashier'
            id='selectCashier'
            onChange={handleInputChange}
          >
            <option key={0} name={0}>
              Cashier
            </option>

            {SelectMenu3()}
          </Input>
          <Button type='submit' value='Submit'>
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}
export default Delete
