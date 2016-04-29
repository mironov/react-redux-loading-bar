import { showLoading, hideLoading } from './loading_bar_ducks'

export default function loadingBarMiddleware({ dispatch }) {
  return next => action => {
    next(action)

    if (action.type.includes('_PENDING')) {
      dispatch(showLoading())
    } else if (action.type.includes('_FULFILLED') ||
               action.type.includes('_REJECTED')) {
      dispatch(hideLoading())
    }
  }
}
