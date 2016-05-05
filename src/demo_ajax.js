import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import $ from 'jquery'
import { shuffle, slice } from 'lodash'

import Header from './components/header'
import Photos from './components/photos'

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
    $.getJSON('http://jsonplaceholder.typicode.com/photos', (data) => {
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
