import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Manager from '../manager/Manager'
import Cashier from '../cashier/Cashier'
import updateFC from '../manager/UpdateFC'
import updateFI from '../manager/UpdateFI'
import updateC from '../manager/UpdateC'
import InsertFC from '../manager/InsertFC'
import InsertFI from '../manager/InsertFI'
import InsertC from '../manager/InsertC'
import Delete from '../manager/Delete'
import Report from '../manager/Report'
import Create from '../cashier/Create'
import Update from '../cashier/Update'
import ManagerRoute from './ManagerRoute'
import CashierRoute from './CashierRoute'

const Routes = () => {
  return (
    <Switch>
      <ManagerRoute exact path='/manager' component={Manager} />
      <CashierRoute exact path='/cashier' component={Cashier} />
      <ManagerRoute exact path='/manager/updatefc' component={updateFC} />
      <ManagerRoute exact path='/manager/updatefi' component={updateFI} />
      <ManagerRoute exact path='/manager/updatec' component={updateC} />
      <ManagerRoute exact path='/manager/insertfc' component={InsertFC} />
      <ManagerRoute exact path='/manager/insertfi' component={InsertFI} />
      <ManagerRoute exact path='/manager/insertc' component={InsertC} />
      <ManagerRoute exact path='/manager/delete' component={Delete} />
      <ManagerRoute exact path='/manager/report' component={Report} />
      <CashierRoute exact path='/cashier/create' component={Create} />
      <CashierRoute exact path='/cashier/update' component={Update} />
    </Switch>
  )
}

export default Routes
