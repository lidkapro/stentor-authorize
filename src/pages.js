import NavMenu from './components/nav-menu/NavMenu'
import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Groups from './components/groups/Groups'
import People from './components/people/People'
import AllPeople from './components/group/all-people/AllPeople'
import Authorities from './components/group/authorities/Authorities'
import HeadGroup from './components/group/Group'
import ControlPeople from './components/group/manage-people/ControlPeople'

export const GroupsMain = () =>
    <NavMenu>
        <Switch>
            <Route exact path='/groups' component={Groups}/>
            <Route path='/groups/:groupName' component={Group}/>
        </Switch>
    </NavMenu>

export const Group = () =>
        <HeadGroup>
            <Switch>
                <Route path='/groups/:groupName/allPeople' component={AllPeople}/>
                <Route path='/groups/:groupName/authorities' component={Authorities}/>
                <Route path='/groups/:groupName/manage' component={ControlPeople}/>
            </Switch>
        </HeadGroup>

export const PeopleMain = () =>
    <NavMenu>
        <Switch>
            <Route path='/people' component={People}/>
        </Switch>
    </NavMenu>
