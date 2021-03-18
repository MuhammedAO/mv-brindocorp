import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userReducer } from './reducers/usersReducers'
import promiseMiddleware from 'redux-promise';

const rootReducer = combineReducers({
  user: userReducer
})

const middleware = [thunk, promiseMiddleware]

const initalState = {}

const store = createStore(rootReducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default store