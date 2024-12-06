import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import Demo from './demo'
import DemoAjax from './demo_ajax'
import DemoMultiple from './demo_multiple'
import store from './store'

import './assets/index.css'

let demoComponent
if (window.location.href.includes('ajax')) {
  demoComponent = <DemoAjax />
} else if (window.location.href.includes('multiple')) {
  demoComponent = <DemoMultiple />
} else {
  demoComponent = <Demo />
}

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(
  <Provider store={store}>
    {demoComponent}
  </Provider>
)
