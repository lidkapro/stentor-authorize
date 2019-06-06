import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Whoops404 from './Whoops404'
import {AllAuthorities, GroupsMain, UsersMain} from '../pages'


const App = () =>
    <Switch>
        <Route exact path='/' component={()=><Redirect to='/users'/>}/>
        <Route path='/groups' component={GroupsMain}/>
        <Route path='/users' component={UsersMain}/>
        <Route path='/authorities' component={AllAuthorities}/>
        <Route component={Whoops404}/>
    </Switch>

export default App
