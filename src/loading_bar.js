import React, { Component } from 'react'
import { polyfill } from 'react-lifecycles-compat'
import { bool, number, object, string } from 'prop-types'
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
  static propTypes = {
    className: string,
    loading: number,
    maxProgress: number,
    progressIncrease: number,
    showFastActions: bool,
    updateTime: number,
    scope: string,
    style: object,
  }

  static defaultProps = {
    className: '',
    loading: 0,
    maxProgress: MAX_PROGRESS,
    progressIncrease: PROGRESS_INCREASE,
    showFastActions: false,
    style: {},
    updateTime: UPDATE_TIME,
    scope: DEFAULT_SCOPE,
  }

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

  state = { ...initialState }

  componentDidMount() {
    if (this.state.status === 'starting') {
      this.start()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.status !== this.state.status) {
      if (this.state.status === 'starting') {
        this.start()
      }

      if (this.state.status === 'stopping') {
        this.stop()
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.progressIntervalId)
    clearTimeout(this.terminatingAnimationTimeoutId)
  }

  start() {
    this.progressIntervalId = setInterval(
      this.simulateProgress,
      this.props.updateTime,
    )
    this.setState({ status: 'running' })
  }

  stop() {
    clearInterval(this.progressIntervalId)
    this.progressIntervalId = null

    const terminatingAnimationDuration = (
      this.isShown() || this.props.showFastActions ?
      TERMINATING_ANIMATION_DURATION : 0
    )

    this.terminatingAnimationTimeoutId = setTimeout(
      this.reset,
      terminatingAnimationDuration,
    )

    this.setState({ percent: 100 })
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

  isShown() {
    return this.state.percent > 0 && this.state.percent <= 100
  }

  buildStyle() {
    const animationDuration = (
      this.state.status === 'stopping' ?
        TERMINATING_ANIMATION_DURATION :
        ANIMATION_DURATION
    )

    const style = {
      opacity: '1',
      transform: `translate3d(${this.state.percent - 100}%, 0px, 0px)`,
      msTransform: `translate3d(${this.state.percent - 100}%, 0px, 0px)`,
      WebkitTransform: `translate3d(${this.state.percent - 100}%, 0px, 0px)`,
      MozTransform: `translate3d(${this.state.percent - 100}%, 0px, 0px)`,
      OTransform: `translate3d(${this.state.percent - 100}%, 0px, 0px)`,
      transition: `transform ${animationDuration}ms linear 0s`,
      msTransition: `-ms-transform ${animationDuration}ms linear 0s`,
      WebkitTransition: `-webkit-transform ${animationDuration}ms linear 0s`,
      MozTransition: `-moz-transform ${animationDuration}ms linear 0s`,
      OTransition: `-o-transform ${animationDuration}ms linear 0s`,
      width: '100%',
      willChange: 'transform, opacity',
    }
    // Use default styling if there's no CSS class applied
    if (!this.props.className) {
      style.height = '3px'
      style.backgroundColor = 'red'
      style.position = 'absolute'
    }

    if (this.isShown()) {
      style.opacity = '1'
    } else {
      style.opacity = '0'
    }

    return { ...style, ...this.props.style }
  }

  render() {
    if (this.state.status === 'hidden') {
      return <div />
    }

    return (
      <div>
        <div style={this.buildStyle()} className={this.props.className} />
        <div style={{ display: 'table', clear: 'both' }} />
      </div>
    )
  }
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
