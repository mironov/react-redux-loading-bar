import { Map } from 'immutable'
import { connect } from 'react-redux'
import { LoadingBar } from './loading_bar'

import { DEFAULT_SCOPE, SHOW, HIDE, RESET } from './loading_bar_ducks'

const mapImmutableStateToProps = (state, ownProps) => ({
  loading: state.get('loadingBar').get(ownProps.scope || DEFAULT_SCOPE),
})

export function immutableLoadingBarReducer(state = Map({}), action = {}) {
  const { scope = DEFAULT_SCOPE } = (action.payload || Map({}))

  switch (action.type) {
    case SHOW:
      return state.set(scope, (state.get('scope') || 0) + 1)
    case HIDE:
      return state.set(scope, Math.max(0, (state.get('scope') || 1) - 1))
    case RESET:
      return state.set(scope, 0)
    default:
      return state
  }
}

export default connect(mapImmutableStateToProps)(LoadingBar)
