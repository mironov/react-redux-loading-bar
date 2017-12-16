import React from 'react'
import LoadingBar from 'react-redux-loading-bar'

const Header = () => (
  <header>
    <LoadingBar />
    <a
      href="https://github.com/mironov/react-redux-loading-bar"
      className="block mt3 mb4 mx-auto"
      style={{ fontSize: '3.25rem' }}
    >
      react-redux-loading-bar
    </a>
    <p className="mb3">Simple Loading Bar for Redux and React</p>
  </header>
)

export default Header
