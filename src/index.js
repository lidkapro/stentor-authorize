import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import {HashRouter} from 'react-router-dom'
import './styles/global.scss'
import {Provider} from 'mobx-react'
import Groups from './store/groups'
import './axios-setup.js'
import Rights from './store/authorities'
import People from './store/people'

window.React = React

const store = {
    groups: new Groups(),
    rights: new Rights(),
    people:new People()
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

