import LoadingBarContainer, { LoadingBar } from './loading_bar'
import loadingBarMiddleware from './loading_bar_middleware'
import {
  hideLoading,
  loadingBarReducer,
  resetLoading,
  showLoading,
} from './loading_bar_ducks'
import ImmutableLoadingBar, { immutableLoadingBarReducer } from './immutable'

export {
  hideLoading,
  ImmutableLoadingBar,
  immutableLoadingBarReducer,
  LoadingBar,
  loadingBarMiddleware,
  loadingBarReducer,
  resetLoading,
  showLoading,
}
export default LoadingBarContainer
