import { showLoading, hideLoading } from './loading_bar_ducks'

export default function loadingBarMiddleware({ dispatch }) {
  return next => action => {
    next(action)

    if (action.type === undefined) {
      return
    }

    const isPending = /.*_PENDING(.*?)$/
    const isFulfilled = /.*_FULFILLED(.*?)$/
    const isRejected = /.*_REJECTED(.*?)$/

    if (action.type.match(isPending)) {
      dispatch(showLoading())
    } else if (action.type.match(isFulfilled) ||
               action.type.match(isRejected)) {
      dispatch(hideLoading())
    }
  }
}
