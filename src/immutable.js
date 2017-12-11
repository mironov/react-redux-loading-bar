import { connect } from 'react-redux'
import { LoadingBar } from './loading_bar'

import { DEFAULT_SCOPE } from './loading_bar_ducks'

const mapImmutableStateToProps = (state, ownProps) => ({
  loading: state.get('loadingBar')[ownProps.scope || DEFAULT_SCOPE],
})

export default connect(mapImmutableStateToProps)(LoadingBar)
