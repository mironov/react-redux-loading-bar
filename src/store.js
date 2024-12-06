import { thunk } from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import { loadingBarMiddleware } from 'react-redux-loading-bar'

import rootReducer from './reducer'

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunk, // lets us dispatch() functions
    promise, // resolves promises
    loadingBarMiddleware(), // manages loading bar
    createLogger(), // log actions in console
  ),
)(createStore)

const store = createStoreWithMiddleware(rootReducer)

export default store
