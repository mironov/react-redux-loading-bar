export const CALCULATE_PENDING = 'pi/CALCULATE_PENDING'
export const CALCULATE_FULFILLED = 'pi/CALCULATE_FULFILLED'

export const calculatePiPending = scope => ({
  type: CALCULATE_PENDING,
  scope,
})

export const calculatePiFulfilled = (pi, scope) => ({
  type: CALCULATE_FULFILLED,
  pi,
  scope,
})

export const calculatePi = scope =>
  (dispatch) => {
    dispatch(calculatePiPending(scope))
    const worker = new Worker('build/pi.js')

    worker.addEventListener('message', (e) => {
      dispatch(calculatePiFulfilled(e.data, scope))
    }, false)

    // precision
    worker.postMessage(1000000000)
  }


export default function piReducer(state = {}, action = {}) {
  switch (action.type) {
    case CALCULATE_PENDING:
      return {
        ...state,
        [action.scope || 'default']: 0,
      }
    case CALCULATE_FULFILLED:
      return {
        ...state,
        [action.scope || 'default']: action.pi,
      }
    default: return state
  }
}
