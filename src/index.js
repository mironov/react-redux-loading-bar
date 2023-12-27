import LoadingBarContainer, { LoadingBar } from './loading_bar'
import loadingBarMiddleware from './loading_bar_middleware'
import {
  DEFAULT_SCOPE,
  HIDE,
  hideLoading,
  loadingBarReducer,
  RESET,
  resetLoading,
  SHOW,
  showLoading,
} from './loading_bar_ducks'
import ImmutableLoadingBar from './immutable'

export {
  DEFAULT_SCOPE,
  HIDE,
  hideLoading,
  ImmutableLoadingBar,
  LoadingBar,
  loadingBarMiddleware,
  loadingBarReducer,
  RESET,
  resetLoading,
  SHOW,
  showLoading,
}
export default LoadingBarContainer
