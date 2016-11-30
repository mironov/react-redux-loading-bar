import { connect } from 'react-redux'
import { LoadingBar } from './loading_bar'

const mapImmutableStateToProps = (state) => ({
  loading: state.get('loadingBar'),
})

export default connect(mapImmutableStateToProps)(LoadingBar)
