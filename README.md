# React Redux Loading Bar

[![npm version](https://img.shields.io/npm/v/react-redux-loading-bar.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-loading-bar)
[![build status](https://img.shields.io/travis/mironov/react-redux-loading-bar/master.svg?style=flat-square)](https://travis-ci.org/mironov/react-redux-loading-bar)
[![coverage status](https://coveralls.io/repos/github/mironov/react-redux-loading-bar/badge.svg?branch=master)](https://coveralls.io/github/mironov/react-redux-loading-bar?branch=master)
[![npm downloads](https://img.shields.io/npm/dm/react-redux-loading-bar.svg?style=flat)](https://www.npmjs.com/package/react-redux-loading-bar)
[![dependency status](https://david-dm.org/mironov/react-redux-loading-bar.svg)](https://david-dm.org/mironov/react-redux-loading-bar)

A React component that provides Loading Bar (aka Progress Bar) for long running tasks.

![Demo GIF](http://d.pr/i/JbwN+)

Consists of:

* React component — displays loading bar and simulates progress
* Redux reducer — manages loading bar's part of the store
* (optional) Redux middleware — automatically shows and hides Loading Bar for actions with promises

## Examples

See [Demo](http://mironov.github.io/react-redux-loading-bar/) or its [source code](https://github.com/mironov/react-redux-loading-bar/tree/gh-pages/src).

## Installation

```bash
npm install --save react-redux-loading-bar
```

## Usage

Mount the `LoadingBar` component anywhere in your application:

```jsx
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

Good news is that it doesn't include any positioning. You can attach it to the top of any block or the whole page.

Install the reducer to the store:

```jsx
import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'

const reducer = combineReducers({
  // app reducers
  loadingBar: loadingBarReducer,
})
```

## Usage with [`redux-promise-middleware`](https://github.com/pburtchaell/redux-promise-middleware)

Apply middleware to automatically show and hide loading bar on actions with promises:

```jsx
import { createStore, applyMiddleware } from 'redux'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  // promise middleware
  applyMiddleware(loadingBarMiddleware())
)
```

## Usage with custom suffixes or alternative promise middleware

You can configure promise type suffixes that are used in your project:

```jsx
import { createStore, applyMiddleware } from 'redux'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  applyMiddleware(
    loadingBarMiddleware({
      promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
    })
  )
)
```

If you're not using `redux-promise-middleware` or any other promise middleware, you can skip installing the `loadingBarMiddleware()` and dispatch `SHOW`/`HIDE` actions manually. The other option is to write your own middleware that will be similar to the [bundled one](https://github.com/mironov/react-redux-loading-bar/blob/master/src/loading_bar_middleware.js).

## Usage without middleware

You can dispatch `SHOW`/`HIDE` actions wherever you want by importing the corresponding action creators:

```jsx
import { showLoading, hideLoading } from 'react-redux-loading-bar'

dispatch(showLoading())
// do long running stuff
dispatch(hideLoading())
```

You need to dispatch `HIDE` as many times as `SHOW` was dispatched to make the bar disappear. In other words, the loading bar is shown until all long running tasks complete.

## Usage with [`redux-saga`](https://github.com/redux-saga/redux-saga)

Install the `loadingBarReducer()` and mount Loading Bar in your application.
You can import and dispatch `showLoading` and `hideLoading` from your sagas.

```jsx
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function* fetchData() {
  try {
    yield put(showLoading())
    const payload = yield call(API, params)
    // payload processing
  } finally {
    yield put(hideLoading())
  }
}
```

## Usage with [`immutable-js`](https://github.com/facebook/immutable-js)

You can change component import line if your top level redux store object is `immutable`.

```jsx
import { ImmutableLoadingBar as LoadingBar } from 'react-redux-loading-bar'

// Mount LoadingBar component as usual
```

## Usage with jQuery Ajax Requests

If you happen to use jQuery for Ajax requests, you can dispatch `SHOW`/`HIDE` actions on `ajaxStart`/`ajaxStop` global events:

```jsx
$(document).on('ajaxStart', this.props.actions.showLoading)
$(document).on('ajaxStop', this.props.actions.hideLoading)
```

See [a demo](http://mironov.github.io/react-redux-loading-bar/?ajax) or checkout [the code](https://github.com/mironov/react-redux-loading-bar/blob/gh-pages/src/demo_ajax.js).

## Styling

You can apply custom styling right on the `LoadingBar` component. For example you can change the color and height of the loading bar:

```jsx
<LoadingBar style={{ backgroundColor: 'blue', height: '5px' }} />
```

Alternatively, you can specify your own CSS class.

**Please note that will disable default styling (which is `background-color: red; height: 3px; position: absolute;`).**

```jsx
<LoadingBar className="loading" />
```

Don't forget to set `height`, `background-color` and `position` for the `loading` class in your CSS files.

## Configure Progress Simulation

You can change updateTime (by default 200ms), maxProgress (by default 90%) and progressIncrease (by default 5%):

```jsx
<LoadingBar updateTime={100} maxProgress={95} progressIncrease={10} />
```

By default, the Loading Bar will only display if the action took longer than `updateTime` to finish. This helps keep things feeling snappy, and avoids the annoyingness of showing a Loading Bar for fractions of seconds. If you want to show Loading Bar even on quickly finished actions you can pass the `showFastActions` prop:

```jsx
<LoadingBar showFastActions />
```

## Reset progress

You can dispatch the `resetLoading` action to ultimately hide Loading Bar even when multiple long running tasks are still in progress.

## Tests

```bash
npm test
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

To see what has changed in recent versions of Loading Bar, see the [CHANGELOG](https://github.com/mironov/react-redux-loading-bar/blob/master/CHANGELOG.md).

Licensed MIT. Copyright 2016-current Anton Mironov.
