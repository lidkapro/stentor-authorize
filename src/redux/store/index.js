import {createStore, combineReducers, applyMiddleware} from 'redux'
import {people} from './reducers/people/people'
import {groups} from './reducers/groups/gpoups'

const logger = store => next => action => {
    let result
    console.groupCollapsed('dispatching', action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

const saver = store => next => action => {
    let result = next(action)
    localStorage['stentor-auth'] = JSON.stringify(store.getState())
    return result
}

const storeFactory = () =>
    applyMiddleware(logger, saver)(createStore)(
        combineReducers({people,groups})
    )


export default storeFactory