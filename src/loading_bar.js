import React, { Component } from 'react'
import { bool, number, object, string } from 'prop-types'
import { connect } from 'react-redux'

import { DEFAULT_SCOPE } from './loading_bar_ducks'

export const UPDATE_TIME = 200
export const MAX_PROGRESS = 99
export const PROGRESS_INCREASE = 10
export const ANIMATION_TIME = UPDATE_TIME * 4
export const TERMINATING_ANIMATION_TIME = UPDATE_TIME / 2

const initialState = {
  terminatingAnimationTimeout: null,
  percent: 0,
  progressInterval: null,
}

export class LoadingBar extends Component {
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

  state = {
    ...initialState,
    hasMounted: false,
  }

  componentDidMount() {
    // Re-render the component after mount to fix problems with SSR and CSP.
    //
    // Apps that use Server Side Rendering and has Content Security Policy
    // for style that doesn't allow inline styles should render an empty div
    // and replace it with the actual Loading Bar after mount
    // See: https://github.com/mironov/react-redux-loading-bar/issues/39
    //
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ hasMounted: true })

    if (this.props.loading > 0) {
      this.launch()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState((prevState, props) => {
      if (this.shouldStart(props, nextProps)) {
        this.launch()
      } else if (this.shouldStop(prevState, nextProps)) {
        if (prevState.percent === 0 && !props.showFastActions) {
          // not even shown yet because the action finished quickly after start
          clearInterval(prevState.progressInterval)
          return initialState
        }

        // should progress to 100 percent
        return { percent: 100 }
      }

      return null
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.progressInterval)
    clearTimeout(this.state.terminatingAnimationTimeout)
  }

  shouldStart = (props, nextProps) =>
    props.loading === 0 && nextProps.loading > 0

  shouldStop = (state, nextProps) =>
    state.progressInterval && nextProps.loading === 0

  shouldShow() {
    return this.state.percent > 0 && this.state.percent <= 100
  }

  launch() {
    this.setState((prevState, { updateTime }) => {
      let { progressInterval } = prevState
      const { terminatingAnimationTimeout, percent } = prevState

      const loadingBarNotShown = !progressInterval
      const terminatingAnimationGoing = percent === 100

      if (loadingBarNotShown) {
        progressInterval = setInterval(this.simulateProgress, updateTime)
      }

      if (terminatingAnimationGoing) {
        clearTimeout(terminatingAnimationTimeout)
      }

      return { progressInterval, percent: 0 }
    })
  }

  newPercent = (percent, progressIncrease) => {
    // Use cos as a smoothing function
    // Can be any function to slow down progress near the 100%
    const smoothedProgressIncrease = (
      progressIncrease * Math.cos(percent * (Math.PI / 2 / 100))
    )

    return percent + smoothedProgressIncrease
  }

  simulateProgress = () => {
    this.setState((prevState, { maxProgress, progressIncrease }) => {
      let { progressInterval, percent, terminatingAnimationTimeout } = prevState
      const newPercent = this.newPercent(percent, progressIncrease)

      if (percent === 100) {
        clearInterval(progressInterval)
        terminatingAnimationTimeout = setTimeout(
          this.resetProgress,
          TERMINATING_ANIMATION_TIME,
        )
        progressInterval = null
      } else if (newPercent <= maxProgress) {
        percent = newPercent
      }

      return { percent, progressInterval, terminatingAnimationTimeout }
    })
  }

  resetProgress = () => {
    this.setState(initialState)
  }

  buildStyle() {
    const animationTime = (
      this.state.percent !== 100 ? ANIMATION_TIME : TERMINATING_ANIMATION_TIME
    )

    const style = {
      opacity: '1',
      transform: `scaleX(${this.state.percent / 100})`,
      transformOrigin: 'left',
      transition: `transform ${animationTime}ms linear`,
      width: '100%',
      willChange: 'transform, opacity',
    }

    // Use default styling if there's no CSS class applied
    if (!this.props.className) {
      style.height = '3px'
      style.backgroundColor = 'red'
      style.position = 'absolute'
    }

    if (this.shouldShow()) {
      style.opacity = '1'
    } else {
      style.opacity = '0'
    }

    return { ...style, ...this.props.style }
  }

  render() {
    // In order not to violate strict style CSP it's better to make
    // an extra re-render after component mount
    if (!this.state.hasMounted) {
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

export default connect(mapStateToProps)(LoadingBar)
