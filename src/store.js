import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import createLogger from 'redux-logger'
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import { loadingBarMiddleware } from 'react-redux-loading-bar'

import rootReducer from './reducer'

const createStoreWithMiddleware = compose(
  applyMiddleware(
    createLogger(), // log actions in console
    thunkMiddleware, // lets us dispatch() functions
    promiseMiddleware(), // resolves promises
    loadingBarMiddleware(), // manages loading bar
  )
)(createStore)

const store = createStoreWithMiddleware(rootReducer)

export default store
