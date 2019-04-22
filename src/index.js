import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'
import storeFactory from './redux/store'

export const store = storeFactory()

window.React = React
window.store = store

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()

