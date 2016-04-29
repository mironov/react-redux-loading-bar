# React Redux Loading Bar

[![npm version](https://img.shields.io/npm/v/react-redux-loading-bar.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-loading-bar)
[![build status](https://img.shields.io/travis/mironov/react-redux-loading-bar/master.svg?style=flat-square)](https://travis-ci.org/mironov/react-redux-loading-bar)
[![coverage status](https://coveralls.io/repos/mironov/react-redux-loading-bar/badge.svg?branch=master&service=github)](https://coveralls.io/github/mironov/react-redux-loading-bar?branch=master)
[![npm downloads](https://img.shields.io/npm/dm/react-redux-loading-bar.svg?style=flat)](https://www.npmjs.com/package/react-redux-loading-bar)
[![dependency status](https://david-dm.org/mironov/react-redux-loading-bar.svg)](https://david-dm.org/mironov/react-redux-loading-bar)

A simple React component that provides Loading Bar for long running tasks. Works out of the box with [`redux-promise-middleware`](https://github.com/pburtchaell/redux-promise-middleware) and can be easily tweaked for other usage.

Consists of:

* React component — displays loading bar and simulates progress
* Redux reducer — manages loading bar's part of the store
* Redux middleware — dispatches `SHOW`/`HIDE` for actions with promises

## Examples

Demo link!

## Installation

```bash
npm install --save react-redux-loading-bar
```

## Usage

Mount the `LoadingBar` component anywhere in your application:

```es6
import LoadingBar from 'react-redux-loading-bar'

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <LoadingBar />
      </header>
    )
  }
}
```

Good news is that it doesn't include any positioning, so you can attach it to the top of any block or the whole page.

Install the reducer to the store:

```es6
import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

const reducer = combineReducers({
  // app reducers
  loading: loadingBarReducer,
})
```

*(Optional)* Apply middleware to automatically show and hide loading bar on actions with promises:

```es6
import { createStore, applyMiddleware } from 'redux'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  applyMiddleware(loadingBarMiddleware)
)
```

If you're not using `redux-promise-middleware`, you can skip installing the `loadingBarMiddleware` and dispatch `SHOW`/`HIDE` actions manually. The other option is to write your own middleware that will be similar to the [bundled one](https://github.com/mironov/react-redux-loading-bar/blob/master/src/loading_bar_middleware.js).

## Customizing

You can change the color and height of the Loading Bar:

```es6
<LoadingBar color="blue" height="5px" />
```

You can dispatch `SHOW`/`HIDE` actions wherever you want by importing the corresponding methods:

```es6
import { showLoading, hideLoading } from 'react-redux-loading-bar'

dispatch(showLoading())
// do long running stuff
dispatch(hideLoading())
```

You can dispatch `SHOW` action multiple times and the loading bar will be shown until the `HIDE` action is called for same times. In other words, the loading bar is shown until all long running tasks complete.

## Tests

```bash
npm test
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 1.0.0 Initial release

Licensed MIT. Copyright 2016-current Anton Mironov.
