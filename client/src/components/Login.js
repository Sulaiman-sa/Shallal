import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'reactstrap'
const Login = () => {
    return (
        <Fragment>
            
            <Link className="m-2" to="/manager">
                <Button>Manager</Button>
            </Link>
            <Link className="m-2" to="/cashier">
                <Button>Cashier</Button>
            </Link>

        </Fragment>
    )
}
export default Login