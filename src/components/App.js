import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Whoops404 from './Whoops404'
import {GroupsMain,PeopleMain} from '../pages'
import {RedirectPage} from './RedirectPage'


const App = () =>
    <Switch>
        <Route exact path='/' component={RedirectPage}/>
        <Route path='/groups' component={GroupsMain}/>
        <Route path='/people' component={PeopleMain}/>
        <Route component={Whoops404}/>
    </Switch>

export default App
