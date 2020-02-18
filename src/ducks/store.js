import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import authreducer from './auth_reducer'
import productreducer from './product_reducer'

const rootReducer = combineReducers({
    authreducer,
    productreducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))