import { showLoading, hideLoading } from './loading_bar_ducks'

const defaultTypeSuffixes = ['PENDING', 'FULFILLED', 'REJECTED']

export default function loadingBarMiddleware(config = {}) {
  const promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypeSuffixes

  return ({ dispatch }) => next => action => {
    next(action)

    if (action.type === undefined) {
      return
    }

    const [PENDING, FULFILLED, REJECTED] = promiseTypeSuffixes

    const isPending = `_${PENDING}`
    const isFulfilled = `_${FULFILLED}`
    const isRejected = `_${REJECTED}`

    if (action.type.indexOf(isPending) !== -1) {
      dispatch(showLoading())
    } else if (action.type.indexOf(isFulfilled) !== -1 ||
               action.type.indexOf(isRejected) !== -1) {
      dispatch(hideLoading())
    }
  }
}
