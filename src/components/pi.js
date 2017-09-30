import React from 'react'
import PropTypes from 'prop-types'

const Pi = ({ handleCalculatePi, pi }) => (
  <div>
    <button
      onClick={handleCalculatePi}
      className="btn btn-primary"
    >
      Calculate π
    </button>
    <p>
      <input type="text" value={pi} readOnly className="field" />
    </p>
  </div>
)

Pi.propTypes = {
  pi: PropTypes.number.isRequired,
  handleCalculatePi: PropTypes.func.isRequired,
}

export default Pi
