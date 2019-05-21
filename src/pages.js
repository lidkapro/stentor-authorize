import NavMenu from './components/nav-menu/NavMenu'
import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Groups from './components/groups/Groups'
import People from './components/people/People'
import AllPeople from './components/group/AllPeople'
import Authorities from './components/group/authorities/Authorities'
import GroupSpace from './components/group/Group'
import ManagePeople from './components/group/ManagePeople'

export const GroupsMain = () =>
    <NavMenu>
        <Switch>
            <Route exact path='/groups' component={Groups}/>
            <Route path='/groups/:groupName' component={Group}/>
        </Switch>
    </NavMenu>

export const Group = () =>
        <GroupSpace>
            <Switch>
                <Route path='/groups/:groupName/allPeople' component={AllPeople}/>
                <Route path='/groups/:groupName/authorities' component={Authorities}/>
                <Route path='/groups/:groupName/manage' component={ManagePeople}/>
            </Switch>
        </GroupSpace>

export const PeopleMain = () =>
    <NavMenu>
        <Switch>
            <Route path='/people' component={People}/>
        </Switch>
    </NavMenu>
