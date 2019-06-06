import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import {HashRouter} from 'react-router-dom'
import './styles/global.scss'
import {Provider} from 'mobx-react'
import Groups from './store/groups'
import './axios-setup.js'
import Users from './store/users'
import ManageUsers from './store/manage-users'
import Authorities from './store/authorities'

window.React = React

const store = {
    groups: new Groups(),
    authorities: new Authorities(),
    users:new Users(),
    manageUsers:new ManageUsers()
}


ReactDOM.render(
    <Provider {...store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()

