import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import {HashRouter} from 'react-router-dom'
import './saas/global.scss'
import {Provider} from 'mobx-react'
import axios from 'axios'


export const findAllAuthoritiesBegin = () => {
    axios.post('/graphql', {query: '{findAllAuthorities}'})
        .then(response => response.data.data.findAllAuthorities)
        .then(r=>console.log(r))
}

findAllAuthoritiesBegin()

window.React = React

ReactDOM.render(
    <Provider>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()

