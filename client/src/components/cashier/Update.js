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

const Update = props => {
  useEffect(() => {
    axios
      .get('http://localhost:3000/transaction')
      .then(res => {
        setTransaction(res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    axios
      .get('http://localhost:3000/orders')
      .then(res => {
        setOrders(res.data)
        setLoad(true)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const [load, setLoad] = useState(false)
  const [transaction, setTransaction] = useState('')
  const [orders, setOrders] = useState('')
  const [selectedTR, setSelectedTR] = useState('')
  const [selectedTRS, setSelectedTRS] = useState('')
  const [selectedO, setSelectedO] = useState('')
  const [selectedOS, setSelectedOS] = useState('')

  const submitForm = e => {
    e.preventDefault()
    if (selectedTR && selectedTR !== 'Select Transaction') {
      let StsID
      if (!selectedTRS || selectedTRS === 'Pending') {
        StsID = 8
      } else {
        StsID = 9
      }
      const update = {
        TID: parseInt(selectedTR),
        StsID
      }
      axios
        .patch('/updateTransaction', update)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    if (selectedO && selectedO !== 'Select Order') {
      let StsID
      if (!selectedOS || selectedOS === 'Pending') {
        StsID = 5
      } else if (selectedOS === 'Done') {
        StsID = 6
      } else {
        StsID = 7
      }
      const update = {
        OID: parseInt(selectedO),
        StsID
      }
      axios
        .patch('/updateOrder', update)
        .then(res => {
          setTimeout(() => {
            props.history.push('/cashier')
          }, 300)
          console.log(res.data)
        })
        .catch(err => console.log(err))

      console.log(update)
    }
  }
  const menu1 = () => {
    if (transaction) {
      return transaction.map(tr => <option key={tr.TID}>{tr.TID}</option>)
    }
  }
  const menu2 = () => {
    if (orders) {
      return orders.map(or => <option key={or.OID}>{or.OID}</option>)
    }
  }
  return (
    <Fragment>
      <Form onSubmit={submitForm}>
        <div>
          <h4>Update Transaction Status</h4>
          <FormGroup>
            <Input
              type='select'
              name='selectTR'
              id='selectTR'
              onChange={e => setSelectedTR(e.currentTarget.value)}
            >
              <option>Select Transaction</option>
              {menu1()}
            </Input>
          </FormGroup>
          <FormGroup>
            <Input
              type='select'
              name='selectTRS'
              id='selectTRS'
              onChange={e => setSelectedTRS(e.currentTarget.value)}
            >
              <option>Pending</option>
              <option>Done</option>
            </Input>
          </FormGroup>
        </div>

        <div>
          <h4>Update Order Status</h4>
          <FormGroup>
            <Input
              type='select'
              name='selectO'
              id='selectO'
              onChange={e => setSelectedO(e.currentTarget.value)}
            >
              <option>Select Order</option>
              {menu2()}
            </Input>
          </FormGroup>
          <FormGroup>
            <Input
              type='select'
              name='selectOS'
              id='selectOS'
              onChange={e => setSelectedOS(e.currentTarget.value)}
            >
              <option>Pending</option>
              <option>Done</option>
              <option>Collected</option>
            </Input>
          </FormGroup>
        </div>
        <Button type='submit' value='Submit'>
          Submit
        </Button>
      </Form>
    </Fragment>
  )
}
export default Update
