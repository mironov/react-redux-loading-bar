import React from 'react'
import PropTypes from 'prop-types'

class Photos extends React.Component {
  renderPhotos() {
    return this.props.photos.map((photo) =>
      <div className="flex-auto" key={photo.id}>
        <img src={photo.thumbnailUrl} alt={photo.title} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <button
          onClick={this.props.handleFetchPhotos}
          className="btn btn-primary"
        >
          Fetch Photos
        </button>
        <div className="flex mxn2 p2">
          {this.renderPhotos()}
        </div>
      </div>
    )
  }
}

Photos.propTypes = {
  photos: PropTypes.array,
  handleFetchPhotos: PropTypes.func,
}

export default Photos
