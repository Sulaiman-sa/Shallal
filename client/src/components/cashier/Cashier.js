import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'reactstrap'
const Cashier = () => {
    return (
        <Fragment>
            <div>
                Create new order
                <Link className="m-3" to="/cashier/create"><Button color="primary">Create</Button></Link>
            </div>

            <div>
                Update an existing order
                <Link className="m-3" to="/cashier/update"><Button color="primary">Uodate</Button></Link>
            </div>
        </Fragment>
    )
}
export default Cashier