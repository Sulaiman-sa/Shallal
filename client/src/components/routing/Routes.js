import React from 'react'
import {Route, Switch} from 'react-router-dom'
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

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/manager" component={Manager}/>
            <Route exact path="/cashier" component={Cashier}/>
            <Route exact path="/manager/updatefc" component={updateFC} />
            <Route exact path="/manager/updatefi" component={updateFI} />
            <Route exact path="/manager/updatec" component={updateC} />
            <Route exact path="/manager/insertfc" component={InsertFC} />
            <Route exact path="/manager/insertfi" component={InsertFI} />
            <Route exact path="/manager/insertc" component={InsertC} />
            <Route exact path="/manager/delete" component={Delete} />
            <Route exact path="/manager/report" component={Report} />
            <Route exact path="/cashier/create" component={Create} />
            <Route exact path="/cashier/update" component={Update} />
        </Switch>
    )
}

export default Routes