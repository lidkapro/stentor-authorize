import NavMenu from './components/NavMenu'
import React from 'react'
import {Route} from 'react-router-dom'
import Groups from './components/Groups'
import Users from './components/users/Users'
import AllUsers from './components/group/all-users/AllUsers'
import Authorities from './components/group/authorities/Authorities'
import GroupSpace from './components/group/Group'
import ManageAuthorities from './components/ManageAuthorities'
import ManageUsers from './components/group/manage-users/ManageUsers'

export const GroupsMain = () =>
    <div className='wrapper_container'>
        <NavMenu>
            <Route exact path='/groups' component={Groups}/>
            <Route path='/groups/:groupName' component={Group}/>
        </NavMenu>
    </div>

export const Group = () =>
    <GroupSpace>
        <Route exact path='/groups/:groupName/allUsers' component={AllUsers}/>
        <Route exact path='/groups/:groupName/authorities' component={Authorities}/>
        <Route exact path='/groups/:groupName/manage' component={ManageUsers}/>
    </GroupSpace>


export const UsersMain = () =>
    <div className='wrapper_container'>
        <NavMenu>
            <Route exact path='/users' component={Users}/>
        </NavMenu>
    </div>

export const AllAuthorities = () =>
    <div className='wrapper_container'>
        <NavMenu>
            <Route exact path='/authorities' component={ManageAuthorities}/>
        </NavMenu>
    </div>
