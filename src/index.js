import LoadingBarContainer, { LoadingBar } from './loading_bar'
import loadingBarMiddleware from './loading_bar_middleware'
import {
  loadingBarReducer,
  showLoading,
  hideLoading,
} from './loading_bar_ducks'

export {
  loadingBarMiddleware,
  loadingBarReducer,
  showLoading,
  hideLoading,
  LoadingBar,
}
export default LoadingBarContainer
