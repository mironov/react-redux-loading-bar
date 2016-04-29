import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const UPDATE_TIME = 400
export const MAX_PROGRESS = 90
export const PROGRESS_INCREASE = 10

export class LoadingBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      percent: 0,
      interval: null,
    }

    this.onSimulateProgress = this.simulateProgress.bind(this)
  }

  componentWillMount() {
    this.launch()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading > this.props.loading) {
      this.launch()
    }
  }

  launch() {
    let interval = this.state.interval
    const percent = this.state.percent

    if (!interval) {
      interval = setInterval(this.onSimulateProgress, UPDATE_TIME)
    }

    this.setState({ percent, interval })
  }

  simulateProgress() {
    let interval = this.state.interval
    let percent = this.state.percent

    if (this.props.loading === 0) {
      clearInterval(interval)
      interval = null
      percent = 0
    } else if (percent < MAX_PROGRESS) {
      percent = percent + PROGRESS_INCREASE
    }

    this.setState({ percent, interval })
  }

  shouldShow(percent) {
    return (percent > 0) && (percent <= 100) && (this.props.loading !== 0)
  }

  render() {
    let loadingStyle = {
      height: this.props.height,
      width: `${this.state.percent}%`,
      backgroundColor: this.props.color,
      transition: 'width 400ms ease-out, height 400ms linear',
      position: 'absolute',
    }

    if (this.shouldShow(this.state.percent)) {
      loadingStyle.display = 'block'
    } else {
      loadingStyle.display = 'none'
    }

    return (
      <div style={loadingStyle}>
      </div>
    )
  }
}

LoadingBar.propTypes = {
  color: PropTypes.string,
  height: PropTypes.string,
  actions: PropTypes.object,
  loading: PropTypes.number,
}

LoadingBar.defaultProps = {
  color: 'red',
  height: '3px',
  loading: 0,
}

const mapStateToProps = (state) => ({
  loading: state.loading,
})

export default connect(mapStateToProps)(LoadingBar)
