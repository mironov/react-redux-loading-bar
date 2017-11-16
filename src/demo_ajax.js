import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from '../lib'
import $ from 'jquery'
import { shuffle, slice } from 'lodash'

import Header from './components/header'
import Photos from './components/photos'

const PHOTOS_URL = 'https://gist.githubusercontent.com/mironov/90943481802c227a1585cb979d73b261/raw/e5ffa6e7b8e160be478ef2d63b6212581930d2c1/photos.json'

class DemoAjax extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      photos: [],
    }

    this.boundHandleFetchPhotos = this.handleFetchPhotos.bind(this)
  }

  componentDidMount() {
    $(document).on('ajaxStart', this.props.actions.showLoading)
    $(document).on('ajaxStop', this.props.actions.hideLoading)
  }

  componentWillUnmount() {
    $(document).off('ajaxStart', this.props.actions.showLoading)
    $(document).off('ajaxStop', this.props.actions.hideLoading)
  }

  handleFetchPhotos() {
    $.getJSON(PHOTOS_URL, (data) => {
      this.setState({
        photos: slice(shuffle(data), 0, 5),
      })
    })
  }

  render() {
    return (
      <div className="center">
        <Header />
        <main className="p3 mx-auto">
          <Photos
            photos={this.state.photos}
            handleFetchPhotos={this.boundHandleFetchPhotos}
          />
        </main>
      </div>
    )
  }
}

DemoAjax.propTypes = {
  actions: PropTypes.object,
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ showLoading, hideLoading }, dispatch),
})

export default connect(() => ({}), mapDispatchToProps)(DemoAjax)
