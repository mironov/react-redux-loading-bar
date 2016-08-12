import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const UPDATE_TIME = 200
export const MAX_PROGRESS = 90
export const PROGRESS_INCREASE = 5
export const ANIMATION_TIME = UPDATE_TIME * 2


export class LoadingBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      percent: 0,
      interval: null,
    }

    this.boundSimulateProgress = this.simulateProgress.bind(this)
    this.boundResetProgress = this.resetProgress.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading > this.props.loading) {
      this.launch()
    }
  }

  componentWillUnmount() {
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }
  }

  launch() {
    let interval = this.state.interval
    const percent = this.state.percent

    if (!interval) {
      interval = setInterval(this.boundSimulateProgress, this.props.updateTime)
    }

    this.setState({ percent, interval })
  }

  simulateProgress() {
    let { interval, percent } = this.state

    if (percent === 100) {
      clearInterval(interval)
      setTimeout(this.boundResetProgress, ANIMATION_TIME)
      interval = null
    } else if (this.props.loading === 0) {
      percent = 100
    } else if (percent < this.props.maxProgress) {
      percent = percent + this.props.progressIncrease
    }

    this.setState({ percent, interval })
  }

  resetProgress() {
    this.setState({
      percent: 0,
      interval: null,
    })
  }

  shouldShow(percent) {
    return (percent > 0) && (percent < 100)
  }

  buildStyle() {
    const style = {
      height: '3px',
      width: `${this.state.percent}%`,
      backgroundColor: 'red',
      transition: `width ${ANIMATION_TIME}ms ease-out,
                   height ${ANIMATION_TIME}ms linear,
                   opacity ${ANIMATION_TIME}ms ease-out`,
      position: 'absolute',
      opacity: '1',
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
