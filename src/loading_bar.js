import React, { Component } from 'react'
import { polyfill } from 'react-lifecycles-compat'
import {
  bool,
  number,
  object,
  string,
} from 'prop-types'
import { connect } from 'react-redux'

import { DEFAULT_SCOPE } from './loading_bar_ducks'

export const UPDATE_TIME = 400
export const MAX_PROGRESS = 99
export const PROGRESS_INCREASE = 20
export const ANIMATION_DURATION = UPDATE_TIME * 2
export const TERMINATING_ANIMATION_DURATION = UPDATE_TIME / 2

const initialState = {
  percent: 0,
  status: 'hidden',
}

class LoadingBar extends Component {
  static shouldStart(props, state) {
    return (
      props.loading > 0 && ['hidden', 'stopping'].indexOf(state.status) >= 0
    )
  }

  static shouldStop(props, state) {
    return (
      props.loading === 0 && ['starting', 'running'].indexOf(state.status) >= 0
    )
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (LoadingBar.shouldStart(nextProps, prevState)) {
      return { status: 'starting' }
    }

    if (LoadingBar.shouldStop(nextProps, prevState)) {
      return { status: 'stopping' }
    }

    return null
  }

  constructor(props) {
    super(props)
    this.state = { ...initialState }
  }

  componentDidMount() {
    const { status } = this.state
    if (status === 'starting') {
      this.start()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { status } = this.state
    if (prevState.status !== status) {
      if (status === 'starting') {
        this.start()
      }

      if (status === 'stopping') {
        this.stop()
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.progressIntervalId)
    clearTimeout(this.terminatingAnimationTimeoutId)
  }

  reset = () => {
    this.terminatingAnimationTimeoutId = null
    this.setState(initialState)
  }

  newPercent = (percent, progressIncrease) => {
    // Use cosine as a smoothing function
    // It could be any function to slow down progress near the ending 100%
    const smoothedProgressIncrease = (
      progressIncrease * Math.cos(percent * (Math.PI / 2 / 100))
    )

    return percent + smoothedProgressIncrease
  }

  simulateProgress = () => {
    this.setState((prevState, { maxProgress, progressIncrease }) => {
      let { percent } = prevState
      const newPercent = this.newPercent(percent, progressIncrease)

      if (newPercent <= maxProgress) {
        percent = newPercent
      }

      return { percent }
    })
  }

  start() {
    // There could be previous termination animation going, so we need to
    // cancel it and forcefully reset the Loading Bar before starting
    // the progress simulation from 0
    if (this.terminatingAnimationTimeoutId) {
      clearTimeout(this.terminatingAnimationTimeoutId)
      this.reset()
    }

    const { updateTime } = this.props
    this.progressIntervalId = setInterval(
      this.simulateProgress,
      updateTime,
    )
    this.setState({ status: 'running' })
  }

  stop() {
    const { showFastActions } = this.props
    clearInterval(this.progressIntervalId)
    this.progressIntervalId = null

    const terminatingAnimationDuration = (
      this.isShown() || showFastActions
        ? TERMINATING_ANIMATION_DURATION : 0
    )

    this.terminatingAnimationTimeoutId = setTimeout(
      this.reset,
      terminatingAnimationDuration,
    )

    this.setState({ percent: 100 })
  }

  isShown() {
    const { percent } = this.state
    return percent > 0 && percent <= 100
  }

  buildStyle() {
    const { status, percent } = this.state
    const { className, style: customStyle } = this.props

    const animationDuration = (
      status === 'stopping'
        ? TERMINATING_ANIMATION_DURATION
        : ANIMATION_DURATION
    )

    const style = {
      width: `${percent}%`,
      transition: `width ${animationDuration}ms linear 0s`,
      msTransition: `width ${animationDuration}ms linear 0s`,
      WebkitTransition: `width ${animationDuration}ms linear 0s`,
      MozTransition: `width ${animationDuration}ms linear 0s`,
      OTransition: `width ${animationDuration}ms linear 0s`,
      willChange: 'width, opacity',
    }
    // Use default styling if there's no CSS class applied
    if (!className) {
      style.height = '3px'
      style.backgroundColor = 'red'
      style.position = 'absolute'
    }

    if (this.isShown()) {
      style.opacity = '1'
    } else {
      style.opacity = '0'
    }

    return { ...style, ...customStyle }
  }

  render() {
    const { status } = this.state
    const { direction, className } = this.props
    if (status === 'hidden') {
      return <div />
    }

    return (
      <div style={{ direction }}>
        <div style={this.buildStyle()} className={className} />
        <div style={{ display: 'table', clear: 'both' }} />
      </div>
    )
  }
}

LoadingBar.propTypes = {
  className: string,
  direction: string,
  loading: number,
  maxProgress: number,
  progressIncrease: number,
  scope: string,
  showFastActions: bool,
  style: object,
  updateTime: number,
}

LoadingBar.defaultProps = {
  className: '',
  direction: 'ltr',
  loading: 0,
  maxProgress: MAX_PROGRESS,
  progressIncrease: PROGRESS_INCREASE,
  scope: DEFAULT_SCOPE,
  showFastActions: false,
  style: {},
  updateTime: UPDATE_TIME,
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.loadingBar[ownProps.scope || DEFAULT_SCOPE],
})

polyfill(LoadingBar)
const ConnectedLoadingBar = connect(mapStateToProps)(LoadingBar)

export {
  LoadingBar,
  ConnectedLoadingBar as default,
}
