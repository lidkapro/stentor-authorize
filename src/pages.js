import NavMenu from './components/nav-menu/NavMenu'
import React from 'react'
import {Route} from 'react-router-dom'
import Groups from './components/groups/Groups'
import People from './components/people/People'
import AllPeople from './components/group/all-people/AllPeople'
import Authorities from './components/group/authorities/Authorities'
import GroupSpace from './components/group/Group'
import ManagePeople from './components/group/managePeople/ManagePeople'

export const GroupsMain = () =>
    <NavMenu>
        <Route exact path='/groups' component={Groups}/>
        <Route path='/groups/:groupName' component={Group}/>
    </NavMenu>

export const Group = () =>
    <GroupSpace>
        <Route path='/groups/:groupName/allPeople' component={AllPeople}/>
        <Route path='/groups/:groupName/authorities' component={Authorities}/>
        <Route path='/groups/:groupName/manage' component={ManagePeople}/>
    </GroupSpace>

export const PeopleMain = () =>
    <NavMenu>
        <Route path='/people' component={People}/>
    </NavMenu>
