import NavMenu from './components/nav-menu/NavMenu'
import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import Groups from './components/groups/Groups'
import People from './components/people/People'
import AllPeople from './components/group/all-people/AllPeople'
import Authorities from './components/group/authorities/Authorities'
import GroupSpace from './components/group/Group'
import ManagePeople from './components/group/managePeople/ManagePeople'
import HeadPeople from './components/people/HeadPeople'

export const GroupsMain = () =>
    <div className='wrapper_container'>
        <NavMenu>
            <Route exact path='/groups' component={Groups}/>
            <Route path='/groups/:groupName' component={Group}/>
        </NavMenu>
    </div>

export const Group = () =>
    <GroupSpace>
        <Route exact path='/groups/:groupName/allPeople' component={AllPeople}/>
        <Route exact path='/groups/:groupName/authorities' component={Authorities}/>
        <Route exact path='/groups/:groupName/manage' component={ManagePeople}/>
    </GroupSpace>


export const PeopleMain = () =>
    <div className='wrapper_container'>
        <NavMenu>
            <main className='container'>
                <HeadPeople />
            <Route exact path='/people' component={() => <Redirect to='/people/everyone/not/sort'/>}/>
            <Route exact path='/people/:filter' component={() => <Redirect to='/people/everyone/not/sort'/>}/>
            <Route exact path='/people/:filter/:sort/:sortBy' component={People}/>
            <Route exact path='/people/:filter/:sort/:sortBy/:search' component={People}/>
            </main>
        </NavMenu>
    </div>
