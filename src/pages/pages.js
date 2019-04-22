import NavMenu from '../components/navBar/NavMenu'
import React from 'react'
import {Route} from 'react-router-dom'
import Groups from '../components/groups/Groups'
import People from '../components/people/People'


export const Main = () =>
    <NavMenu>
        <Route path='/main/groups' component={Groups}/>
        <Route path='/main/people' component={People}/>
    </NavMenu>
