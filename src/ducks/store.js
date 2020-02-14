import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import authreducer from './auth_reducer'

const rootReducer = combineReducers({
    authreducer,
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))