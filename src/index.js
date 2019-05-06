import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import {HashRouter} from 'react-router-dom'
import './saas/global.scss'
import {Form} from './store/forms/forms'
import {Provider} from 'mobx-react'

window.React = React

ReactDOM.render(
    <Provider createForm={formName => new Form(formName)}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()

