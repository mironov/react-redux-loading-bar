import loadingBarMiddleware from './loading_bar_middleware'
import {
  loadingBarReducer,
  showLoading,
  hideLoading,
} from './loading_bar_ducks'
import LoadingBar from './loading_bar'

export { loadingBarMiddleware }
export { loadingBarReducer, showLoading, hideLoading }
export default LoadingBar
