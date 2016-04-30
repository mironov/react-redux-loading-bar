import React, { PropTypes } from 'react'

class Main extends React.Component {
  renderPhotos() {
    return this.props.photos.map((photo) =>
      <div className="flex-auto" key={photo.id}>
        <img src={photo.thumbnailUrl} alt={photo.title} />
      </div>
    )
  }

  render() {
    return (
      <main className="p3 mx-auto">
        <button
          onClick={this.props.handleFetchPhotos}
          className="btn btn-primary"
        >
          Fetch Photos
        </button>
        <div className="flex mxn2 p2">
          {this.renderPhotos()}
        </div>
        <button
          onClick={this.props.handleCalculatePi}
          className="btn btn-primary"
        >
          Calculate Pi
        </button>
        <p>
          <input type="text" value={this.props.pi} readOnly className="field" />
        </p>
      </main>
    )
  }
}

Main.propTypes = {
  photos: PropTypes.array,
  pi: PropTypes.number,
  handleFetchPhotos: PropTypes.func,
  handleCalculatePi: PropTypes.func,
}

export default Main
