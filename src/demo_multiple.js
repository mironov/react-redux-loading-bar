import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoadingBar from '../lib'

import { fetchPhotos } from './reducers/photos'
import { calculatePi } from './reducers/pi'

import Header from './components/header'
import Pi from './components/pi'

class Demo extends React.Component {

  render() {
    return (
      <div className="center">
        <Header />
        <main className="p3 mx-auto clearfix">
          <div className="col col-6 relative">
            <LoadingBar scope="first" />
            <div className="p2">
              <Pi
                pi={this.props.pi.first || 0}
                handleCalculatePi={() => this.props.actions.calculatePi('first')}
              />
            </div>
          </div>
          <div className="col col-6 relative">
            <LoadingBar scope="second" />
            <div className="p2">
              <Pi
                pi={this.props.pi.second || 0}
                handleCalculatePi={() => this.props.actions.calculatePi('second')}
              />
            </div>
          </div>
        </main>
      </div>
    )
  }
}

Demo.propTypes = {
  actions: PropTypes.object,
  pi: PropTypes.object,
}

const mapStateToProps = state => ({
  pi: state.pi,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { fetchPhotos, calculatePi },
    dispatch,
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(Demo)
