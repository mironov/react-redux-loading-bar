export const CALCULATE_PENDING = 'pi/CALCULATE_PENDING'
export const CALCULATE_FULFILLED = 'pi/CALCULATE_FULFILLED'

export const calculatePiPending = () => ({
  type: CALCULATE_PENDING,
})

export const calculatePiFulfilled = (pi) => ({
  type: CALCULATE_FULFILLED,
  pi,
})

export const calculatePi = () =>
  dispatch => {
    dispatch(calculatePiPending())
    const worker = new Worker('build/pi.js')

    worker.addEventListener('message', (e) => {
      dispatch(calculatePiFulfilled(e.data))
    }, false)

    // precision
    worker.postMessage(1000000000)
  }

export default function piReducer(state = 0, action = {}) {
  switch (action.type) {
    case CALCULATE_PENDING:
      return 0
    case CALCULATE_FULFILLED:
      return action.pi

    default: return state
  }
}
