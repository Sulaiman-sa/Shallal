import React, {Fragment, useEffect, useState} from 'react'
import {
	withRouter
} from 'react-router-dom';

import {useInputChange} from '../../utils/hooks'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Form, FormGroup, Label, Input  } from 'reactstrap';
import axios from 'axios'

const UpdateFC = (props) => {
    useEffect(() => {
    
        axios.get('http://localhost:3000/foodCategory')
            .then(res => {
                setFood(res.data)
                console.log(res.data)
                setLoad(true)
            })
            .catch(err => {
                console.log(err)
            })

        axios.get('http://localhost:3000/status')
            .then(res => {
                setStatus(res.data)
                console.log(res.data)
                setLoad(true)
            })
            .catch(err => {
                console.log(err)
            })
            
        }, [])
const submitForm = (e) => {
    e.preventDefault()
   
    const fod = food.filter(foo => foo.Name === selectedItem)
    if(fod[0]) {
        const id = fod[0].FCID
        const statu = status.filter(stat => stat.Name === input.select )
        const StsID = statu[0].StsID
        const update = {
        id,
        StsID,
        name: input.foodName,
        description: input.Decription
    }

    const jsonUpdate = JSON.stringify(update)
    axios.patch('/updateFoodCategory', JSON.parse(jsonUpdate)).then(res=> props.history.push('/manager')).catch(err => console.log(err))
    }

}
const [dropdownOpen, setDropdownOpen] = useState(false);
const toggle = () => setDropdownOpen(prevState => !prevState);

const [food, setFood] = useState('')
const [status, setStatus] = useState('')
const [load, setLoad] = useState(false)

const [input, handleInputChange] = useInputChange()
const [selectedItem, setSelectedItem] = useState(null)

const selectItem = (e) => {
    setSelectedItem(e.currentTarget.textContent)
}

const SelectMenu = () => {
    if(load) {
    return food.map(foo => <DropdownItem  key={foo.FCID} name={foo.Name} onClick={selectItem}>{foo.Name}
    </DropdownItem>)
}
}

if(!load) {
    return (
    <Fragment>
        Fething food
    </Fragment>
) 
}
else {
    return ( <div>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    {selectedItem || 'Select food'}
                </DropdownToggle>
                <DropdownMenu>
                <DropdownItem header>Food Category</DropdownItem>

                {SelectMenu()}
                </DropdownMenu>
            </Dropdown>  
                
            <Form onSubmit={submitForm}>
                <FormGroup>
                <Label for="foodName">Name</Label>
                <Input type="text" name="foodName" id="foodName" onChange={handleInputChange} placeholder="Enter new Name" />
                </FormGroup>
                <FormGroup>
                <Label for="Decription">Decription</Label>
                <Input type="text" name="Decription" id="Decription"  onChange={handleInputChange} placeholder="Enter new Desription" />
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
export default UpdateFC