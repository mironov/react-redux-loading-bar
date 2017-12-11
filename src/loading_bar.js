import React from 'react'
import {
  bool,
  number,
  object,
  string,
} from 'prop-types'
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

export class LoadingBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ...initialState,
      hasMounted: false,
    }

    this.boundSimulateProgress = this.simulateProgress.bind(this)
    this.boundResetProgress = this.resetProgress.bind(this)
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

    console.log('componentDidMount loading', this.props.loading)
    if (this.props.loading > 0) {
      this.launch()
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps shouldStop', this.shouldStop(nextProps))
    if (this.shouldStart(nextProps)) {
      this.launch()
    } else if (this.shouldStop(nextProps)) {
      if (this.state.percent === 0 && !this.props.showFastActions) {
        // not even shown yet because the action finished quickly after start
        clearInterval(this.state.progressInterval)
        this.resetProgress()
      } else {
        // should progress to 100 percent
        this.setState({ percent: 100 })
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.progressInterval)
    clearTimeout(this.state.terminatingAnimationTimeout)
  }

  shouldStart(nextProps) {
    return this.props.loading === 0 && nextProps.loading > 0
  }

  shouldStop(nextProps) {
    console.log('shouldStop progressInterval', this.state.progressInterval)
    console.log('shouldStop loading', nextProps.loading)
    return this.state.progressInterval && nextProps.loading === 0
  }

  shouldShow() {
    return this.state.percent > 0 && this.state.percent <= 100
  }

  launch() {
    let { progressInterval, percent } = this.state
    const { terminatingAnimationTimeout } = this.state

    const loadingBarNotShown = !progressInterval
    const terminatingAnimationGoing = percent === 100

    if (loadingBarNotShown) {
      progressInterval = setInterval(
        this.boundSimulateProgress,
        this.props.updateTime,
      )
    }

    if (terminatingAnimationGoing) {
      clearTimeout(terminatingAnimationTimeout)
    }

    percent = 0

    console.log('launch progressInterval', progressInterval)
    this.setState({ progressInterval, percent })
  }

  newPercent() {
    const { percent } = this.state
    const { progressIncrease } = this.props

    // Use cos as a smoothing function
    // Can be any function to slow down progress near the 100%
    const smoothedProgressIncrease = (
      progressIncrease * Math.cos(percent * (Math.PI / 2 / 100))
    )

    return percent + smoothedProgressIncrease
  }

  simulateProgress() {
    let { progressInterval, percent, terminatingAnimationTimeout } = this.state
    const { maxProgress } = this.props

    if (percent === 100) {
      clearInterval(progressInterval)
      terminatingAnimationTimeout = setTimeout(
        this.boundResetProgress,
        TERMINATING_ANIMATION_TIME,
      )
      progressInterval = null
    } else if (this.newPercent() <= maxProgress) {
      percent = this.newPercent()
    }

    console.log('simulateProgress progressInterval', progressInterval)
    this.setState({ percent, progressInterval, terminatingAnimationTimeout })
  }

  resetProgress() {
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

LoadingBar.propTypes = {
  className: string,
  loading: number,
  maxProgress: number,
  progressIncrease: number,
  showFastActions: bool,
  updateTime: number,
  // eslint-disable-next-line react/no-unused-prop-types
  scope: string,
  // eslint-disable-next-line react/forbid-prop-types
  style: object,
}

LoadingBar.defaultProps = {
  className: '',
  loading: 0,
  maxProgress: MAX_PROGRESS,
  progressIncrease: PROGRESS_INCREASE,
  showFastActions: false,
  style: {},
  updateTime: UPDATE_TIME,
  scope: DEFAULT_SCOPE,
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.loadingBar[ownProps.scope || DEFAULT_SCOPE],
})

export default connect(mapStateToProps)(LoadingBar)
