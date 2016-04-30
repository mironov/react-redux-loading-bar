import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const CALCULATE_FULFILLED = 'pi/CALCULATE_FULFILLED'

export const calculatePiFulfilled = (pi) => ({
  type: CALCULATE_FULFILLED,
  pi,
})

export const calculatePi = () =>
  dispatch => {
    dispatch(showLoading())
    const worker = new Worker('build/pi.js')

    worker.addEventListener('message', (e) => {
      dispatch(calculatePiFulfilled(e.data))
      dispatch(hideLoading())
    }, false)

    worker.postMessage(1000000000) // precision
  }

export default function piReducer(state = 0, action = {}) {
  switch (action.type) {
    case CALCULATE_FULFILLED:
      return action.pi

    default: return state
  }
}
