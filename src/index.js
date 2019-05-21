import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import {HashRouter} from 'react-router-dom'
import './saas/global.scss'
import {Provider} from 'mobx-react'
import Groups from './store/groups'
import Group from './store/group'
import './axios-setup.js'

window.React = React

const store = {
    groups: new Groups(),
    group: new Group()
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

