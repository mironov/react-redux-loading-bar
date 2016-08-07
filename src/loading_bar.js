import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

export const UPDATE_TIME = 200
export const MAX_PROGRESS = 90
export const PROGRESS_INCREASE = 5

export class LoadingBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      percent: 0,
      interval: null,
    }

    this.boundSimulateProgress = this.simulateProgress.bind(this)
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
    let interval = this.state.interval
    let percent = this.state.percent

    if (percent === 100) {
      clearInterval(interval)
      interval = null
      percent = 0
    } else if (this.props.loading === 0) {
      percent = 100
    } else if (percent < this.props.maxProgress) {
      percent = percent + this.props.progressIncrease
    }

    this.setState({ percent, interval })
  }

  shouldShow(percent) {
    return (percent > 0) && (percent <= 100)
  }

  buildStyle() {
    const style = {
      height: '3px',
      width: `${this.state.percent}%`,
      backgroundColor: 'red',
      transition: 'width 400ms ease-out, height 400ms linear',
      position: 'absolute',
    }

    return { ...style, ...this.props.style }
  }

  render() {
    const style = this.buildStyle()

    if (this.shouldShow(this.state.percent)) {
      style.display = 'block'
    } else {
      style.display = 'none'
    }

    return (
      <div>
        <div style={style} className={this.props.className}></div>
        <div style={{ display: 'table', clear: 'both' }}></div>
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
