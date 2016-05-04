import React, { PropTypes } from 'react'

const Pi = ({ handleCalculatePi, pi }) =>
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

Pi.propTypes = {
  pi: PropTypes.number,
  handleCalculatePi: PropTypes.func,
}

export default Pi
