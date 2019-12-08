import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
const Cashier = props => {
  const Logout = () => {
    localStorage.removeItem('authenticated')
    localStorage.removeItem('authBody')
    localStorage.removeItem('authMem')
    props.history.push(`/`)
  }
  return (
    <Fragment>
      <div>
        Create new order
        <Link className='m-3' to='/cashier/create'>
          <Button color='primary'>Create</Button>
        </Link>
      </div>

      <div>
        Update an existing order
        <Link className='m-3' to='/cashier/update'>
          <Button color='primary'>Update</Button>
        </Link>
      </div>
      <Button onClick={Logout}>Logout</Button>
    </Fragment>
  )
}
export default Cashier
