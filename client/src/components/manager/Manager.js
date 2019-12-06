import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
const Manager = props => {
  const Logout = () => {
    localStorage.removeItem('authenticated')
    localStorage.removeItem('authBody')
    localStorage.removeItem('authMem')

    props.history.push(`/`)
  }
  return (
    <div>
      <div>
        Food Category
        <Link to='/manager/updatefc'>
          <Button color='primary' className='m-3'>
            Update
          </Button>
        </Link>
        <Link to='/manager/insertfc'>
          <Button color='primary' className='m-3'>
            Insert
          </Button>
        </Link>
      </div>
      <br />
      <div>
        Food Items
        <Link to='/manager/updatefi'>
          <Button color='primary' className='m-3'>
            Update
          </Button>
        </Link>
        <Link to='/manager/insertfi'>
          <Button color='primary' className='m-3'>
            Insert
          </Button>
        </Link>
      </div>
      <br />
      <div>
        Cashiers
        <Link to='/manager/updatec'>
          <Button color='primary' className='m-3'>
            Update
          </Button>
        </Link>
        <Link to='/manager/insertc'>
          <Button color='primary' className='m-3'>
            Insert
          </Button>
        </Link>
      </div>
      <div>
        Delete
        <Link to='/manager/delete' size='lg'>
          <Button color='primary' className='m-3'>
            Delete
          </Button>
        </Link>
      </div>
      <div>
        Generate Reports
        <Link to='/manager/report' size='lg'>
          <Button color='primary' className='m-3'>
            Generate
          </Button>
        </Link>
      </div>
      <Button onClick={Logout}>Logout</Button>
    </div>
  )
}
export default Manager
