import React, {Fragment, useEffect, useState} from 'react'
import {
	withRouter
} from 'react-router-dom';

import {useInputChange} from '../../utils/hooks'
import { Button, Form, FormGroup, Label, Input  } from 'reactstrap';
import axios from 'axios'

const InsertFC = (props) => {
    useEffect(() => {

        axios.get('http://localhost:3000/status')
            .then(res => {
                setStatus(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        axios.get('http://localhost:3000/id')
            .then(res => {
                setID(res.data)
                setLoad(true)
            })
            .catch(err => {
                console.log(err)
            })
            
        }, [])
const submitForm = (e) => {
    e.preventDefault()
   if(load) {
    const statu = status.filter(stat => stat.Name === input.select )
    
    const StsID = statu[0].StsID
    console.log(id)
    const update = {
        id: id +1,
        Name: input.Name, 
        Description: input.Description,
        StsID
    }
    axios.put('/insertFC', update).then(res=> props.history.push('/manager')).catch(err => console.log(err))
   }

}

const [id, setID] = useState('')
const [status, setStatus] = useState('')
const [load, setLoad] = useState(false)

const [input, handleInputChange] = useInputChange()



if(!load) {
    return (
    <Fragment>
        Fething Statuses
    </Fragment>
) 
}
else {
    return ( <div>
                <h2>Insert Food Category</h2>
            <Form onSubmit={submitForm}>
                <FormGroup>
                <Label for="Name">Name</Label>
                <Input type="text" name="Name" id="Name" onChange={handleInputChange} placeholder="Enter new Name" />
                </FormGroup>
                <FormGroup>
                <Label for="Description">Description</Label>
                <Input type="text" name="Description" id="Description"  onChange={handleInputChange} placeholder="Enter new Desription" />
                </FormGroup>
                <FormGroup>
                <Label for="Select">Select</Label>
                <Input type="select" name="select" id="Select" onChange={handleInputChange}>
                    <option>Not empty</option>
                    <option>Empty</option>
                    <option>Available</option>
                    <option>Unavailable</option>
                    <option>Pending</option>
                    <option>Done</option>
                    <option>Collected</option>
                    <option>Pending</option>
                    <option>Done</option>
                    <option>Working</option>
                    <option>Not working</option>
                </Input>
                </FormGroup>
              <Button type="submit" value="Submit">Submit</Button>
            </Form>
    </div>
    )
}

}
export default InsertFC