import React, {Fragment, useState, useEffect} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Form, FormGroup, Label, Input  } from 'reactstrap';
import axios from 'axios'

const Create = () => {
  useEffect(() => {
  

    axios.get('http://localhost:3000/fooditems')
            .then(res => {
                setFoodItem(res.data)
                console.log(res.data)
                setLoad(true)
            })
            .catch(err => {
                console.log(err)
            })
        
    }, [])

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);  
    const [foodItem, setFoodItem] = useState('')
    const [load, setLoad] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const selectItem = (e) => {
      setSelectedItem(e.currentTarget.textContent)
  }     
    const SelectMenu = () => {
      if(load) {
      return foodItem.map(item => <DropdownItem  key={item.FID} name={item.Name} onClick={selectItem}>{item.Name}
      </DropdownItem>)
    }
    }

    if(!load) {
      return (
        <Fragment>
          Fetching food Items
        </Fragment>
      )
    }
    else{ 
      return (
        <div>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    {selectedItem || 'Select food'}
                </DropdownToggle>
                <DropdownMenu>
                <DropdownItem header>Food Item</DropdownItem>

                {SelectMenu()}
                </DropdownMenu>
            </Dropdown>  
            <Form>

              
            <Button type="submit" value="Submit">Submit</Button>
            </Form>
        </div>
        )
    }

}
export default Create