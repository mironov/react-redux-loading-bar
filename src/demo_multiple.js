import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import LoadingBar from 'react-redux-loading-bar'

import { fetchPhotos } from './reducers/photos'
import { calculatePi } from './reducers/pi'

import Header from './components/header'
import Pi from './components/pi'

const Demo = props => (
  <div className="center">
    <Header />
    <main className="p3 mx-auto clearfix">
      <div className="col col-6 relative">
        <LoadingBar scope="first" />
        <div className="p2">
          <Pi
            pi={props.pi.first || 0}
            handleCalculatePi={() => props.actions.calculatePi('first')}
          />
        </div>
      </div>
      <div className="col col-6 relative">
        <LoadingBar scope="second" />
        <div className="p2">
          <Pi
            pi={props.pi.second || 0}
            handleCalculatePi={() => props.actions.calculatePi('second')}
          />
        </div>
      </div>
    </main>
  </div>
)

Demo.propTypes = {
  actions: PropTypes.object.isRequired,
  pi: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  pi: state.pi || {},
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { fetchPhotos, calculatePi },
    dispatch,
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Demo)
