import { combineReducers } from 'redux-immutable'
import { loadingBarReducer } from 'react-redux-loading-bar'

import * as reducers from './reducers/index'

const rootReducer = combineReducers({
  ...reducers,
  loadingBar: loadingBarReducer,
})

export default rootReducer
