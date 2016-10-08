import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const UPDATE_TIME = 200
export const MAX_PROGRESS = 90
export const PROGRESS_INCREASE = 5
export const ANIMATION_TIME = UPDATE_TIME * 2

const initialState = {
  percent: 0,
  progressInterval: null,
  animationTimeout: null,
}

export class LoadingBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = initialState

    this.boundSimulateProgress = this.simulateProgress.bind(this)
    this.boundResetProgress = this.resetProgress.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading > this.props.loading) {
      this.launch()
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.progressInterval)
    clearTimeout(this.state.animationTimeout)
  }

  launch() {
    let { progressInterval, percent } = this.state
    const { animationTimeout } = this.state

    if (!progressInterval) {
      progressInterval = setInterval(
        this.boundSimulateProgress,
        this.props.updateTime
      )
      clearTimeout(animationTimeout)
      percent = 0
    }

    this.setState({ ...this.state, progressInterval, percent })
  }

  simulateProgress() {
    let { progressInterval, percent, animationTimeout } = this.state

    if (percent === 100) {
      clearInterval(progressInterval)
      animationTimeout = setTimeout(this.boundResetProgress, ANIMATION_TIME)
      progressInterval = null
    } else if (this.props.loading === 0) {
      percent = 100
    } else if (percent < this.props.maxProgress) {
      percent = percent + this.props.progressIncrease
    }

    this.setState({ percent, progressInterval, animationTimeout })
  }

  resetProgress() {
    this.setState(initialState)
  }

  shouldShow(percent) {
    return (percent > 0) && (percent < 100)
  }

  buildStyle() {
    const style = {
      width: `${this.state.percent}%`,
      transition: `width ${ANIMATION_TIME}ms ease-out,
                   height ${ANIMATION_TIME}ms linear,
                   opacity ${ANIMATION_TIME}ms ease-out`,
      opacity: '1',
    }

    // Use default styling if there's no CSS class applied
    if (!this.props.className) {
      style.height = '3px'
      style.backgroundColor = 'red'
      style.position = 'absolute'
    }

    return { ...style, ...this.props.style }
  }

  render() {
    const style = this.buildStyle()

    if (this.shouldShow(this.state.percent)) {
      style.opacity = '1'
    } else {
      style.opacity = '0'
    }

    return (
      <div>
        <div style={style} className={this.props.className} />
        <div style={{ display: 'table', clear: 'both' }} />
      </div>
    )
  }
}

LoadingBar.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  actions: PropTypes.object,
  loading: PropTypes.number,
  updateTime: PropTypes.number,
  maxProgress: PropTypes.number,
  progressIncrease: PropTypes.number,
}

LoadingBar.defaultProps = {
  style: {},
  className: undefined,
  loading: 0,
  updateTime: UPDATE_TIME,
  maxProgress: MAX_PROGRESS,
  progressIncrease: PROGRESS_INCREASE,
}

const mapStateToProps = (state) => ({
  loading: state.loadingBar,
})

export default connect(mapStateToProps)(LoadingBar)
