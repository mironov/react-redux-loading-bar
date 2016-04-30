import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Demo from './demo'
import store from './store'

import './assets/index.css'

ReactDOM.render((
  <Provider store={store}>
    <Demo />
  </Provider>
), document.getElementById('app'))
